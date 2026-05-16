export interface Company {
	_id: string;
	name: string;
	description: string;
	email: string;
	phone: string;
	address: string;
	mapHref: string;
	region: string;
	country: string;
	logo: string;
	info: CompanyInfo;
	socials: CompanyLink[];
	messengers: CompanyLink[];
	listings: CompanyLink[];
}

export interface SeoMetadata {
	title: string;
	description: string;
	keywords: string[];
	author: string;
	robots: string;
	image: string;
	type: string;
	twitterCard: string;
}

export interface SeoPageOverride extends Partial<SeoMetadata> {
	canonicalPath?: string;
}

export interface CompanyStructuredData {
	type: string;
	addressLocality: string;
	addressCountry: string;
	areaServed: string;
	serviceType: string[];
	sameAs: string[];
}

export interface CompanyProfile extends Company {
	lang: string;
	locale: string;
	siteUrl: string;
	defaultSeo: SeoMetadata;
	pageSeo: Record<string, SeoPageOverride>;
	structuredData: CompanyStructuredData;
}

export interface CompanyInfo {
	eyebrow: string;
	title: string;
	lead: string;
	focus: string;
	highlights: string[];
	services: string[];
	businessCategories: CompanyInfoItem[];
	benefits: string[];
}

export interface CompanyInfoItem {
	title: string;
	description: string;
}

export interface CompanyLink {
	label: string;
	value: string;
	href: string;
	type: string;
}
