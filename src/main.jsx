import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import MainLayout from "./components/MainLoyout.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Courses from "./components/Courses/Courses.jsx";
import CourseDetails from "./components/Courses/CourseDetails.jsx";
import Settings from "./components/Settings/settings.jsx";
import CourseWizard from "./components/Administrator/CourseWizard.jsx";
import AccountTable from "./components/Administrator/AccountTable.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <MainLayout>
              <Courses />
            </MainLayout>
          }
        />
        <Route
          path="/courseDetails/:id"
          element={
            <MainLayout>
              <CourseDetails />
            </MainLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <MainLayout>
              <CourseWizard />
            </MainLayout>
          }
        />
        <Route
          path="/accountTable"
          element={
            <MainLayout>
              <AccountTable />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
