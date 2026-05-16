import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { EventService } from '../../feature/event/event.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './events.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
	private readonly _eventService = inject(EventService);

	protected readonly events = this._eventService.events;
	protected readonly loading = this._eventService.loading;
}
