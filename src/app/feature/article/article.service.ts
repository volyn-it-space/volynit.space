import { Injectable } from '@angular/core';
import articlesData from '../../../data/articles.json';
import { ArrayFeatureStore } from '../array-feature.store';
import type { Article } from './article.interface';

@Injectable({
	providedIn: 'root',
})
export class ArticleService {
	private readonly _store = new ArrayFeatureStore<Article>(articlesData as Article[]);

	readonly articles = this._store.items;
	readonly loading = this._store.loading;

	resolveArticles(articles: Article[] | null | undefined) {
		this._store.resolve(articles);
	}
}
