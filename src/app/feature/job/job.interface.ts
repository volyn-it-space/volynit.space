export interface Job {
	id: string;
	title: string;
	summary: string;
	description: string;
	location?: string;
	employmentType?: string;
	requirements?: string[];
	responsibilities?: string[];
	href?: string;
}
