import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';
import { ReviewService } from '../../feature/review/review.service';

@Component({
	imports: [TranslateDirective, TranslatePipe],
	templateUrl: './reviews.component.html',
	styleUrl: './reviews.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
	private readonly _reviewService = inject(ReviewService);

	protected readonly reviews = this._reviewService.reviews;
	protected readonly loading = this._reviewService.loading;
}
