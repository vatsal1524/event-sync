import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/Landingpage/landingPage";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Login from "./Pages/UserAuthentication/Login/Login";
import LayoutWithHeaderFooter from "./Pages/Layouts/LayoutWithHeaderFooter";
import LayoutWithoutHeaderFooter from "./Pages/Layouts/LayoutWithoutHeaderFooter";
import Registration from "./Pages/UserAuthentication/Registration/Registration";
import ResetPassword from "./Pages/UserAuthentication/ResetPassword/ResetPassword";
import EditProfile from "./Pages/UserProfile/EditProfile/EditProfile";
import Onboarding from "./Pages/UserProfile/Onboarding/Onboarding";
import Dashboard from "./Pages/Dashboard/Dashboard";
import EventList from "./Pages/Event/EventList/Eventlist";
import EventDetails from "./Pages/Event/EventDetails/EventDetails";
import EditEvent from "./Pages/Event/EditEvent/EditEvent";
import CreateEvent from "./Pages/Event/CreateEvent/CreateEvent";
import Analytics from "./Pages/Analytics/Analytics";
import Wishlist from "./Pages/Wishlist/Wishlist";
import MyEvents from "./Pages/Event/MyEvent/myEvent";
import CreateAdminQuery from "./Pages/Support/CreateAdminQuery/createAdminQuery";
import ViewAdminQuery from "./Pages/Support/ViewAdminQuery/viewAdminQuery";
import Faqs from "./Pages/Support/Faq/faq";
import NotificationsComponent from "./Pages/Notifications/Notifications";
import Approvals from "./Pages/Admin/Approvals/Approvals";
import Queries from "./Pages/Admin/Queries/Queries";
import ListingPage from "./Pages/Listing/listingPage";

const router = createBrowserRouter([
  {
    element: <LayoutWithHeaderFooter />,
    children: [
      {
        path: "/edit-profile/:id",
        element: <EditProfile />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/create-event",
        element: <CreateEvent />,
      },
      {
        path: "/my-events",
        element: <MyEvents />,
      },
      {
        path: "/event-list",
        element: <EventList />,
      },
      {
        path: "/event-details/:id",
        element: <EventDetails />,
      },
      {
        path: "/edit-event/:id",
        element: <EditEvent />,
      },
      {
        path: "/analytics/:id",
        element: <Analytics />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/faqs",
        element: <Faqs />,
      },
      {
        path: "/view-admin-query/:userId",
        element: <ViewAdminQuery />,
      },
      {
        path: "/create-admin-query/:userId",
        element: <CreateAdminQuery />,
      },
      {
        path: "/events-list",
        element: <ListingPage />,
      },
      {
        path: "/notifications",
        element: <NotificationsComponent />,
      },
    ],
  },

  {
    element: <LayoutWithoutHeaderFooter />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        element: <Faqs />,
        path: "/faqs",
      },
      {
        element: <ContactUs />,
        path: "/contact",
      },
      {
        path: "/admin/approvalrequests",
        element: <Approvals />,
      },
      {
        path: "/admin/queries",
        element: <Queries />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
