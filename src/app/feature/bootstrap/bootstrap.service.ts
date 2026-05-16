import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, TransferState } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ArticleService } from '../article/article.service';
import { CompanyService } from '../company/company.service';
import { EventService } from '../event/event.service';
import { ExhibitService } from '../exhibit/exhibit.service';
import { FaqService } from '../faq/faq.service';
import { JobService } from '../job/job.service';
import { MerchService } from '../merch/merch.service';
import { ProfileService } from '../profile/profile.service';
import { ProjectService } from '../project/project.service';
import { ReviewService } from '../review/review.service';
import { DiscountService } from '../discount/discount.service';
import { BOOTSTRAP_STATE_KEY } from './bootstrap.const';
import type { BootstrapData } from './bootstrap.interface';

@Injectable({
	providedIn: 'root',
})
export class BootstrapService {
	private _platformId = inject(PLATFORM_ID);
	private _transferState = inject(TransferState);
	private _companyService = inject(CompanyService);
	private _projectService = inject(ProjectService);
	private _profileService = inject(ProfileService);
	private _merchService = inject(MerchService);
	private _discountService = inject(DiscountService);
	private _faqService = inject(FaqService);
	private _jobService = inject(JobService);
	private _eventService = inject(EventService);
	private _exhibitService = inject(ExhibitService);
	private _articleService = inject(ArticleService);
	private _reviewService = inject(ReviewService);

	async initialize() {
		const transferData = this._transferState.get<BootstrapData | null>(
			BOOTSTRAP_STATE_KEY,
			null,
		);

		if (transferData) {
			this._apply(transferData);

			if (isPlatformBrowser(this._platformId)) {
				this._transferState.remove(BOOTSTRAP_STATE_KEY);
				void this._refreshInBrowser();
			}

			return;
		}

		if (isPlatformServer(this._platformId)) {
			const data = await this._load();

			if (data) {
				this._transferState.set(BOOTSTRAP_STATE_KEY, data);
			}

			this._apply(data);

			return;
		}

		void this._refreshInBrowser();
	}

	private _apply(data: BootstrapData | null) {
		if (data?.company) {
			this._companyService.setCompany(data.company);
		}

		this._projectService.resolveProjects(data?.projects);
		this._profileService.resolveProfiles(data?.profiles);
		this._merchService.resolveProducts(data?.products);
		this._discountService.resolveDiscounts(data?.discounts ?? data?.sales);
		this._faqService.resolveFaqs(data?.faqs);
		this._jobService.resolveJobs(data?.jobs);
		this._eventService.resolveEvents(data?.events);
		this._exhibitService.resolveExhibits(data?.exhibits);
		this._articleService.resolveArticles(data?.articles);
		this._reviewService.resolveReviews(data?.reviews);
	}

	private async _refreshInBrowser() {
		const data = await this._load();

		this._apply(data);
	}

	private async _load() {
		try {
			const response = await fetch(
				`${environment.apiUrl}/api/bootstrap/${environment.companyId}`,
			);

			if (!response.ok) {
				return null;
			}

			return (await response.json()) as BootstrapData;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
