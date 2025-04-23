import { Award, Clock, Heart, Users } from "lucide-react";

const Benefit = () => {
  return (
    <section id="benefits" className="py-16 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Why Donate Blood?</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Blood donation is not just an act of charity; it's a vital
          contribution to healthcare and community wellbeing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <Heart className="h-16 w-16 text-primary" />
          </figure>
          <div className="card-body items-center text-center">
            <h3 className="card-title">Save Lives</h3>
            <p>
              A single donation can save up to three lives, helping those in
              emergency situations.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <Users className="h-16 w-16 text-primary" />
          </figure>
          <div className="card-body items-center text-center">
            <h3 className="card-title">Build Community</h3>
            <p>
              Join a network of donors making a difference in your local
              community.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <Clock className="h-16 w-16 text-primary" />
          </figure>
          <div className="card-body items-center text-center">
            <h3 className="card-title">Quick Process</h3>
            <p>
              The donation process takes only about 10-15 minutes of your time.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <Award className="h-16 w-16 text-primary" />
          </figure>
          <div className="card-body items-center text-center">
            <h3 className="card-title">Health Benefits</h3>
            <p>
              Regular donors receive free health check-ups and can reduce the
              risk of certain health issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
