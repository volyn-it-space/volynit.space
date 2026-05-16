import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaqComponent } from './faq.component';

@Component({
	imports: [FaqComponent],
	template: `<app-faq audience="agent" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentFaqComponent {}
