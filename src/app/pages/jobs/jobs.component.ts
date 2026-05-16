import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { JobService } from '../../feature/job/job.service';

@Component({
	imports: [RouterLink, TranslateDirective, TranslatePipe],
	templateUrl: './jobs.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent {
	private readonly _jobService = inject(JobService);

	protected readonly jobs = this._jobService.jobs;
	protected readonly loading = this._jobService.loading;
}
