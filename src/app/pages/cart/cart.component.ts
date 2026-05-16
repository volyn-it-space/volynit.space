import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { CartService } from '../../feature/cart/cart.service';

@Component({
	imports: [ReactiveFormsModule, RouterLink, TranslateDirective, TranslatePipe],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
	private readonly _formBuilder = inject(FormBuilder).nonNullable;
	private readonly _cartService = inject(CartService);

	protected readonly cartItems = this._cartService.items;
	protected readonly cartCount = this._cartService.count;
	protected readonly submitted = signal(false);
	protected readonly deliveryForm = this._formBuilder.group({
		fullName: ['', [Validators.required, Validators.minLength(2)]],
		phone: ['', [Validators.required, Validators.minLength(8)]],
		email: ['', [Validators.required, Validators.email]],
		city: ['', [Validators.required]],
		address: ['', [Validators.required]],
		comment: [''],
	});
	protected readonly totalLabel = computed(() =>
		this.cartItems()
			.map((item) => item.price)
			.join(' + '),
	);

	protected removeItem(productName: string) {
		this._cartService.removeProduct(productName);
	}

	protected clearCart() {
		this._cartService.clear();
	}

	protected submitOrder() {
		this.deliveryForm.markAllAsTouched();
		this.submitted.set(false);

		if (this.deliveryForm.invalid || this.cartCount() === 0) {
			return;
		}

		this.submitted.set(true);
	}
}
