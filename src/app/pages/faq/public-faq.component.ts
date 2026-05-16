import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaqComponent } from './faq.component';

@Component({
	imports: [FaqComponent],
	template: `<app-faq />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicFaqComponent {}
