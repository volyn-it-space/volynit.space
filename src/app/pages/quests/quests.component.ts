import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './quests.component.html',
	styleUrl: './quests.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestsComponent {}
