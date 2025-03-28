import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(res?.data?.data);
        setFilteredUsers(res?.data?.data);
        setTotalPages(res?.data?.total_pages);
      } catch (error) {
        setSnackbar({ open: true, message: "Error fetching users!", severity: "error" });
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, [page]);

  useEffect(() => {
    let results = users;
    if (searchTerm) {
      results = results.filter(
        (user) =>
          user?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setSnackbar({ open: true, message: "User deleted successfully!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Error deleting user!", severity: "error" });
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="lg:px-12 py-3 px-6 mt-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">USERS</h1>

        <div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredUsers.map((user) => (
          <div key={user?.id} className="border p-4 rounded shadow">
            <img
              className="w-16 h-16 rounded-full"
              src={user?.avatar}
              alt={user?.first_name}
            />
            <h3 className="mt-1 font-semibold">
              {user?.first_name} {user?.last_name}
            </h3>
            <p>{user?.email}</p>
            <button
              className="bg-blue-950 border border-blue-950 text-white px-2 py-1 mt-2 mr-4"
              onClick={() => navigate(`/edit/${user?.id}`)}
            >
              Edit
            </button>
            <button
              className="bg-white text-blue-950 border border-blue-950 px-2 py-1 mt-2"
              onClick={() => handleDelete(user?.id, `${user?.first_name} ${user?.last_name}`)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-300 px-4 py-2"
        >
          Prev
        </button>
        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-300 px-4 py-2"
        >
          Next
        </button>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UsersList;
