import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthLayoutPage from "./pages/AuthLayout";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import ChooseUserModePage from "./pages/ChooseUserMode";
import store from "./store/store";
import { lazy, Suspense } from "react";
import ProfilePage from "./pages/Profile";
import TicketsPage from "./pages/Tickets";
import OffersPage from "./pages/Offers";
import WalletPage from "./pages/Wallet";
import MainLayout from "./pages/MainLayout";
import HomePage from "./pages/Home";
import Spinner from "./Components/UI/Spinner";
import UserLayoutPage from "./pages/UserLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { appRoutes } from "./utils/config";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
const SingleEventPage = lazy(() => import("./pages/SingleEvent"));
const AdminPage = lazy(() => import("./pages/Admin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: appRoutes.chooseMode, element: <ChooseUserModePage /> },
          {
            path: "event/:eventId",
            element: (
              <Suspense fallback={<Spinner style={{ margin: "5rem" }} />}>
                <SingleEventPage />
              </Suspense>
            ),
          },
          {
            path: "admin-page",
            element: (
              <Suspense fallback={<Spinner style={{ margin: "5rem" }} />}>
                <AdminPage />
              </Suspense>
            ),
          },
          {
            path: "profile/:userId",
            element: <UserLayoutPage />,
            children: [
              { path: "", element: <Navigate to="profile" /> },
              { path: "profile", element: <ProfilePage /> },
              { path: "tickets", element: <TicketsPage /> },
              { path: "offers", element: <OffersPage /> },
              { path: "wallet", element: <span>Wallet</span> },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayoutPage />,
        children: [
          { index: true, element: <LoginPage /> },
          { path: appRoutes.auth.login, element: <LoginPage /> },
          { path: appRoutes.auth.register, element: <RegisterPage /> },
          {
            path: appRoutes.auth.forgotPassword,
            element: <ForgotPasswordPage />,
          },
          {
            path: appRoutes.auth.resetPassword,
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
