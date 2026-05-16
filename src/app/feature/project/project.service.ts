import { Injectable } from '@angular/core';
import projectsData from '../../../data/projects.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Project } from './project.interface';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	private readonly _store = new ArrayFeatureStore<Project>(projectsData as Project[]);

	readonly projects = this._store.items;
	readonly loading = this._store.loading;

	resolveProjects(projects: Project[] | null | undefined) {
		this._store.resolve(projects);
	}
}
