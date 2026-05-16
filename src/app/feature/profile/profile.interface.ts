export interface Profile {
	name: string;
	seniority: string;
	roles: string[];
	company: string;
	image: string;
	location?: ProfileLocation;
	socials: ProfileSocialLink[];
}

export type ProfileLocation = 'local' | 'remote';

export interface ProfileSocialLink {
	label: string;
	icon: 'linkedin' | 'github' | 'email' | 'instagram';
	href: string;
	external?: boolean;
}
