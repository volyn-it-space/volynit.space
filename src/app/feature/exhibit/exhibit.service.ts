import { Injectable } from '@angular/core';
import exhibitsData from '../../../data/exhibits.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Exhibit } from './exhibit.interface';

@Injectable({
	providedIn: 'root',
})
export class ExhibitService {
	private readonly _store = new ArrayFeatureStore<Exhibit>(exhibitsData as Exhibit[]);

	readonly exhibits = this._store.items;
	readonly loading = this._store.loading;

	resolveExhibits(exhibits: Exhibit[] | null | undefined) {
		this._store.resolve(exhibits);
	}
}
