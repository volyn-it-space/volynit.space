import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { CompanyLink } from '../../feature/company/company.interface';
import { CompanyService } from '../../feature/company/company.service';

@Component({
	imports: [NgOptimizedImage, TranslateDirective, TranslatePipe],
	templateUrl: './socials.component.html',
	styleUrl: './socials.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsComponent {
	private readonly _companyService = inject(CompanyService);

	protected readonly company = this._companyService.company;
	protected readonly phoneHref = computed(
		() => `tel:${this.company().phone.replace(/[^+\d]/g, '')}`,
	);
	protected readonly emailHref = computed(() => `mailto:${this.company().email}`);

	protected messengerIcon(link: CompanyLink): string {
		return (
			{
				telegram: 'send',
				viber: 'forum',
				whatsapp: 'chat',
			}[link.type] ?? 'chat'
		);
	}

	protected socialMark(link: CompanyLink): string {
		return (
			{
				instagram: 'IG',
				facebook: 'FB',
				tiktok: 'TT',
				youtube: 'YT',
				threads: 'TH',
				x: 'X',
				linkedin: 'IN',
				pinterest: 'PT',
			}[link.type] ?? link.label.slice(0, 2).toUpperCase()
		);
	}

	protected listingIcon(link: CompanyLink): string {
		return (
			{
				'google-business': 'storefront',
				tripadvisor: 'travel_explore',
				'bolt-food': 'delivery_dining',
				glovo: 'local_shipping',
			}[link.type] ?? 'storefront'
		);
	}
}
