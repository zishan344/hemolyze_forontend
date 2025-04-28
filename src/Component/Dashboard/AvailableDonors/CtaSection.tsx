const CtaSection = () => {
  return (
    <div className="bg-primary/10 rounded-lg p-8 mt-12 text-center">
      <h2 className="text-2xl font-bold text-primary mb-2">
        Are You a Blood Donor?
      </h2>
      <p className="mb-6 text-base-content/80 max-w-2xl mx-auto">
        Join our community of lifesavers by registering as a blood donor today.
        Your donation can save up to three lives!
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="btn btn-primary">Register as Donor</button>
        <button className="btn btn-outline">Learn More</button>
      </div>
    </div>
  );
};

export default CtaSection;
