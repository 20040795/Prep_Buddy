import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminQuestions from "./pages/admin/AdminQuestions";
import AdminExperiences from "./pages/admin/AdminExperiences";

import Navbar from "./components/Navbar";

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
  const isLogged = !!localStorage.getItem("token");

  const isAdmin =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user")).role === "admin";

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {isLogged && <Navbar />}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

         
          <Route 
            path="/dashboard" 
            element={isLogged ? <Dashboard /> : <Login />} 
          />
          <Route 
            path="/companies" 
            element={isLogged ? <Companies /> : <Login />} 
          />
          <Route 
            path="/companies/:companySlug" 
            element={isLogged ? <CompanyDetails /> : <Login />} 
          />
          <Route 
            path="/coding" 
            element={isLogged ? <CodingPractice /> : <Login />} 
          />
          <Route 
            path="/forum" 
            element={isLogged ? <Forum /> : <Login />} 
          />
          <Route 
            path="/forum/ask" 
            element={isLogged ? <AskQuestion /> : <Login />} 
          />
          <Route 
            path="/forum/:id" 
            element={isLogged ? <ForumDiscussion /> : <Login />} 
          />
          <Route 
            path="/add-experience" 
            element={isLogged ? <AddExperience /> : <Login />} 
          />
          <Route 
            path="/profile" 
            element={isLogged ? <Profile /> : <Login />} 
          />
          <Route 
            path="/graduates" 
            element={isLogged ? <GraduatePrograms /> : <Login />} 
          />

         
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={isAdmin ? <AdminDashboard /> : <AdminLogin />}
          />
          <Route
            path="/admin/users"
            element={isAdmin ? <AdminUsers /> : <AdminLogin />}
          />
          <Route
            path="/admin/questions"
            element={isAdmin ? <AdminQuestions /> : <AdminLogin />}
          />
          <Route
            path="/admin/experiences"
            element={isAdmin ? <AdminExperiences /> : <AdminLogin />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
