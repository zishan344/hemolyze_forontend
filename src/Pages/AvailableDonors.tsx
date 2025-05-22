import { Map, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { bloodGroups } from "../Global/GlobalVar";
import useBloodDataContext from "../Hooks/useBloodDataContext";
import SearchFilter from "../Component/Dashboard/AvailableDonors/SearchFilter";
import CtaSection from "../Component/Dashboard/AvailableDonors/CtaSection";
import Loadings from "../Shared/Loadings";
import useAuth from "../Hooks/useAuth";
import handleContactDonor from "../utils/availableDonors.utils";

const AvailableDonors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
  const {
    fetchDonors,
    donors,
    setFilteredDonors,
    filteredDonors,
    error,
    loading,
  } = useBloodDataContext();

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      await fetchDonors();
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter donors based on search term and selected blood group
    const filtered = donors.filter((donor) => {
      const matchesSearch =
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBloodGroup =
        selectedBloodGroup === "" || donor.blood_group === selectedBloodGroup;

      return matchesSearch && matchesBloodGroup;
    });

    setFilteredDonors(filtered);
  }, [searchTerm, selectedBloodGroup, donors, setFilteredDonors]);
  console.log(filteredDonors);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Available Blood Donors
        </h1>
        <p className="text-base-content/70">
          Find blood donors who are currently available for donation in your
          area
        </p>
      </div>

      {/* Search and Filter Section */}
      <SearchFilter
        bloodGroups={bloodGroups}
        searchTerm={searchTerm}
        selectedBloodGroup={selectedBloodGroup}
        setSearchTerm={setSearchTerm}
        setSelectedBloodGroup={setSelectedBloodGroup}
      />

      {/* Donors List */}
      {loading ? (
        <Loadings />
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : filteredDonors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
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

                <div className="card-actions mt-4">
                  <button
                    onClick={() => handleContactDonor(donor)}
                    className="btn btn-primary btn-block">
                    <Phone size={16} className="mr-2 text-gray-200" /> Contact
                    Donor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-xl font-bold mb-2">No donors found</h3>
            <p className="text-base-content/70">
              Try adjusting your search or filters
            </p>
          </div>
          {/* Pagination */}
          {/*TODO!update in near future  */}

          {/* CTA Section */}

          {!user && <CtaSection />}
        </>
      )}
    </div>
  );
};

export default AvailableDonors;
