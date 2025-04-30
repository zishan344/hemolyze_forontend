import { Users } from "lucide-react";
import { userDataType } from "../../../globalType/AuthType";
import { useEffect, useState } from "react";
import authApiClient from "../../../Service/authApiClient";
import Loadings from "../../../Shared/Loadings";

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState<userDataType[]>([]);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchAllUsers = async () => {
      setUserLoading(true);
      try {
        const response = await authApiClient.get("/auth/users");
        setAllUsers(response.data);
      } catch (error) {
        console.log("fetchAllUsers error", error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  if (userLoading) return <Loadings />;
  if (allUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-xl font-semibold">No Users Found</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <button className="btn btn-primary btn-sm">
          <Users size={16} className="mr-2" />
          Add New User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-info">make admin</button>
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
export default UserManagement;
