import Layout from "../components/Global/Layout";
import AddTeamMember from "../components/SalesTeam/AddTeamMember";
import CreateSubscriptionPlan from "../components/SalesTeam/CreateSubscriptionPlan";
import EditSalesPersonForm from "../components/SalesTeam/EditSalesPersonForm";
import SalesPersonProfile from "../components/SalesTeam/SalesPersonProfile";
import AllSubscriptions from "../pages/AllSubscriptions";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import HelpAndSupport from "../pages/HelpAndSupport";
import Login from "../pages/Login";
import SettingsNotificationsPage from "../pages/SettingsNotificationsPage";
import PaymentGateaway from "../pages/PaymentGateaway";
import PaymentMethodPage from "../pages/PaymentMethodPage";
import PreviousSubscriptions from "../pages/PreviousSubscriptions";
import Profile from "../pages/Profile";
import ProfileScreen from "../pages/ProfileScreen";
import ReportAccessScreen from "../pages/ReportAccessScreen";
import Reports from "../pages/Reports";
import SubscribersReport from "../pages/SubscribersReport";
import RevenueAnalysis from "../pages/RevenueAnalysis";
import SalesTeamPage1 from "../pages/SalesTeamPage1";
import ServiceRecords from "../pages/ServiceRecords";
import Settings from "../pages/Settings";
import SplashScreen1 from "../pages/SplashScreen1";
import SplashScreen2 from "../pages/SplashScreen2";
import SubscriberDetails from "../pages/SubscriberDetails";
import Subscription from "../pages/Subscription";
import SubscriptionPlanSetup from "../pages/SubscriptionPlanSetup";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import CreateNotificationsForUsers from "../pages/CreateNotificationsForUsers";
import SubscriptionBought from "../pages/SubscriptionBought";
import LoginDetails from "../components/Settings/LoginDetails";
import TermsAndServices from "../components/Settings/TermsAndServices";
import PrivacyPolicy from "../components/Settings/PrivacyPolicy";
import SettingsLayout from "../components/Settings/SettingsLayout";
import SettingsNotifications from "../components/Settings/SettingsNotifications";
import Tickets from "../pages/Tickets";
import CompleteStripeProfile from "../components/Profile/CompleteStripeProfile";
import ChangePassUpdateEmail from "../pages/ChangePassUpdateEmail";
import AccessKeyUpdateKey from "../pages/AccessKeyUpdateKey";
import ChangePassUpdatePass from "../pages/ChangePassUpdatePass";
import SendNotifications from "../pages/SendNotifications";

