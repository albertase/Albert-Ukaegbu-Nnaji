import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "../layouts";
import Login from "../pages/Login";
import OtherPages from "../pages/EmptyContentPages";
import UserDetailsPage from "../pages/UserDetailsPage";
import UsersPage from "../pages/UsersPage";

const OverallRoutes = () => {
  const location = useLocation();
  const otherRoutes: string[] = [
    "/dashboard",
    "/watchlist",
    "/guarantors",
    "/loans",
    "/decision-models",
    "/guarantors",
    "/savings",
    "/whitelist",
    "/karma",
    "/organization",
    "/loan-products",
    "/loan-requests",
    "/savings-products",
    "/fees-charges",
    "/Products",
    "/transactions",
    "/services",
    "/service-account",
    "/settlements",
    "/reports",
    "/preferences",
    "/fees-pricing",
    "/audit-logs",
    "/systems-messages",
  ];

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route
          path="/users"
          element={
            <MainLayout>
              <UsersPage />
            </MainLayout>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/users/:id"
          element={
            <MainLayout>
              <UserDetailsPage />
            </MainLayout>
          }
        />
      </Routes>
      {otherRoutes.includes(location.pathname) && (
        <Routes>
          <Route
            path={`/${location.pathname}`}
            element={
              <MainLayout>
                {otherRoutes.includes(location.pathname) && <OtherPages />}
              </MainLayout>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default OverallRoutes;
