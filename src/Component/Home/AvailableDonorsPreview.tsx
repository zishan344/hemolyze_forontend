import { ArrowUpRight, Map } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Sample donor type for the preview
type Donor = {
  id: number;
  name: string;
  blood_group: string;
  address: string;
  availability_status: boolean;
  last_donation_date?: string;
};

const AvailableDonorsPreview = () => {
  const [featuredDonors, setFeaturedDonors] = useState<Donor[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For demo purposes, using static data
    const sampleDonors: Donor[] = [
      {
        id: 1,
        name: "John Doe",
        blood_group: "A+",
        address: "123 Main St, City Hospital Area",
        availability_status: true,
        last_donation_date: "2025-03-01",
      },
      {
        id: 2,
        name: "Jane Smith",
        blood_group: "O-",
        address: "456 Park Ave, Downtown",
        availability_status: true,
        last_donation_date: "2025-02-15",
      },
      {
        id: 3,
        name: "Robert Johnson",
        blood_group: "B+",
        address: "789 Broadway, Westside",
        availability_status: true,
        last_donation_date: "2025-03-10",
      },
    ];
    setFeaturedDonors(sampleDonors);
  }, []);

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
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/available-donors#donor-${donor.id}`}
                    className="btn btn-sm btn-outline btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableDonorsPreview;