export const routes = [
  {
    title: "Splash Screen 1",
    url: "/",
    page: <SplashScreen1 />,
  },
  {
    title: "Splash Screen 2",
    url: "/splash-screen",
    page: <SplashScreen2 />,
  },
  {
    title: "Profile Screen",
    url: "/profile-setup",
    page: <Layout pages={<ProfileScreen />} />,
  },
  {
    title: "Profile Screen",
    url: "/complete-stripe-profile",
    page: <Layout pages={<CompleteStripeProfile />} />,
  },
  {
    title: "Login Page",
    url: "/login",
    page: <Login />,
  },
  {
    title: "Update EMail Change PAss Page",
    url: "/update-email",
    page: <ChangePassUpdateEmail />,
  },
  {
    title: "Update Access Key Page",
    url: "/update-access-key/:id",
    page: <AccessKeyUpdateKey />,
  },
  {
    title: "Update PAssword Page",
    url: "/update-password-email/:id",
    page: <ChangePassUpdatePass />,
  },
  {
    title: "Payment Method Page",
    url: "/payment",
    page: <PaymentMethodPage />,
  },
  {
    title: "Report Access Page",
    url: "/report-access",
    page: <Layout pages={<ReportAccessScreen />} />,
  },
  {
    title: "Dashboard Page",
    url: "/dashboard",
    page: <Layout pages={<Dashboard />} />,
  },
  {
    title: "Subscriber details Page",
    url: "/subscriber-details/:id",
    page: <Layout pages={<SubscriberDetails />} />,
  },
  {
    title: "Previous Subscriptions Page",
    url: "/previous-subscriptions",
    page: <Layout pages={<PreviousSubscriptions />} />,
  },
  {
    title: "Service Records Page",
    url: "/service-records/:id",
    page: <Layout pages={<ServiceRecords />} />,
  },
  {
    title: "Subscription Page",
    url: "/subscription",
    page: <Layout pages={<Subscription />} />,
  },
  {
    title: "Send Notifications",
    url: "/send-notifications",
    page: <Layout pages={<SendNotifications />} />,
  },
  {
    title: "Subscription Plans Page",
    url: "/subscription-plans",
    page: <Layout pages={<SubscriptionPlans />} />,
  },
  {
    title: "Create Subscription Plan Page",
    url: "/create-subscription-plan",
    page: <Layout pages={<SubscriptionPlanSetup />} />,
  },
  {
    title: "Create Subscription Plan Page",
    url: "/create-subscription-plan/:salesPersonId",
    page: <Layout pages={<SubscriptionPlanSetup />} />,
  },
  {
    title: "Create Subscription Plan Page",
    url: "/all-subscriptions",
    page: <Layout pages={<AllSubscriptions />} />,
  },
  {
    title: "Notifications Page",
    url: "/notifications",
    page: <Layout pages={<SettingsNotificationsPage />} />,
  },
  {
    title: "Reports Page",
    url: "/reports",
    page: <Layout pages={<Reports />} />,
  },
  {
    title: "Revenue Analysis Page",
    url: "/reports/revenue-analysis",
    page: <Layout pages={<RevenueAnalysis />} />,
  },
  {
    title: "Reports Page",
    url: "/reports/subscribers-report",
    page: <Layout pages={<SubscribersReport />} />,
  },
  {
    title: "Reports Page",
    url: "/reports/subscription-bought",
    page: <Layout pages={<SubscriptionBought />} />,
  },
  {
    title: "Payment Gateaway Page",
    url: "/payment-gateway",
    page: <Layout pages={<PaymentGateaway />} />,
  },
  {
    title: "SalesTeamPage1 Page",
    url: "/sales-team",
    page: <Layout pages={<SalesTeamPage1 />} />,
  },
  {
    title: "Add Sales Team Member Page",
    url: "/sales-team/add-member",
    page: <Layout pages={<AddTeamMember />} />,
  },
  {
    title: "Add Sales Team Member Page",
    url: "/sales-team/edit-salesperson/:id",
    page: <Layout pages={<EditSalesPersonForm />} />,
  },
  {
    title: "Add Sales Team Member Page",
    url: "/sales-team/sales-person-profile/:id",
    page: <Layout pages={<SalesPersonProfile />} />,
  },
  // {
  //   title: "Add Sales Team Member Page",
  //   url: "/sales-team/create-subscription-plan",
  //   page: <Layout pages={<CreateSubscriptionPlan />} />,
  // },
  // settings
  {
    title: "Settings Page",
    url: "/settings/notifications",
    page: (
      <Layout pages={<SettingsLayout page={<SettingsNotifications />} />} />
    ),
  },
  {
    title: "Settings Page",
    url: "/settings/change-password",
    page: <Layout pages={<SettingsLayout page={<LoginDetails />} />} />,
  },
  {
    title: "Settings Page",
    url: "/settings/terms-and-services",
    page: <Layout pages={<SettingsLayout page={<TermsAndServices />} />} />,
  },
  {
    title: "Settings Page",
    url: "/settings/privacy-policy",
    page: <Layout pages={<SettingsLayout page={<PrivacyPolicy />} />} />,
  },
  // settings end
  {
    title: "Profile Page",
    url: "/profile",
    page: <Layout pages={<Profile />} />,
  },
  {
    title: "Edit Profile Page",
    url: "/profile/edit-profile/:id",
    page: <Layout pages={<EditProfile />} />,
  },
  {
    title: "Help And Support Page",
    url: "/support-tickets",
    page: <Layout pages={<Tickets />} />,
  },
  // {
  //   title: "Help And Support Page",
  //   url: "/help-and-support",
  //   page: <Layout pages={<HelpAndSupport />} />,
  // },
  {
    title: "Notification and Create Notifications Page",
    url: "/system-notifications",
    page: <Layout pages={<CreateNotificationsForUsers />} />,
  },
];
