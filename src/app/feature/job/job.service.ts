import { Injectable } from '@angular/core';
import jobsData from '../../../data/jobs.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Job } from './job.interface';

@Injectable({
	providedIn: 'root',
})
export class JobService {
	private readonly _store = new ArrayFeatureStore<Job>(jobsData as Job[]);

	readonly jobs = this._store.items;
	readonly loading = this._store.loading;

	resolveJobs(jobs: Job[] | null | undefined) {
		this._store.resolve(jobs);
	}
}
