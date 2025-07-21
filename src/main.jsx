import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
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
import AssignedCourses from "./components/Child/AssignedCourses.jsx";
import AssignedCourseDetails from "./components/Child/AssignedCourseDetails.jsx";
import QuizCreator from "./components/Administrator/QuizCreator";
import { store, persistor } from "./store";
import PrivateRoute from "./ProvateRoute";
import CodeQuizAll from "./components/Quizes/CodeQuizAll";
import CodeQuiz from "./components/Quizes/CodeQuiz";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Router>
          <Routes>
            {/* Otvorene (public) rute */}
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Zaštićene (private) rute */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Courses />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/courseDetails/:id"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <CourseDetails />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/createCourse"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <CourseWizard />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/accountTable"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AccountTable />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/assignedCourses"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AssignedCourses />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/assignedCourseDetails/:id"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AssignedCourseDetails />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/codeQuiz"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <CodeQuizAll />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/codeQuiz/:id"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <CodeQuiz />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/createQuiz"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <QuizCreator />
                  </MainLayout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
