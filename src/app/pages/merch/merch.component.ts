import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { CartService } from '../../feature/cart/cart.service';
import { MerchService } from '../../feature/merch/merch.service';
import type { Product } from '../../feature/merch/merch.interface';

@Component({
	imports: [RouterLink, TranslateDirective, TranslatePipe],
	templateUrl: './merch.component.html',
	styleUrl: './merch.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchComponent {
	private readonly _cartService = inject(CartService);
	private readonly _merchService = inject(MerchService);

	protected readonly merchItems = this._merchService.products;
	protected readonly loading = this._merchService.loading;
	protected readonly cartCount = this._cartService.count;

	protected isInCart(productName: string): boolean {
		return this._cartService.hasProduct(productName);
	}

	protected addToCart(product: Product) {
		this._cartService.addProduct(product);
	}

	protected removeFromCart(productName: string) {
		this._cartService.removeProduct(productName);
	}
}
