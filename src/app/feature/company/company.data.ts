import companyData from '../../../data/company.json';
import {
	CompanyInfo,
	CompanyInfoItem,
	CompanyLink,
	CompanyProfile,
	CompanyStructuredData,
	SeoMetadata,
	SeoPageOverride,
} from './company.interface';

type RawCompanyProfile = Partial<
	Omit<CompanyProfile, 'info' | 'socials' | 'messengers' | 'listings' | 'defaultSeo' | 'pageSeo' | 'structuredData'>
> & {
	info?: Partial<CompanyInfo> & {
		highlights?: unknown;
		services?: unknown;
		businessCategories?: unknown;
		benefits?: unknown;
	};
	socials?: unknown;
	messengers?: unknown;
	listings?: unknown;
	defaultSeo?: Partial<SeoMetadata>;
	pageSeo?: Record<string, SeoPageOverride | undefined>;
	structuredData?: Partial<CompanyStructuredData>;
};

const rawCompanyProfile = companyData as RawCompanyProfile;

export const companyProfile = normalizeCompanyProfile(rawCompanyProfile);

export function normalizeCompanyProfile(
	company: RawCompanyProfile | Partial<CompanyProfile> | null | undefined,
): CompanyProfile {
	const raw = company ?? {};

	return {
		_id: _stringOrFallback(raw._id, rawCompanyProfile._id, 'demo'),
		name: _stringOrFallback(raw.name, rawCompanyProfile.name ?? 'Volyn IT Space'),
		description: _stringOrFallback(raw.description, rawCompanyProfile.description),
		email: _stringOrFallback(raw.email, rawCompanyProfile.email),
		phone: _stringOrFallback(raw.phone, rawCompanyProfile.phone),
		address: _stringOrFallback(raw.address, rawCompanyProfile.address),
		mapHref: _stringOrFallback(raw.mapHref, rawCompanyProfile.mapHref),
		region: _stringOrFallback(raw.region, rawCompanyProfile.region),
		country: _stringOrFallback(raw.country, rawCompanyProfile.country),
		logo: _normalizeAssetPath(_stringOrFallback(raw.logo, rawCompanyProfile.logo, '/logo.png')),
		lang: _stringOrFallback(raw.lang, rawCompanyProfile.lang, 'uk'),
		locale: _stringOrFallback(raw.locale, rawCompanyProfile.locale, 'uk_UA'),
		siteUrl: _trimTrailingSlash(
			_stringOrFallback(raw.siteUrl, rawCompanyProfile.siteUrl, 'https://volynit.space'),
		),
		info: _normalizeCompanyInfo(raw.info),
		socials: _normalizeLinks(raw.socials),
		messengers: _normalizeLinks(raw.messengers),
		listings: _normalizeLinks(raw.listings),
		defaultSeo: _normalizeSeoMetadata(raw.defaultSeo, raw.name ?? rawCompanyProfile.name),
		pageSeo: _normalizePageSeo(raw.pageSeo),
		structuredData: _normalizeStructuredData(raw.structuredData, raw),
	};
}

function _normalizeCompanyInfo(info: RawCompanyProfile['info']): CompanyInfo {
	return {
		eyebrow: _stringOrFallback(info?.eyebrow, rawCompanyProfile.info?.eyebrow),
		title: _stringOrFallback(info?.title, rawCompanyProfile.info?.title),
		lead: _stringOrFallback(info?.lead, rawCompanyProfile.info?.lead),
		focus: _stringOrFallback(info?.focus, rawCompanyProfile.info?.focus),
		highlights: _stringArrayOrFallback(info?.highlights, rawCompanyProfile.info?.highlights),
		services: _stringArrayOrFallback(info?.services, rawCompanyProfile.info?.services),
		businessCategories: _infoItemsOrFallback(
			info?.businessCategories,
			rawCompanyProfile.info?.businessCategories,
		),
		benefits: _stringArrayOrFallback(info?.benefits, rawCompanyProfile.info?.benefits),
	};
}

function _normalizeSeoMetadata(
	metadata: Partial<SeoMetadata> | null | undefined,
	companyName: string | undefined,
): SeoMetadata {
	const fallbackMetadata = rawCompanyProfile.defaultSeo;
	const fallbackName = _stringOrFallback(companyName, rawCompanyProfile.name, 'Volyn IT Space');

	return {
		title: _stringOrFallback(metadata?.title, fallbackMetadata?.title, fallbackName),
		description: _stringOrFallback(
			metadata?.description,
			fallbackMetadata?.description,
			rawCompanyProfile.description,
		),
		keywords: _stringArrayOrFallback(metadata?.keywords, fallbackMetadata?.keywords),
		author: _stringOrFallback(metadata?.author, fallbackMetadata?.author, fallbackName),
		robots: _stringOrFallback(metadata?.robots, fallbackMetadata?.robots, 'index, follow'),
		image: _normalizeAssetPath(
			_stringOrFallback(metadata?.image, fallbackMetadata?.image, rawCompanyProfile.logo, '/logo.png'),
		),
		type: _stringOrFallback(metadata?.type, fallbackMetadata?.type, 'website'),
		twitterCard: _stringOrFallback(
			metadata?.twitterCard,
			fallbackMetadata?.twitterCard,
			'summary_large_image',
		),
	};
}

