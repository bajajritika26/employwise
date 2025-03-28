import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Snackbar, Alert } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate("/login");
    }, 1500); // Redirect after showing the Snackbar
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#172554", padding: "10px 15px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: "white", textDecoration: "none", fontStyle: "italic" }}
          >
            EmployWise
          </Typography>

          {token && (
            <Box>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Snackbar for Logout Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Logged out successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
