import { Injectable } from '@angular/core';
import discountsData from '../../../data/discounts.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Discount } from './discount.interface';

@Injectable({
	providedIn: 'root',
})
export class DiscountService {
	private readonly _store = new ArrayFeatureStore<Discount>(discountsData as Discount[]);

	readonly discounts = this._store.items;
	readonly loading = this._store.loading;

	resolveDiscounts(discounts: Discount[] | null | undefined) {
		this._store.resolve(discounts);
	}
}
