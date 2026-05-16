import { Routes } from '@angular/router';
import { buildRouteMeta } from './seo/seo.utils';

export const routes: Routes = [
	{
		path: '',
		data: {
			meta: buildRouteMeta('/'),
		},
		loadComponent: () =>
			import('./pages/landing/landing.component').then((m) => m.LandingComponent),
	},
	{
		path: 'our-work',
		data: {
			meta: buildRouteMeta('/our-work'),
		},
		loadComponent: () =>
			import('./pages/our-work/our-work.component').then((m) => m.OurWorkComponent),
	},
	{
		path: 'our-team',
		data: {
			meta: buildRouteMeta('/our-team'),
		},
		loadComponent: () =>
			import('./pages/our-team/our-team.component').then((m) => m.OurTeamComponent),
	},
	{
		path: 'merch',
		data: {
			meta: buildRouteMeta('/merch'),
		},
		loadComponent: () => import('./pages/merch/merch.component').then((m) => m.MerchComponent),
	},
	{
		path: 'cart',
		data: {
			meta: buildRouteMeta('/cart'),
		},
		loadComponent: () => import('./pages/cart/cart.component').then((m) => m.CartComponent),
	},
	{
		path: 'gallery',
		data: {
			meta: buildRouteMeta('/gallery'),
		},
		loadComponent: () =>
			import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
	},
	{
		path: 'discounts',
		data: {
			meta: buildRouteMeta('/discounts'),
		},
		loadComponent: () =>
			import('./pages/discounts/discounts.component').then((m) => m.DiscountsComponent),
	},
	{
		path: 'articles',
		data: {
			meta: buildRouteMeta('/articles'),
		},
		loadComponent: () =>
			import('./pages/articles/articles.component').then((m) => m.ArticlesComponent),
	},
	{
		path: 'reviews',
		data: {
			meta: buildRouteMeta('/reviews'),
		},
		loadComponent: () =>
			import('./pages/reviews/reviews.component').then((m) => m.ReviewsComponent),
	},
	{
		path: 'events',
		data: {
			meta: buildRouteMeta('/events'),
		},
		loadComponent: () =>
			import('./pages/events/events.component').then((m) => m.EventsComponent),
	},
	{
		path: 'jobs',
		data: {
			meta: buildRouteMeta('/jobs'),
		},
		loadComponent: () => import('./pages/jobs/jobs.component').then((m) => m.JobsComponent),
	},
	{
		path: 'faq',
		data: {
			meta: buildRouteMeta('/faq'),
		},
		loadComponent: () =>
			import('./pages/faq/public-faq.component').then((m) => m.PublicFaqComponent),
	},
	{
		path: 'faq/agent',
		data: {
			meta: buildRouteMeta('/faq/agent'),
		},
		loadComponent: () =>
			import('./pages/faq/agent-faq.component').then((m) => m.AgentFaqComponent),
	},
	{
		path: 'faq/developer',
		data: {
			meta: buildRouteMeta('/faq/developer'),
		},
		loadComponent: () =>
			import('./pages/faq/developer-faq.component').then((m) => m.DeveloperFaqComponent),
	},
	{
		path: 'navigation',
		data: {
			meta: buildRouteMeta('/navigation'),
		},
		loadComponent: () =>
			import('./pages/navigation/navigation.component').then((m) => m.NavigationComponent),
	},
	{
		path: 'socials',
		data: {
			meta: buildRouteMeta('/socials'),
		},
		loadComponent: () =>
			import('./pages/socials/socials.component').then((m) => m.SocialsComponent),
	},
	{
		path: 'aktsii',
		redirectTo: 'discounts',
		pathMatch: 'full',
	},
	{
		path: 'promotions',
		redirectTo: 'discounts',
		pathMatch: 'full',
	},
	{
		path: 'sales',
		redirectTo: 'discounts',
		pathMatch: 'full',
	},
	{
		path: 'statti',
		redirectTo: 'articles',
		pathMatch: 'full',
	},
	{
		path: 'podii',
		redirectTo: 'events',
		pathMatch: 'full',
	},
	{
		path: 'vakansii',
		redirectTo: 'jobs',
		pathMatch: 'full',
	},
	{
		path: 'careers',
		redirectTo: 'jobs',
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
