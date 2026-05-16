import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@wawjs/ngx-translate';
import { bottomNavigationItems } from './data/site-navigation';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { CanonicalService } from './services/canonical.service';
import { ScrollService } from './services/scroll.service';
import { SeoHeadService } from './services/seo-head.service';

@Component({
	selector: 'app-root',
	imports: [RouterLink, RouterLinkActive, RouterOutlet, TopbarComponent, TranslatePipe],
	template: `
		<app-topbar />

		<div class="pb-24">
			<router-outlet />
		</div>

		<nav
			aria-label="Bottom navigation"
			class="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--c-border)] bg-[var(--c-bg-secondary)]/95 px-2 py-1.5 backdrop-blur supports-[backdrop-filter]:bg-[var(--c-bg-secondary)]/88"
		>
			<div class="mx-auto grid max-w-[var(--container)] grid-cols-5 gap-1">
				@for (item of navItems; track item.label) {
					@if (item.route) {
						<a
							class="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-[0.9rem] px-1 py-1.5 text-[10px] font-medium text-[var(--c-text-muted)] transition-colors duration-200 hover:bg-[var(--c-bg-primary)]"
							[routerLink]="item.route"
							[routerLinkActiveOptions]="{ exact: item.exact }"
							routerLinkActive="bg-[var(--c-bg-soft)] text-[var(--c-secondary)]"
						>
							<span class="material-symbols-outlined text-[19px]" aria-hidden="true">
								{{ item.icon }}
							</span>
							<span class="truncate">{{ item.label }}</span>
						</a>
					} @else {
						<button
							class="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-[0.9rem] px-1 py-1.5 text-[10px] font-medium text-[var(--c-text-muted)] transition-colors duration-200 hover:bg-[var(--c-bg-primary)]"
							type="button"
						>
							<span class="material-symbols-outlined text-[19px]" aria-hidden="true">
								{{ item.icon }}
							</span>
							<span class="truncate">{{ item.label | translate }}</span>
						</button>
					}
				}
			</div>
		</nav>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private readonly _canonicalService = inject(CanonicalService);
	private readonly _seoHeadService = inject(SeoHeadService);
	private readonly _scrollService = inject(ScrollService);

	protected readonly navItems = bottomNavigationItems;

	constructor() {
		this._canonicalService.initialize();
		this._seoHeadService.initialize();
		this._scrollService.initialize();
	}
}
