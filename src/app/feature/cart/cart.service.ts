import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import type { Product } from '../merch/merch.interface';

const CART_STORAGE_KEY = 'city-space-cart';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _items = signal<Product[]>([]);

	readonly items = this._items.asReadonly();
	readonly count = computed(() => this._items().length);
	readonly isEmpty = computed(() => this.count() === 0);

	constructor() {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		const rawCart = localStorage.getItem(CART_STORAGE_KEY);

		if (!rawCart) {
			return;
		}

		try {
			const parsedCart = JSON.parse(rawCart) as Product[];
			this._items.set(Array.isArray(parsedCart) ? parsedCart : []);
		} catch {
			localStorage.removeItem(CART_STORAGE_KEY);
		}
	}

	hasProduct(productName: string): boolean {
		return this._items().some((item) => item.name === productName);
	}

	addProduct(product: Product) {
		if (this.hasProduct(product.name)) {
			return;
		}

		this._items.update((items) => [...items, product]);
		this._persist();
	}

	removeProduct(productName: string) {
		this._items.update((items) => items.filter((item) => item.name !== productName));
		this._persist();
	}

	clear() {
		this._items.set([]);
		this._persist();
	}

	private _persist() {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this._items()));
	}
}
