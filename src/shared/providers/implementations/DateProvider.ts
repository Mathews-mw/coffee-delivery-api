import { addDays, addHours, isBefore } from 'date-fns';

import { IDateProvider } from '../IDateProvider';

class DateProvider implements IDateProvider {
	addDays(days: number): Date {
		return addDays(new Date(), days);
	}

	addHours(hours: number): Date {
		return addHours(new Date(), hours);
	}

	compareIfBefore(start_date: Date, end_date: Date): boolean {
		return isBefore(new Date(start_date), new Date(end_date));
	}
}

export { DateProvider };
