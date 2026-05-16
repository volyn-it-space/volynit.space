import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { pageNavigationItems } from '../../data/site-navigation';

@Component({
	imports: [RouterLink, TranslateDirective, TranslatePipe],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	protected readonly navigationItems = pageNavigationItems;
}
