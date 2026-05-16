import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import type { Project } from '../../feature/project/project.interface';
import { ProjectService } from '../../feature/project/project.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './our-work.component.html',
	styleUrl: './our-work.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurWorkComponent {
	private readonly _projectService = inject(ProjectService);
	private readonly _socialLabels: Record<string, string> = {
		instagram: 'Instagram',
		restaurantInstagram: 'Restaurant Instagram',
		facebook: 'Facebook',
	};

	protected readonly projects = this._projectService.projects;
	protected readonly loading = this._projectService.loading;

	protected socialEntries(project: Project) {
		return Object.entries(project.socials ?? {}).filter(([, url]) => !!url);
	}

	protected socialLabel(key: string) {
		return this._socialLabels[key] ?? key;
	}

	protected phoneHref(phone: string) {
		return `tel:${phone}`;
	}
}
