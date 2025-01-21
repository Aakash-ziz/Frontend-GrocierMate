import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";

function Index() {
  return (
    <Router>
      <Routes>
        {/* Define the route for the Login component */}
        <Route path="/login" element={<Login />} />

        {/* Define the route for the Register component */}
        <Route path="/register" element={<Register />} />

        {/* Private route for dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Redirect to Login by default */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Index;
