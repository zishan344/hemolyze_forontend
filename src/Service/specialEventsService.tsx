import React from "react";
import { Gift, Heart, Calendar, AlertTriangle } from "lucide-react";

// Define the icon type that can be properly passed as a prop
export type EventIconType = React.ReactElement;

export interface SpecialEvent {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  icon: EventIconType;
  modalTitle: string;
  modalDescription: string;
  isActive: boolean;
}

// List of special events/holidays for blood donation campaigns
export const specialEvents: SpecialEvent[] = [
  {
    id: "world-blood-donor-day",
    name: "World Blood Donor Day",
    startDate: new Date(new Date().getFullYear(), 5, 10), // June 10
    endDate: new Date(new Date().getFullYear(), 5, 15), // June 15
    description: "Celebrating blood donors around the world",
    icon: <Heart className="text-primary-content" size={18} />,
    modalTitle: "World Blood Donor Day Special",
    modalDescription:
      "Join us in celebrating World Blood Donor Day! Your donation now has double the impact as we work to increase blood supplies for summer emergencies.",
    isActive: true,
  },
  {
    id: "holiday-season",
    name: "Holiday Season",
    startDate: new Date(new Date().getFullYear(), 11, 20), // Dec 20
    endDate: new Date(new Date().getFullYear(), 11, 31), // Dec 31
    description: "Give the gift of life this holiday season",
    icon: <Gift className="text-primary-content" size={18} />,
    modalTitle: "Holiday Season Appeal",
    modalDescription:
      "Blood donations typically drop during the holidays, but accidents don't. Help us maintain critical blood supplies during this festive season.",
    isActive: true,
  },
  {
    id: "summer-shortage",
    name: "Summer Blood Drive",
    startDate: new Date(new Date().getFullYear(), 5, 1), // June 1 (month is 0-based)
    endDate: new Date(new Date().getFullYear(), 6, 15), // July 15 (month is 0-based)
    description: "Help prevent summer blood shortages",
    icon: <Calendar className="text-primary-content" size={18} />,
    modalTitle: "Critical Summer Blood Drive",
    modalDescription:
      "Summer vacations mean lower donations but higher demand. Your contribution helps ensure blood is available during this critical period.",
    isActive: true,
  },
  {
    id: "emergency-appeal",
    name: "Emergency Blood Appeal",
    startDate: new Date(new Date().getFullYear(), 2, 24), // March 24 (month is 0-based)
    endDate: new Date(new Date().getFullYear(), 2, 30), // March 30 (month is 0-based)
    description: "Urgent need for blood donors",
    icon: <AlertTriangle className="text-primary-content" size={18} />,
    modalTitle: "Urgent: Blood Supplies Low",
    modalDescription:
      "We're experiencing a critical shortage of all blood types. Your donation today can help save multiple lives during this emergency.",
    isActive: true,
  },
];

// Function to check if any special events are active based on current date
export const getActiveSpecialEvent = (): SpecialEvent | null => {
  const today = new Date();

  for (const event of specialEvents) {
    if (!event.isActive) continue;

    if (today >= event.startDate && today <= event.endDate) {
      return {
        ...event,
        startDate: event.startDate,
        endDate: event.endDate,
      };
    }
  }

  return null;
};

// Format date as Month Day
export const formatEventDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Get formatted date range for display
export const getEventDateRange = (event: SpecialEvent): string => {
  const startFormatted = formatEventDate(event.startDate);
  const endFormatted = formatEventDate(event.endDate);

  return `${startFormatted} - ${endFormatted}`;
};

// Determine if we should show the modal based on user preferences
export const shouldShowDonationModal = (): boolean => {
  const activeEvent = getActiveSpecialEvent();
  if (!activeEvent) return false;

  // Check if user has dismissed this specific event
  const dismissedEvents = localStorage.getItem("dismissedDonationEvents");
  if (dismissedEvents) {
    const dismissed = JSON.parse(dismissedEvents);
    if (dismissed[activeEvent.id]) {
      const dismissedTime = new Date(dismissed[activeEvent.id]);
      // If dismissed within the last 24 hours, don't show
      if (
        new Date().getTime() - dismissedTime.getTime() <
        24 * 60 * 60 * 1000
      ) {
        return false;
      }
    }
  }

  return true;
};

// Save when a user dismisses the modal
export const dismissDonationModal = (eventId: string): void => {
  let dismissed: Record<string, string> = {};
  const savedDismissed = localStorage.getItem("dismissedDonationEvents");

  if (savedDismissed) {
    dismissed = JSON.parse(savedDismissed);
  }

  dismissed[eventId] = new Date().toISOString();
  localStorage.setItem("dismissedDonationEvents", JSON.stringify(dismissed));
};
