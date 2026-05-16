import { Injectable } from '@angular/core';
import profilesData from '../../../data/profiles.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Profile } from './profile.interface';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private readonly _store = new ArrayFeatureStore<Profile>(profilesData as Profile[]);

	readonly profiles = this._store.items;
	readonly loading = this._store.loading;

	resolveProfiles(profiles: Profile[] | null | undefined) {
		this._store.resolve(profiles);
	}
}
