import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { DiscountService } from '../../feature/discount/discount.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './discounts.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountsComponent {
	private readonly _discountService = inject(DiscountService);

	protected readonly discounts = this._discountService.discounts;
	protected readonly loading = this._discountService.loading;
}
