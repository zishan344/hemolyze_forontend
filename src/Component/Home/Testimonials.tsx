import Image from "../Image";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Hear from donors and recipients about the impact of blood donation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Avatar"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold">Sarah Johnson</h3>
                <p className="text-sm">Blood Recipient</p>
              </div>
            </div>
            <p>
              "After my accident, I needed multiple blood transfusions. I'm
              alive today because strangers took the time to donate. I can't
              thank blood donors enough for their selfless act."
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Avatar"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold">Michael Chen</h3>
                <p className="text-sm">Regular Donor</p>
              </div>
            </div>
            <p>
              "I've been donating blood every 3 months for the past 5 years.
              It's a small commitment that I know makes a big difference. The
              staff at Hemolyze make the process easy and comfortable."
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Avatar"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold">Dr. Emily Rodriguez</h3>
                <p className="text-sm">Emergency Physician</p>
              </div>
            </div>
            <p>
              "In the ER, we rely on blood donations daily. Having a stable
              supply of blood products is crucial for saving lives in critical
              situations. Every donor is a hero in our eyes."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
