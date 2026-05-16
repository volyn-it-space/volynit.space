import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { Faq, FaqAudience } from '../../feature/faq/faq.interface';
import { FaqService } from '../../feature/faq/faq.service';

interface FaqPageContent {
	readonly eyebrow: string;
	readonly title: string;
	readonly intro: string;
}

const pageContent: Record<FaqAudience, FaqPageContent> = {
	public: {
		eyebrow: 'FAQ',
		title: 'Frequently asked questions',
		intro: 'Common questions for clients, partners, and visitors.',
	},
	agent: {
		eyebrow: 'INTERNAL FAQ',
		title: 'Agent FAQ',
		intro: 'Internal guidance for presenting products, handling clients, and managing communication.',
	},
	developer: {
		eyebrow: 'INTERNAL FAQ',
		title: 'Developer FAQ',
		intro: 'Internal guidance for implementation, scope changes, approvals, and technical responsibility.',
	},
};

@Component({
	selector: 'app-faq',
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './faq.component.html',
	styleUrl: './faq.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
	private readonly _faqService = inject(FaqService);

	readonly audience = input<FaqAudience>('public');
	protected readonly openItemId = signal<string | null>(null);
	protected readonly loading = this._faqService.loading;
	protected readonly content = computed(() => pageContent[this.audience()]);
	protected readonly items = computed(() =>
		this._faqService.faqs().filter((item) => item.audience === this.audience()),
	);

	protected isOpen(item: Faq) {
		return this.openItemId() === item.id;
	}

	protected toggleItem(item: Faq) {
		this.openItemId.update((id) => (id === item.id ? null : item.id));
	}
}
