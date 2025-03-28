import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert, TextField, Button } from "@mui/material";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        setUser({
          first_name: res?.data?.data?.first_name,
          last_name: res?.data?.data?.last_name,
          email: res?.data?.data?.email,
        });
      })
      .catch(() => setSnackbar({ open: true, message: "Error fetching user", severity: "error" }));
  }, [id]);

  const validate = () => {
    let newErrors = {};
    if (!user?.first_name.trim()) newErrors.first_name = "First name is required";
    if (!user?.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!user?.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      setSnackbar({ open: true, message: "User updated successfully!", severity: "success" });
      setTimeout(() => navigate("/users"), 1500);
    } catch {
      setSnackbar({ open: true, message: "Failed to update user.", severity: "error" });
    }
  };

  return (
    <div className="p-8 flex justify-center items-center h-[80vh] px-6 bg-gray-50">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        
        <TextField
          fullWidth label="First Name"
          value={user?.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          error={!!errors?.first_name} helperText={errors?.first_name}
        />
        
        <TextField
          fullWidth label="Last Name" className="mt-4"
          value={user?.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          error={!!errors?.last_name} helperText={errors?.last_name}
        />
        
        <TextField
          fullWidth label="Email" className="mt-4"
          value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
          error={!!errors?.email} helperText={errors?.email}
        />

        <button variant="contained"  type="submit" fullWidth className="bg-blue-950 text-white p-2 w-full mt-4">
          Update
        </button>
      </form>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditUser;
