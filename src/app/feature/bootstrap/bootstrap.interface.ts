import type { Article } from '../article/article.interface';
import type { Company } from '../company/company.interface';
import type { Event } from '../event/event.interface';
import type { Exhibit } from '../exhibit/exhibit.interface';
import type { Faq } from '../faq/faq.interface';
import type { Job } from '../job/job.interface';
import type { Product } from '../merch/merch.interface';
import type { Profile } from '../profile/profile.interface';
import type { Project } from '../project/project.interface';
import type { Review } from '../review/review.interface';
import type { Discount } from '../discount/discount.interface';

export interface BootstrapData {
	company?: Company;
	projects?: Project[];
	profiles?: Profile[];
	products?: Product[];
	discounts?: Discount[];
	sales?: Discount[];
	faqs?: Faq[];
	jobs?: Job[];
	events?: Event[];
	exhibits?: Exhibit[];
	articles?: Article[];
	reviews?: Review[];
}
