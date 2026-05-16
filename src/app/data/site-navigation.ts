export interface SiteNavigationItem {
	readonly label: string;
	readonly icon: string;
	readonly route: string;
	readonly exact: boolean;
}

export const bottomNavigationItems: readonly SiteNavigationItem[] = [
	{ label: 'Nav', icon: 'navigation', route: '/navigation', exact: true },
	{ label: 'FAQ', icon: 'help', route: '/faq', exact: true },
	{ label: 'Jobs', icon: 'badge', route: '/jobs', exact: true },
	{ label: 'Our Team', icon: 'groups', route: '/our-team', exact: true },
	{ label: 'Our Work', icon: 'workspaces', route: '/our-work', exact: true },
];

export const pageNavigationItems: readonly SiteNavigationItem[] = [
	{ label: 'Gallery', icon: 'photo_library', route: '/gallery', exact: true },
	{ label: 'Socials', icon: 'share', route: '/socials', exact: true },
	{ label: 'Events', icon: 'event', route: '/events', exact: true },
	{ label: 'Discounts', icon: 'local_offer', route: '/discounts', exact: true },
	{ label: 'Articles', icon: 'article', route: '/articles', exact: true },
	{ label: 'Reviews', icon: 'rate_review', route: '/reviews', exact: true },
];