function _normalizePageSeo(
	pageSeo: Record<string, SeoPageOverride | undefined> | null | undefined,
): Record<string, SeoPageOverride> {
	if (!pageSeo) {
		return {};
	}

	return Object.fromEntries(
		Object.entries(pageSeo).map(([path, metadata]) => [
			path,
			{
				title: _optionalString(metadata?.title),
				description: _optionalString(metadata?.description),
				keywords: Array.isArray(metadata?.keywords)
					? metadata.keywords.filter(
							(keyword): keyword is string =>
								typeof keyword === 'string' && keyword.trim().length > 0,
						)
					: undefined,
				author: _optionalString(metadata?.author),
				robots: _optionalString(metadata?.robots),
				image: metadata?.image ? _normalizeAssetPath(metadata.image) : undefined,
				type: _optionalString(metadata?.type),
				twitterCard: _optionalString(metadata?.twitterCard),
				canonicalPath: _optionalString(metadata?.canonicalPath),
			},
		]),
	);
}

function _normalizeStructuredData(
	structuredData: Partial<CompanyStructuredData> | null | undefined,
	company: RawCompanyProfile | Partial<CompanyProfile>,
): CompanyStructuredData {
	return {
		type: _stringOrFallback(structuredData?.type, rawCompanyProfile.structuredData?.type, 'ProfessionalService'),
		addressLocality: _stringOrFallback(
			structuredData?.addressLocality,
			rawCompanyProfile.structuredData?.addressLocality,
			company.region,
			rawCompanyProfile.region,
		),
		addressCountry: _stringOrFallback(
			structuredData?.addressCountry,
			rawCompanyProfile.structuredData?.addressCountry,
			'UA',
		),
		areaServed: _stringOrFallback(
			structuredData?.areaServed,
			rawCompanyProfile.structuredData?.areaServed,
			company.region,
			rawCompanyProfile.region,
		),
		serviceType: _stringArrayOrFallback(
			structuredData?.serviceType,
			rawCompanyProfile.structuredData?.serviceType,
			rawCompanyProfile.info?.services,
		),
		sameAs: _stringArrayOrFallback(structuredData?.sameAs, rawCompanyProfile.structuredData?.sameAs),
	};
}

function _normalizeLinks(value: unknown): CompanyLink[] {
	if (!Array.isArray(value)) {
		return [];
	}

	return value
		.filter((entry): entry is Record<string, unknown> => typeof entry === 'object' && entry !== null)
		.map((entry) => ({
			label: _stringOrFallback(entry['label'] as string | undefined),
			value: _stringOrFallback(entry['value'] as string | undefined),
			href: _stringOrFallback(entry['href'] as string | undefined),
			type: _stringOrFallback(entry['type'] as string | undefined),
		}))
		.filter((entry) => entry.label && entry.href);
}

function _infoItemsOrFallback(value: unknown, fallback: unknown): CompanyInfoItem[] {
	const source = Array.isArray(value) ? value : Array.isArray(fallback) ? fallback : [];

	return source
		.filter((entry): entry is Record<string, unknown> => typeof entry === 'object' && entry !== null)
		.map((entry) => ({
			title: _stringOrFallback(entry['title'] as string | undefined),
			description: _stringOrFallback(entry['description'] as string | undefined),
		}))
		.filter((entry) => entry.title || entry.description);
}

function _stringOrFallback(...values: Array<string | null | undefined>): string {
	for (const value of values) {
		if (typeof value === 'string' && value.trim().length > 0) {
			return value.trim();
		}
	}

	return '';
}

function _optionalString(value: string | null | undefined): string | undefined {
	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function _stringArrayOrFallback(...values: unknown[]): string[] {
	for (const value of values) {
		if (Array.isArray(value)) {
			return value.filter(
				(entry): entry is string => typeof entry === 'string' && entry.trim().length > 0,
			);
		}
	}

	return [];
}

function _normalizeAssetPath(value: string): string {
	if (!value) {
		return '/logo.png';
	}

	if (/^https?:\/\//i.test(value) || value.startsWith('/')) {
		return value;
	}

	return `/${value}`;
}

function _trimTrailingSlash(value: string): string {
	return value.endsWith('/') ? value.slice(0, -1) : value;
}
