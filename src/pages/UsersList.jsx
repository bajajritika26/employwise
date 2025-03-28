import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(res.data.data);
        setFilteredUsers(res.data.data);
        setTotalPages(res.data.total_pages);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, [page]);

  //  Search & Filter Logic
  useEffect(() => {
    let results = users;

    if (searchTerm) {
      results = results.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (emailFilter) {
      results = results.filter((user) =>
        user.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    setFilteredUsers(results);
  }, [searchTerm, emailFilter, users]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="px-12 py-4">
      <h1 className="text-2xl font-bold mb-4">USERS</h1>

      {/*  Search & Filter Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-1/2"
        />
        <input
          type="text"
          placeholder="Filter by email..."
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          className="border p-2 w-1/2"
        />
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <img
              className="w-16 h-16 rounded-full"
              src={user.avatar}
              alt={user.first_name}
            />
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>{user.email}</p>
            <button
              className="bg-blue-950 border border-blue-950 text-white px-2 py-1 mt-2 mr-4"
              onClick={() => navigate(`/edit/${user.id}`)}
            >
              Edit
            </button>
            <button
              className="bg-white text-blue-950 border border-blue-950 px-2 py-1 mt-2"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-300 px-4 py-2 mr-2"
        >
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-300 px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
