import { Filter, Search, Syringe } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedBloodGroup: string;
  setSelectedBloodGroup: React.Dispatch<React.SetStateAction<string>>;
  bloodGroups: string[];
}

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedBloodGroup,
  setSelectedBloodGroup,
  bloodGroups,
}: SearchFilterProps) => {
  return (
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
  );
};

export default SearchFilter;
