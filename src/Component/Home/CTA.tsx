import { Calendar } from "lucide-react";

const CTA = () => {
  return (
    <div>
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8">
            Scheduling your blood donation is quick and easy. Join thousands of
            donors who are saving lives every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn btn-lg bg-white text-primary hover:bg-gray-200">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Donation
            </button>
            <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;
