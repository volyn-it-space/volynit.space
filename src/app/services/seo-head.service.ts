import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CompanyService } from '../feature/company/company.service';
import { buildAbsoluteUrl, buildCanonicalUrl } from '../seo/seo.utils';

@Injectable({
	providedIn: 'root',
})
export class SeoHeadService {
	private readonly _document = inject(DOCUMENT);
	private readonly _meta = inject(Meta);
	private readonly _router = inject(Router);
	private readonly _companyService = inject(CompanyService);
	private _initialized = false;

	initialize() {
		if (this._initialized) {
			return;
		}

		this._initialized = true;
		this._apply(this._router.url);

		this._router.events
			.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe((event) => this._apply(event.urlAfterRedirects));
	}

	private _apply(url: string) {
		const profile = this._companyService.company();
		const path = _normalizePath(url);
		const pageSeo = profile.pageSeo[path];
		const image = buildAbsoluteUrl(pageSeo?.image ?? profile.defaultSeo.image, profile);
		const canonical = buildCanonicalUrl(url, profile);
		const keywords = (pageSeo?.keywords?.length ? pageSeo.keywords : profile.defaultSeo.keywords).join(
			', ',
		);
		const author = pageSeo?.author ?? profile.defaultSeo.author;

		this._document.documentElement.setAttribute('lang', profile.lang);
		this._meta.updateTag({ property: 'og:site_name', content: profile.name }, "property='og:site_name'");
		this._meta.updateTag({ property: 'og:locale', content: profile.locale }, "property='og:locale'");
		this._meta.updateTag({ property: 'og:url', content: canonical }, "property='og:url'");
		this._meta.updateTag(
			{ property: 'og:type', content: pageSeo?.type ?? profile.defaultSeo.type },
			"property='og:type'",
		);
		this._meta.updateTag(
			{ name: 'twitter:card', content: pageSeo?.twitterCard ?? profile.defaultSeo.twitterCard },
			"name='twitter:card'",
		);

		if (image) {
			this._meta.updateTag({ name: 'twitter:image', content: image }, "name='twitter:image'");
			this._meta.updateTag(
				{ name: 'twitter:image:src', content: image },
				"name='twitter:image:src'",
			);
		}

		if (keywords) {
			this._meta.updateTag({ name: 'keywords', content: keywords }, "name='keywords'");
		}

		if (author) {
			this._meta.updateTag({ name: 'author', content: author }, "name='author'");
		}

		this._syncStructuredData(canonical, image);
	}

	private _syncStructuredData(canonical: string, image: string | undefined) {
		const profile = this._companyService.company();
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': profile.structuredData.type,
			name: profile.name,
			url: canonical,
			image: image ?? buildAbsoluteUrl(profile.defaultSeo.image, profile),
			description: profile.defaultSeo.description || profile.description,
			email: profile.email,
			telephone: profile.phone,
			address: {
				'@type': 'PostalAddress',
				streetAddress: profile.address,
				addressLocality: profile.structuredData.addressLocality,
				addressCountry: profile.structuredData.addressCountry,
			},
			areaServed: {
				'@type': 'AdministrativeArea',
				name: profile.structuredData.areaServed,
			},
			serviceType: profile.structuredData.serviceType,
			sameAs: profile.structuredData.sameAs,
		};
		const existingScript =
			this._document.head.querySelector<HTMLScriptElement>(
				'script[type="application/ld+json"][data-seo-structured-data="company"]',
			) ?? this._document.createElement('script');

		if (!existingScript.parentElement) {
			existingScript.type = 'application/ld+json';
			existingScript.setAttribute('data-seo-structured-data', 'company');
			this._document.head.appendChild(existingScript);
		}

		existingScript.textContent = JSON.stringify(structuredData);
	}
}

function _normalizePath(url: string): string {
	const path = url.split(/[?#]/)[0] || '/';

	return path.startsWith('/') ? path : `/${path}`;
}
