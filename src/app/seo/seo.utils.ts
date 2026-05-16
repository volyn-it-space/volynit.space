import type { MetaPage } from '@wawjs/ngx-core';
import { companyProfile } from '../feature/company/company.data';
import { CompanyProfile } from '../feature/company/company.interface';

const _absoluteUrlPattern = /^https?:\/\//i;

export const seoTitleSuffix = ` | ${companyProfile.name}`;

export function buildAbsoluteUrl(
	value: string | null | undefined,
	profile: CompanyProfile = companyProfile,
): string | undefined {
	if (typeof value !== 'string' || value.trim().length === 0) {
		return undefined;
	}

	if (_absoluteUrlPattern.test(value)) {
		return value.trim();
	}

	return `${profile.siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
}

export function buildCanonicalUrl(
	url: string,
	profile: CompanyProfile = companyProfile,
): string {
	const path = url.split(/[?#]/)[0] || '/';
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	const canonicalPath = profile.pageSeo[normalizedPath]?.canonicalPath ?? normalizedPath;

	return canonicalPath === '/' ? profile.siteUrl : `${profile.siteUrl}${canonicalPath}`;
}

export function buildRouteMeta(
	path: string,
	profile: CompanyProfile = companyProfile,
): MetaPage {
	const pageSeo = profile.pageSeo[path];

	return {
		title: stripTitleSuffix(
			pageSeo?.title ?? (path === '/' ? profile.defaultSeo.title : undefined),
			profile,
		),
		description:
			pageSeo?.description ?? (path === '/' ? profile.defaultSeo.description : undefined),
		image: buildAbsoluteUrl(pageSeo?.image ?? profile.defaultSeo.image, profile),
		robots: pageSeo?.robots,
	};
}

export function stripTitleSuffix(
	title: string | null | undefined,
	profile: CompanyProfile = companyProfile,
): string | undefined {
	if (typeof title !== 'string' || title.trim().length === 0) {
		return undefined;
	}

	const normalizedTitle = title.trim();
	const titleSuffix = ` | ${profile.name}`;
	const leadingTitlePrefix = `${profile.name} | `;

	if (normalizedTitle.endsWith(titleSuffix)) {
		return normalizedTitle.slice(0, -titleSuffix.length);
	}

	if (normalizedTitle.startsWith(leadingTitlePrefix)) {
		return normalizedTitle.slice(leadingTitlePrefix.length);
	}

	return normalizedTitle;
}
