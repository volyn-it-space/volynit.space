import { Injectable } from '@angular/core';
import reviewsData from '../../../data/reviews.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Review } from './review.interface';

@Injectable({
	providedIn: 'root',
})
export class ReviewService {
	private readonly _store = new ArrayFeatureStore<Review>(reviewsData as Review[]);

	readonly reviews = this._store.items;
	readonly loading = this._store.loading;

	resolveReviews(reviews: Review[] | null | undefined) {
		this._store.resolve(reviews);
	}
}
