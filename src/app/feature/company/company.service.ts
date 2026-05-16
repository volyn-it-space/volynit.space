import { Injectable, signal } from '@angular/core';
import { companyProfile, normalizeCompanyProfile } from './company.data';
import type { CompanyProfile } from './company.interface';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	readonly company = signal<CompanyProfile>(companyProfile);

	setCompany(company: Partial<CompanyProfile> | null | undefined) {
		if (!company) {
			return;
		}

		this.company.set(normalizeCompanyProfile(company));
	}
}
