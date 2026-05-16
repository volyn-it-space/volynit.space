import { Injectable } from '@angular/core';
import eventsData from '../../../data/events.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Event } from './event.interface';

@Injectable({
	providedIn: 'root',
})
export class EventService {
	private readonly _store = new ArrayFeatureStore<Event>(eventsData as Event[]);

	readonly events = this._store.items;
	readonly loading = this._store.loading;

	resolveEvents(events: Event[] | null | undefined) {
		this._store.resolve(events);
	}
}
