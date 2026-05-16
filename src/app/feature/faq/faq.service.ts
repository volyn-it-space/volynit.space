import { computed, inject, Injectable } from '@angular/core';
import faqData from '../../../data/faqs.json';
import faqTranslations from '../../../assets/data/faq.translations.json';
import { ArrayFeatureStore } from '../array-feature.store';
import { LanguageService } from '../language/language.service';
import { LanguageCode } from '../language/language.type';
import type { Faq } from './faq.interface';

interface FaqTranslationEntry {
	audience?: Partial<Record<LanguageCode, string>>;
	question?: Partial<Record<LanguageCode, string>>;
	answer?: Partial<Record<LanguageCode, string[]>>;
}

@Injectable({
	providedIn: 'root',
})
export class FaqService {
	private readonly _languageService = inject(LanguageService);
	private readonly _store = new ArrayFeatureStore<Faq>(faqData as Faq[]);
	private readonly _translations = faqTranslations as Record<string, FaqTranslationEntry>;

	readonly faqs = computed(() =>
		this._store
			.items()
			.map((item) => this._localizeFaq(item, this._languageService.language())),
	);
	readonly loading = this._store.loading;

	resolveFaqs(faqs: Faq[] | null | undefined) {
		this._store.resolve(faqs);
	}

	private _localizeFaq(item: Faq, language: LanguageCode): Faq {
		const translation = this._translations[item.id];

		if (!translation) {
			return item;
		}

		const localizedQuestion = translation.question?.[language]?.trim();
		const localizedAnswer = translation.answer?.[language]?.filter((paragraph) => paragraph.trim());

		return {
			...item,
			question: localizedQuestion || item.question,
			answer: localizedAnswer?.length ? localizedAnswer : item.answer,
		};
	}
}
