export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  eventPicture?: string;
  category: any; // Will be expanded when Category interface is available
  startDate: Date;
  endDate: Date;
  ticketLimit: number;
  price: number;
  mode: string;
  organizers?: any[]; // Will be expanded when User interface is available
  sectionColor: string;
  textColor: string;
  isActive: boolean;
  hover?: boolean; // UI state
  backgroundColor?: string; // UI state
}
