import { Injectable } from '@angular/core';
import merchData from '../../../data/merchs.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Product } from './merch.interface';

@Injectable({
	providedIn: 'root',
})
export class MerchService {
	private readonly _store = new ArrayFeatureStore<Product>(merchData as Product[]);

	readonly products = this._store.items;
	readonly loading = this._store.loading;

	resolveProducts(products: Product[] | null | undefined) {
		this._store.resolve(products);
	}
}
