import useBloodDataContext from "../../../Hooks/useBloodDataContext";
import Loadings from "../../../Shared/Loadings";
import ErrorAlert from "../../ErrorAlert";

const BloodRequestManagement = () => {
  const { requestHistory: requests, loading, error } = useBloodDataContext();
  if (loading) {
    return <Loadings />;
  }

  if (requests.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg font-semibold">No donation records found.</p>
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Blood Requests</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Requester</th>
              <th>Blood Group</th>
              <th>Units</th>
              <th>Hospital</th>
              <th>Date Needed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td>{index + 1}</td>
                <td>{request.name}</td>
                <td>{request.blood_group}</td>
                <td>{request.required_units}</td>
                <td>{request.hospital_name}</td>
                <td>{new Date(request.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      request.status === "pending"
                        ? "badge-warning"
                        : request.status === "accepted"
                        ? "badge-info"
                        : request.status === "completed"
                        ? "badge-success"
                        : "badge-error"
                    }`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-info">View</button>
                    <button className="btn btn-xs btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodRequestManagement;
