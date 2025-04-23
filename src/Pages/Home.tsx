import Benefit from "../Component/Home/Benefit";
import CTA from "../Component/Home/CTA";
import Hero from "../Component/Home/Hero";
import Statistics from "../Component/Home/Statistics";
import Testimonials from "../Component/Home/Testimonials";

export default function Home() {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}

      <Hero />

      {/* Benefits Section */}

      <Benefit />

      {/* Statistics Section */}

      <Statistics />

      {/* Testimonials Section */}
      <Testimonials />
      {/* CTA Section */}
      <CTA />
    </div>
  );
}
