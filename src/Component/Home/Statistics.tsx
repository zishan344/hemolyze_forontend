const Statistics = () => {
  return (
    <section
      id="statistics"
      className="py-16 px-4 md:px-8 lg:px-16 bg-base-200">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Blood Donation by Numbers
        </h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          The impact of blood donation is immense. Here are some key statistics
          that highlight its importance.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 shadow w-full">
        <div className="stat place-items-center">
          <div className="stat-title">Daily Need</div>
          <div className="stat-value text-primary">36,000</div>
          <div className="stat-desc">Units needed daily in the US</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Lives Saved</div>
          <div className="stat-value text-primary">4.5M</div>
          <div className="stat-desc">People helped annually</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Donation Time</div>
          <div className="stat-value text-primary">15</div>
          <div className="stat-desc">Minutes to donate</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Blood Shelf Life</div>
          <div className="stat-value text-primary">42</div>
          <div className="stat-desc">Days for red blood cells</div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
