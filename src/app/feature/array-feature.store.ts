import { signal } from '@angular/core';

type FeatureSource = 'api' | 'fallback' | 'empty';

export class ArrayFeatureStore<T> {
	private readonly _fallbackItems: T[];

	readonly items = signal<T[]>([]);
	readonly loading = signal(true);
	readonly source = signal<FeatureSource>('empty');

	constructor(fallbackItems: readonly T[]) {
		this._fallbackItems = [...fallbackItems];
	}

	resolve(apiItems: readonly T[] | null | undefined) {
		if (Array.isArray(apiItems) && apiItems.length > 0) {
			this.items.set([...apiItems]);
			this.source.set('api');
			this.loading.set(false);

			return;
		}

		if (this._fallbackItems.length > 0) {
			this.items.set([...this._fallbackItems]);
			this.source.set('fallback');
			this.loading.set(false);

			return;
		}

		this.items.set([]);
		this.source.set('empty');
		this.loading.set(false);
	}
}
