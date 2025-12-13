import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import CodingPractice from "./pages/CodingPractice";
import Forum from "./pages/Forum";
import AskQuestion from "./pages/AskQuestion";
import ForumDiscussion from "./pages/ForumDiscussion";
import AddExperience from "./pages/AddExperience";
import Profile from "./pages/Profile";
import GraduatePrograms from "./pages/GraduatePrograms";
import GraduateAPI from "./pages/GraduateAPI";


import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminQuestions from "./pages/admin/AdminQuestions";
import AdminExperiences from "./pages/admin/AdminExperiences";
import AdminForum from "./pages/admin/AdminForum";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0098DC" },
    secondary: { main: "#0088C6" },
    background: {
      default: "#0A0F1A",
      paper: "#112034",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfd8e5",
    },
  },
  shape: { borderRadius: 10 },
});

export default function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "admin";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {token && !isAdmin && <Navbar />}

      <Routes>
        {/* user routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companySlug" element={<CompanyDetails />} />

        <Route path="/coding" element={<CodingPractice />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/ask" element={<AskQuestion />} />
        <Route path="/forum/:id" element={<ForumDiscussion />} />
        <Route path="/add-experience" element={<AddExperience />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/graduates" element={<GraduatePrograms />} />

       {/* admin routes */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin" />}
        />

        <Route
          path="/admin/users"
          element={isAdmin ? <AdminUsers /> : <Navigate to="/admin" />}
        />

        <Route
          path="/admin/questions"
          element={isAdmin ? <AdminQuestions /> : <Navigate to="/admin" />}
        />

        <Route
          path="/admin/experiences"
          element={isAdmin ? <AdminExperiences /> : <Navigate to="/admin" />}
        />

        <Route
          path="/admin/forum"
          element={isAdmin ? <AdminForum /> : <Navigate to="/admin" />}
        />
        <Route path="/live-graduates" element={<GraduateAPI />} />

      </Routes>
    </ThemeProvider>
  );
}
