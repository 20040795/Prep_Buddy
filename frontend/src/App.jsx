import { Routes, Route } from "react-router-dom";

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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:companySlug" element={<CompanyDetails />} />
      <Route path="/coding" element={<CodingPractice />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/forum/ask" element={<AskQuestion />} />
      <Route path="/forum/:id" element={<ForumDiscussion />} />
      <Route path="/add-experience" element={<AddExperience />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/graduates" element={<GraduatePrograms />} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/questions" element={<AdminQuestions />} />
      <Route path="/admin/experiences" element={<AdminExperiences />} />
    </Routes>
  );
}
