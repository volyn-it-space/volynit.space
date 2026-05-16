export type FaqAudience = 'public' | 'agent' | 'developer';

export interface Faq {
	id: string;
	audience: FaqAudience;
	question: string;
	answer: string[];
}
