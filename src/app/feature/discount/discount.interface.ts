export interface Discount {
	id: string;
	title: string;
	description: string;
	label?: string;
	terms?: string;
	startsAt?: string;
	endsAt?: string;
	href?: string;
}
