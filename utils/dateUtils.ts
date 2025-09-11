// Simple date formatting to YYYY-MM-DD for use as a key
export const formatDateForId = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Formats date for display, e.g., "Saturday, Oct 28"
export const formatDateForDisplay = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
    const date = new Date(dateString.replace(/-/g, '/')); // More reliable parsing
    const defaultOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options || defaultOptions);
};

// Gets the date for the upcoming Saturday
export const getNextSaturday = (fromDate: Date = new Date()): Date => {
    const date = new Date(fromDate);
    const day = date.getDay();
    const diff = day <= 6 ? 6 - day : 6;
    date.setDate(date.getDate() + diff);
    return date;
};

// Gets an array of Date objects for the week starting from a given date
export const getWeekDates = (startDate: Date): Date[] => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        dates.push(newDate);
    }
    return dates;
};

export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};