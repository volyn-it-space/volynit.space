import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@wawjs/ngx-translate';

import { Profile } from '../../feature/profile/profile.interface';

@Component({
	imports: [NgOptimizedImage, TitleCasePipe, TranslatePipe],
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
	profile = input.required<Profile>();
	visibleSocials = computed(() => this.profile().socials.slice(0, 3));
	location = computed(() => this.profile().location ?? 'local');
	locationLabel = computed(() => (this.location() === 'remote' ? 'Remote' : 'Local'));
	locationIcon = computed(() => (this.location() === 'remote' ? 'wifi' : 'location_on'));
}
