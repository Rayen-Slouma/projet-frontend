export interface Event {
    title: string;
    description: string;
    coverPhoto: string; // Path to the uploaded cover photo
    organizingTeam: string[];
    startDate: Date;
    endDate: Date;
    location: string;
  }
  