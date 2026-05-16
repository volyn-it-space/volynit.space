import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@wawjs/ngx-translate';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslateDirective, TranslatePipe],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
