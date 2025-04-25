import { Filter, Map, Search, Syringe } from "lucide-react";
import { useEffect, useState } from "react";
import authApiClient from "../Service/authApiClient";
import { Donor } from "../Component/Donor/DonorType";
import { bloodGroups } from "../Global/GlobalVar";

// Define donor type based on what we can see in the codebase

const AvailableDonors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        // This endpoint is assumed based on your API structure
        const response = await authApiClient.get("/donar-list/");
        setDonors(response.data);
        setFilteredDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
        setError("Failed to load available donors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // For demo purposes, let's add some sample data if the API isn't available yet
  useEffect(() => {
    if (donors.length === 0 && !loading && !error) {
      const sampleDonors: Donor[] = [
        {
          id: 1,
          user: 1,
          name: "John Doe",
          blood_group: "A+",
          address: "123 Main St, City Hospital Area",
          phone_number: "123-456-7890",
          availability_status: true,
          age: 28,
          last_donation_date: "2025-03-01",
        },
        {
          id: 2,
          user: 2,
          name: "Jane Smith",
          blood_group: "O-",
          address: "456 Park Ave, Downtown",
          phone_number: "987-654-3210",
          availability_status: true,
          age: 35,
          last_donation_date: "2025-02-15",
        },
        {
          id: 3,
          user: 3,
          name: "Robert Johnson",
          blood_group: "B+",
          address: "789 Broadway, Westside",
          phone_number: "555-123-4567",
          availability_status: true,
          age: 42,
          last_donation_date: "2025-03-10",
        },
        {
          id: 4,
          user: 4,
          name: "Emily Davis",
          blood_group: "AB+",
          address: "321 Oak St, Eastside",
          phone_number: "555-987-6543",
          availability_status: true,
          age: 29,
          last_donation_date: "2025-03-05",
        },
        {
          id: 5,
          user: 5,
          name: "Michael Brown",
          blood_group: "A-",
          address: "654 Pine St, Northside",
          phone_number: "555-789-0123",
          availability_status: true,
          age: 33,
          last_donation_date: "2025-02-28",
        },
        {
          id: 6,
          user: 6,
          name: "Sarah Wilson",
          blood_group: "O+",
          address: "987 Elm St, Southside",
          phone_number: "555-456-7890",
          availability_status: true,
          age: 31,
          last_donation_date: "2025-03-12",
        },
      ];
      setDonors(sampleDonors);
      setFilteredDonors(sampleDonors);
    }
  }, [donors.length, loading, error]);

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
  }, [searchTerm, selectedBloodGroup, donors]);

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
      <div className="bg-base-100 shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search donors by name or location"
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full md:w-64">
            <div className="relative">
              <Syringe
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                className="select select-bordered w-full pl-10"
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}>
                <option value="">All Blood Types</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn btn-primary flex items-center gap-2">
            <Filter size={16} />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Donors List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
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
                  <button className="btn btn-primary btn-block">
                    Contact Donor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😢</div>
          <h3 className="text-xl font-bold mb-2">No donors found</h3>
          <p className="text-base-content/70">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredDonors.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn btn-active">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-primary/10 rounded-lg p-8 mt-12 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Are You a Blood Donor?
        </h2>
        <p className="mb-6 text-base-content/80 max-w-2xl mx-auto">
          Join our community of lifesavers by registering as a blood donor
          today. Your donation can save up to three lives!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="btn btn-primary">Register as Donor</button>
          <button className="btn btn-outline">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default AvailableDonors;
