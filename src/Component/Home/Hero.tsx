import { ChevronRight } from "lucide-react";

import Image from "../Image";

const Hero = () => {
  return (
    <section className="hero min-h-[70vh] bg-base-200 relative">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Blood donation"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="hero-content text-center py-16 z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
            Every Drop Counts
          </h1>
          <p className="py-6 text-lg md:text-xl">
            Blood donation is a simple act that can save countless lives. At
            Hemolyze, we connect donors with those in need, creating a community
            of lifesavers. Your donation can help accident victims, surgical
            patients, and those battling chronic illnesses.
          </p>
          <button className="btn btn-primary btn-lg text-white">
            Schedule a Donation
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
