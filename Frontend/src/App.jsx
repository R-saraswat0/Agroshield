import React from "react";
import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "./components/PrivateRoute";


import CreateForm from "./Pages/CreateForm";
import UserProfile from "./Pages/UserProfile";
import AiRecomendationForm from "./Pages/AiRecomendationForm";
import UpdateSubmittedForm from "./Pages/UpdateSubmittedForm";
import DeleteSubmittedForm from "./Pages/DeleteSubmittedForm";
import MyInquiries from "./Pages/MyInquiries";
import Dashboard from "./components/Dashboard";
import ManagerResponses from "./Pages/ManagerResponses";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./components/Navbar";
import LogNavBar from "./components/LogingNavBar";
import AdminDashboard from "./Pages/AdminDashboard";
import ArticleView from "./components/ArticleView";
import HomeAfterLogin from "./Pages/HomeAfterLogin";
import UserManagement from "./components/UserManagement";
import Unauthorized from "./Pages/Unauthorized";

import HomeMaterial from "./Pages/HomeMaterial";
import CreateMaterial from "./Pages/CreateMaterial";
import ShowMaterial from "./Pages/ShowMaterial";
import EditMaterial from "./Pages/EditMaterial";
import BuyMaterial from "./Pages/BuyMaterial";
import SupplierAnalytics from "./Pages/SupplierAnalytics";

import MyInquiriez from "./Pages/MyInquiriez";
import ManagerDashboard from "./Pages/ManagerDashboard";
import ManagerAlertForm from "./Pages/ManagerAlertForm";
import UpdateAlerts from "./Pages/UpdateAlerts";
import AgriStore from "./Pages/AgriStore";

import PlantDiseaseIdentifier from "./Pages/apitest";

const App = () => {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes - Authenticated Users */}
          <Route path="/loghome" element={
            <PrivateRoute allowedRoles={["farmer", "OrganicFarmer", "cropFarmer", "greenhouseFarmer", "forester", "gardener", "soilTester", "agriculturalResearcher", "manager", "admin", "supplier"]}>
              <HomeAfterLogin />
            </PrivateRoute>
          } />
          <Route path="/viewarticles" element={
            <PrivateRoute allowedRoles={["farmer", "OrganicFarmer", "cropFarmer", "greenhouseFarmer", "forester", "gardener", "soilTester", "agriculturalResearcher", "manager", "admin", "supplier"]}>
              <ArticleView />
            </PrivateRoute>
          } />

          {/* Protected Routes - Admin Only */}
          <Route path="/admin" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UserManagement />
            </PrivateRoute>
          } />
          <Route path="/admin/manageusers" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UserManagement />
            </PrivateRoute>
          } />
          <Route path="/admin/articles" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/articles/create" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/analytics" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/settings" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/viewarticle" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ArticleView />
            </PrivateRoute>
          } />

          {/* Protected Routes - Manager Only */}
          <Route path="/manager-dashboard" element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </PrivateRoute>
          } />
          <Route path="/manager/alerts/manage" element={
            <PrivateRoute allowedRoles={["manager"]}>
              <UpdateAlerts />
            </PrivateRoute>
          } />

          {/* Protected Routes - Farmer/OrganicFarmer/CropFarmer/GreenhouseFarmer/Forester/Gardener/SoilTester/AgriculturalResearcher */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute allowedRoles={["farmer", "OrganicFarmer", "cropFarmer", "greenhouseFarmer", "forester", "gardener", "soilTester", "agriculturalResearcher"]}>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="createinquiry" element={<CreateForm />} />
            <Route path="updateinquiry/:id" element={<UpdateSubmittedForm />} />
            <Route path="deleteinquiry/:id" element={<DeleteSubmittedForm />} />
            <Route path="myinquiries" element={<MyInquiries />} />
            <Route path="userprofile" element={<UserProfile />} />
            <Route path="managerresponses" element={<ManagerResponses />} />
          </Route>

          {/* AI Treatment - Available to all authenticated users */}
          <Route path="/aitreatment" element={
            <PrivateRoute allowedRoles={["farmer", "OrganicFarmer", "cropFarmer", "greenhouseFarmer", "forester", "gardener", "soilTester", "agriculturalResearcher", "manager", "admin", "supplier"]}>
              <AiRecomendationForm />
            </PrivateRoute>
          } />

          {/* My Inquiries */}
          <Route path="/my-inquiriez" element={
            <PrivateRoute allowedRoles={["farmer", "OrganicFarmer", "cropFarmer", "greenhouseFarmer", "forester", "gardener", "soilTester", "agriculturalResearcher"]}>
              <MyInquiriez />
            </PrivateRoute>
          } />

          {/* Alert Form */}
          <Route path="/alert" element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerAlertForm />
            </PrivateRoute>
          } />

          {/* Material Routes - Supplier */}
          <Route path="/materials" element={
            <PrivateRoute allowedRoles={["supplier"]}>
              <HomeMaterial />
            </PrivateRoute>
          } />
          <Route path="/materials/create" element={
            <PrivateRoute allowedRoles={["supplier"]}>
              <CreateMaterial />
            </PrivateRoute>
          } />
          <Route path="/materials/edit/:id" element={
            <PrivateRoute allowedRoles={["supplier"]}>
              <EditMaterial />
            </PrivateRoute>
          } />
          <Route path="/materials/buy" element={
            <PrivateRoute allowedRoles={["farmer", "OrganicFarmer", "cropFarmer", "greenhouseFarmer", "forester", "gardener", "soilTester", "agriculturalResearcher", "manager", "admin", "supplier"]}>
              <BuyMaterial />
            </PrivateRoute>
          } />
          <Route path="/materials/details/:id" element={<ShowMaterial />} />
          <Route path="/materials/analytics" element={
            <PrivateRoute allowedRoles={["supplier"]}>
              <SupplierAnalytics />
            </PrivateRoute>
          } />

          {/* AgriStore */}
          <Route path="/agristore" element={<AgriStore />} />

          {/* Plant API */}
          <Route path="/plantapi" element={
            <PrivateRoute allowedRoles={["farmer", "OrganicFarmer", "cropFarmer", "greenhouseFarmer", "forester", "gardener", "soilTester", "agriculturalResearcher", "manager", "admin", "supplier"]}>
              <PlantDiseaseIdentifier />
            </PrivateRoute>
          } />
        </Routes>
      </SnackbarProvider>
    </>
  );
};

export default App;
