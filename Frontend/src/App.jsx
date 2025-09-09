import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Header from './compnents/Header';
import Homepagecon from './compnents/Homepagecon';
import Features from './compnents/Features';
import Footer from './compnents/Footer';
import RegisterForm from './compnents/RegisterForm';
import LoginForm from './compnents/LoginForm';
import Dashboard from './compnents/Dashboard';
import Trialplaypage from './compnents/Trialplaypage';
import Planpage from './compnents/Planpage';
import Support from "./compnents/Support";
import About from "./compnents/About";
import PrivacyPolicy from "./compnents/PrivacyPolicy";


import AdminLayout from "./compnents/admin/AdminLayout";
import DashboardPage from "./compnents/admin/DashboardPage";
import AddQuizPage from "./compnents/admin/AddQuizPage";
import QuizListPage from "./compnents/admin/QuizListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Homepagecon />
        <Features />
        <Footer />
      </>
    ),
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/trialplaypage",
    element: <Trialplaypage />,
  },
  {
    path: "/plans",
    element: <>
    <Header/>
    <Planpage />
    </>,
  },
  {
    path: "/support",
    element: (
      <>
        <Header />
        <Support />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Header />
        <About />
        <Footer />
      </>
    ),
  },
  {
    path: "/privacypolicy",
    element: (
      <>
        <Header />
        <PrivacyPolicy />
        <Footer />
      </>
    ),
  },


  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> }, 
      { path: "dashboard", element: <DashboardPage /> },
      { path: "add-quiz", element: <AddQuizPage /> },
      { path: "quizzes", element: <QuizListPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
