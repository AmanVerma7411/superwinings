import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Header from "./compnents/Header";
import Homepagecon from "./compnents/Homepagecon";
import Features from "./compnents/Features";
import Footer from "./compnents/Footer";
import RegisterForm from "./compnents/RegisterForm";
import LoginForm from "./compnents/LoginForm";
import Dashboard from "./compnents/Dashboard";
import Trialplaypage from "./compnents/Trialplaypage";
import Planpage from "./compnents/Planpage";
import Support from "./compnents/Support";
import About from "./compnents/About";
import PrivacyPolicy from "./compnents/PrivacyPolicy";

import AdminLayout from "./compnents/admin/AdminLayout";
import DashboardPage from "./compnents/admin/DashboardPage";
import AddQuizPage from "./compnents/admin/AddQuizPage";
import QuizListPage from "./compnents/admin/QuizListPage";

import LoginModal from "./compnents/LoginModal";
import { LoginProvider, LoginContext } from "./compnents/LoginContext";
import { useContext } from "react";

// ✅ Layout for normal pages
function RootLayout({ children, showFeatures = false }) {
  const { showLogin, setShowLogin } = useContext(LoginContext);

  return (
    <>
      <Header />
      {children}
      {showFeatures && <Features />}
      <Footer />

      {/* Global login modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          setIsLoggedIn={() => {}}
        />
      )}
    </>
  );
}

function AppWrapper() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout showFeatures={true}>
          <Homepagecon />
        </RootLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <RootLayout showFeatures={true}>
          <Homepagecon />
          <RegisterForm />
        </RootLayout>
      ),
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
      element: (
        <RootLayout>
          <Planpage />
        </RootLayout>
      ),
    },
    {
      path: "/support",
      element: (
        <RootLayout>
          <Support />
        </RootLayout>
      ),
    },
    {
      path: "/about",
      element: (
        <RootLayout>
          <About />
        </RootLayout>
      ),
    },
    {
      path: "/privacypolicy",
      element: (
        <RootLayout>
          <PrivacyPolicy />
        </RootLayout>
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

  return <RouterProvider router={router} />;
}

// ✅ Wrap everything with LoginProvider
function App() {
  return (
    <LoginProvider>
      <AppWrapper />
    </LoginProvider>
  );
}

export default App;
