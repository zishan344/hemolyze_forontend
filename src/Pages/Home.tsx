import { useEffect, useState } from "react";
import Hero from "../Component/Home/Hero";
import Benefit from "../Component/Home/Benefit";
import Statistics from "../Component/Home/Statistics";
import CTA from "../Component/Home/CTA";
import Testimonials from "../Component/Home/Testimonials";
import AvailableDonorsPreview from "../Component/Home/AvailableDonorsPreview";
import DonationModal from "../Component/Payment/DonationModal";
import {
  getActiveSpecialEvent,
  shouldShowDonationModal,
  dismissDonationModal,
  getEventDateRange,
  SpecialEvent,
} from "../Service/specialEventsService";

const Home = () => {
  const [showDonationModal, setShowDonationModal] = useState<boolean>(false);
  const [activeEvent, setActiveEvent] = useState<SpecialEvent | null>(null);

  useEffect(() => {
    // Check if there's an active special event and if we should show the modal
    if (shouldShowDonationModal()) {
      const event = getActiveSpecialEvent();
      if (event) {
        setActiveEvent(event);

        // Short delay before showing modal to avoid interrupting initial page load
        const timer = setTimeout(() => {
          setShowDonationModal(true);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Handle modal close
  const handleCloseModal = () => {
    setShowDonationModal(false);
    if (activeEvent) {
      dismissDonationModal(activeEvent.id);
    }
  };

  return (
    <>
      {/* Donation modal for special events */}
      {activeEvent && (
        <DonationModal
          isVisible={showDonationModal}
          onClose={handleCloseModal}
          title={activeEvent.modalTitle}
          description={activeEvent.modalDescription}
          specialEvent={{
            name: activeEvent.name,
            date: getEventDateRange(activeEvent),
            icon: activeEvent?.icon,
          }}
        />
      )}
      <Hero />
      <Statistics />
      <Benefit />
      <AvailableDonorsPreview />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
