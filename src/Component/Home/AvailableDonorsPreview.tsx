import { ArrowUpRight, Map, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBloodDataContext from "../../Hooks/useBloodDataContext";
import { UserDetailsDataType } from "../../globalType/AuthType";
import handleContactDonor from "../../utils/availableDonors.utils";

const AvailableDonorsPreview = () => {
  const { fetchDonors, donors, loading, error } = useBloodDataContext();

  // State for featured donors (showing only a limited number)
  const [featuredDonors, setFeaturedDonors] = useState<UserDetailsDataType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetchDonors();
    };
    fetchData();
  }, []);

  // Update featured donors when donors list changes
  useEffect(() => {
    if (donors && donors.length > 0) {
      // Take up to 6 donors to display in the preview section
      setFeaturedDonors(donors.slice(0, 6));
    }
  }, [donors]);

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Available Blood Donors
            </h2>
            <p className="text-base-content/70 max-w-2xl">
              Find blood donors who are currently available for donation in your
              area. Our platform connects recipients with willing donors to save
              lives.
            </p>
          </div>
          <Link
            to="/available-donors"
            className="btn btn-primary mt-4 md:mt-0 flex items-center">
            View All Donors
            <ArrowUpRight size={16} className="ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        ) : featuredDonors.length === 0 ? (
          <div className="text-center py-12 bg-base-100 rounded-lg">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-xl font-bold mb-2">No donors available</h3>
            <p className="text-base-content/70">
              There are currently no blood donors available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDonors.map((donor) => (
              <div
                key={donor.id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg">{donor.name}</h2>
                    <div className="badge badge-primary text-white font-bold">
                      {donor.blood_group}
                    </div>
                  </div>

                  <div className="my-2">
                    <div className="flex items-center text-sm mb-2">
                      <Map size={16} className="mr-2 text-gray-400" />
                      <span className="text-base-content/70">
                        {donor.address}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="badge badge-outline badge-success">
                        Available
                      </div>
                      {donor.last_donation_date && (
                        <span className="ml-2 text-xs text-base-content/60">
                          Last donation:{" "}
                          {new Date(
                            donor.last_donation_date
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleContactDonor(donor)}
                      className="btn btn-sm btn-outline btn-primary">
                      <Phone size={16} className=" mr-2" /> contact donor
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableDonorsPreview;
