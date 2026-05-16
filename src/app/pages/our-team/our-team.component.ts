import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';

import { ProfileComponent } from '../../components/profile/profile.component';
import { Profile } from '../../feature/profile/profile.interface';
import { ProfileService } from '../../feature/profile/profile.service';

type RoleKey = 'founder' | 'developer' | 'agent' | 'smm' | 'photographer';

type TeamMember = {
	profile: Profile;
	role: string;
};

type TeamSection = {
	title: string;
	members: TeamMember[];
};

const roleTitles: Record<RoleKey, string> = {
	founder: 'Founders',
	developer: 'Product developers',
	agent: 'Client managers',
	smm: 'SMM specialists',
	photographer: 'Photographers',
};

@Component({
	imports: [TranslateDirective, TranslatePipe, ProfileComponent],
	templateUrl: './our-team.component.html',
	styleUrl: './our-team.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurTeamComponent {
	private readonly _profileService = inject(ProfileService);

	protected readonly loading = this._profileService.loading;
	protected readonly teamSections = computed<TeamSection[]>(() => {
		const sections = new Map<string, TeamMember[]>();

		for (const profile of this._profileService.profiles()) {
			for (const role of new Set(profile.roles)) {
				const title = this._getRoleTitle(role);
				const members = sections.get(title) ?? [];

				members.push({
					profile,
					role,
				});

				sections.set(title, members);
			}
		}

		return Array.from(sections, ([title, members]) => ({ title, members })).sort(
			(left, right) => this._getRoleOrder(left.title) - this._getRoleOrder(right.title),
		);
	});

	private _getRoleTitle(role: string): string {
		return roleTitles[role as RoleKey] ?? role;
	}

	private _getRoleOrder(title: string): number {
		const orderedTitles = Object.values(roleTitles);
		const index = orderedTitles.indexOf(title);

		return index === -1 ? orderedTitles.length : index;
	}
}
