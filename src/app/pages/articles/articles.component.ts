import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { ArticleService } from '../../feature/article/article.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './articles.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
	private readonly _articleService = inject(ArticleService);

	protected readonly articles = this._articleService.articles;
	protected readonly loading = this._articleService.loading;
}
