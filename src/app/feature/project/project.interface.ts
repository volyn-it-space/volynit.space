export interface ProjectSocials {
	instagram?: string;
	restaurantInstagram?: string;
	facebook?: string;
	[key: string]: string | undefined;
}

export interface Project {
	badge: string;
	category: string;
	title: string;
	description: string;
	tags: string[];
	projectUrl?: string;
	googlePlace?: string;
	address?: string | null;
	secondaryAddresses?: string[];
	phones?: string[];
	email?: string | null;
	secondaryEmail?: string | null;
	socials?: ProjectSocials;
}
