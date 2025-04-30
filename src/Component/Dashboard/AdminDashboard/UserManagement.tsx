import { userDataType } from "../../../globalType/AuthType";
import { useEffect, useState } from "react";
import authApiClient from "../../../Service/authApiClient";
import Loadings from "../../../Shared/Loadings";

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState<userDataType[]>([]);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [loading, setUpdateLoading] = useState<boolean>(false);
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

  if (userLoading) {
    return <Loadings />;
  }

  if (allUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-xl font-semibold">No Users Found</h2>
      </div>
    );
  }

  const handleAdmin = async (userId: number, role: string) => {
    setUpdateLoading(true);
    try {
      const response = await authApiClient.patch(`user-role/${userId}/`, {
        role,
      });
      console.log(response);
      setAllUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, role } : user))
      );
    } catch (error) {
      console.log("handleAdmin error", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
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
                    {user.role === "admin" ? (
                      <button
                        disabled={loading}
                        onClick={() => handleAdmin(user.id, "user")}
                        className="btn btn-xs btn-error">
                        remove admin
                      </button>
                    ) : (
                      <button
                        disabled={loading}
                        onClick={() => handleAdmin(user.id, "admin")}
                        className="btn btn-xs btn-info">
                        make admin
                      </button>
                    )}
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
