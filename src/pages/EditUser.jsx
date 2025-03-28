import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        setUser({
          first_name: res.data.data.first_name,
          last_name: res.data.data.last_name,
          email: res.data.data.email,
        });
      })
      .catch((err) => console.error("Error fetching user", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${id}`,
        user
      );

      setUser(response.data);

      alert("User updated successfully!");
      navigate("/users");
    } catch (err) {
      console.error("Error updating user", err);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="p-8 flex justify-center items-center h-[80vh] px-6 bg-gray-50">
      <form
        onSubmit={handleUpdate}
        className="mt-4 bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <input
          className="border p-2 w-full"
          type="text"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        <input
          className="border p-2 w-full mt-2"
          type="text"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        <input
          className="border p-2 w-full mt-2"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button className="bg-blue-950 text-white p-2 w-full mt-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
