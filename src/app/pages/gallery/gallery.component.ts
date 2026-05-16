import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { ExhibitService } from '../../feature/exhibit/exhibit.service';
import type { Exhibit } from '../../feature/exhibit/exhibit.interface';

@Component({
	imports: [NgOptimizedImage, TranslateDirective, TranslatePipe],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(document:keydown.escape)': 'closeOverlays()',
	},
})
export class GalleryComponent {
	private readonly _exhibitService = inject(ExhibitService);
	private _copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

	protected readonly exhibits = this._exhibitService.exhibits;
	protected readonly loading = this._exhibitService.loading;
	protected readonly selectedExhibit = signal<Exhibit | null>(null);
	protected readonly selectedTags = signal<string[]>([]);
	protected readonly searchQuery = signal('');
	protected readonly tagSelectOpen = signal(false);
	protected readonly copiedImageUrl = signal(false);
	protected readonly tags = computed(() => {
		const tags = new Set<string>();

		for (const exhibit of this.exhibits()) {
			for (const tag of exhibit.tags) {
				tags.add(tag);
			}
		}

		return [...tags];
	});
	protected readonly selectedTagsLabel = computed(() => {
		const selectedTags = this.selectedTags();

		if (selectedTags.length === 0) {
			return 'All tags';
		}

		if (selectedTags.length === 1) {
			return selectedTags[0];
		}

		return `${selectedTags.length} tags`;
	});
	protected readonly filteredExhibits = computed(() => {
		const selectedTags = this.selectedTags();
		const query = this.searchQuery().trim().toLowerCase();

		return this.exhibits().filter((exhibit) => {
			const matchesTags =
				selectedTags.length === 0 ||
				selectedTags.every((tag) => exhibit.tags.includes(tag));

			if (!matchesTags) {
				return false;
			}

			if (!query) {
				return true;
			}

			const searchableText = [
				exhibit.name,
				exhibit.slug,
				exhibit.src,
				exhibit.description,
				...exhibit.covers,
				...exhibit.tags,
			]
				.join(' ')
				.toLowerCase();

			return searchableText.includes(query);
		});
	});

	protected openPhoto(exhibit: Exhibit) {
		if (!exhibit.src) {
			return;
		}

		this.copiedImageUrl.set(false);
		this.selectedExhibit.set(exhibit);
	}

	protected closePhoto() {
		this.selectedExhibit.set(null);
	}

	protected closeOverlays() {
		this.closePhoto();
		this.closeTagSelect();
	}

	protected updateSearchQuery(event: Event) {
		this.searchQuery.set((event.target as HTMLInputElement).value);
	}

	protected toggleTagSelect() {
		this.tagSelectOpen.update((open) => !open);
	}

	protected closeTagSelect() {
		this.tagSelectOpen.set(false);
	}

	protected toggleTag(tag: string) {
		this.selectedTags.update((selectedTags) =>
			selectedTags.includes(tag)
				? selectedTags.filter((selectedTag) => selectedTag !== tag)
				: [...selectedTags, tag],
		);
	}

	protected isTagSelected(tag: string) {
		return this.selectedTags().includes(tag);
	}

	protected clearFilters() {
		this.searchQuery.set('');
		this.selectedTags.set([]);
		this.tagSelectOpen.set(false);
	}

	protected clearSelectedTags() {
		this.selectedTags.set([]);
	}

	protected async copyImageUrl(event: MouseEvent, exhibit: Exhibit) {
		event.stopPropagation();

		if (!exhibit.src || typeof navigator === 'undefined' || !navigator.clipboard) {
			return;
		}

		const imageUrl =
			typeof window === 'undefined'
				? exhibit.src
				: new URL(exhibit.src, window.location.origin).toString();

		await navigator.clipboard.writeText(imageUrl);
		this.copiedImageUrl.set(true);

		if (this._copyResetTimeout) {
			clearTimeout(this._copyResetTimeout);
		}

		this._copyResetTimeout = setTimeout(() => {
			this.copiedImageUrl.set(false);
			this._copyResetTimeout = null;
		}, 1600);
	}
}
