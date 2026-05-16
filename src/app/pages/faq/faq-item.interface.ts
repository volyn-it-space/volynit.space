export type FaqAudience = 'public' | 'agent' | 'developer';

export interface FaqItem {
	readonly id: string;
	readonly audience: FaqAudience;
	readonly question: string;
	readonly answer: string[];
}
