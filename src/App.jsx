import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Header from "./layouts/Header"; // Updated import statement
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import Local from "./pages/Local";
import Entertainment from "./pages/Entertainment";
import Politics from "./pages/Politics";
import Crime from "./pages/Crime";
import Business from "./pages/Business";
import Tech from "./pages/Tech";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
// import AdminLogin from "./pages/AdminLogin";

import NotFound from "./pages/NotFound";
import { CommentsProvider } from "./context/CommentsContext";
import axios from "axios";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";


import { AuthProvider } from "./context/index";
import GoogleAnalytics from './components/GoogleAnalytics';

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <CommentsProvider>
          <ErrorBoundary>
            <Router>
              <div className="App">
                <Header />
                <div className="pt-[132px]">
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/Home" element={<Home />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/adminlogin" element={<AdminLogin />} />
                      <Route path="/article/:slug" element={<SinglePost />} />
                      <Route path="/local" element={<Local />} />
                      <Route path="/entertainment" element={<Entertainment />} />
                      <Route path="/politics" element={<Politics />} />
                      <Route path="/crime" element={<Crime />} />
                      <Route path="/business" element={<Business />} />
                      <Route path="/tech" element={<Tech />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route
                        path="/terms-of-service"
                        element={<TermsOfService />}
                      />
                      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

                      <Route 
                        path="/admin" 
                        element={
                          <ProtectedRoute>
                            <AdminDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/admin/create-post" 
                        element={
                          <ProtectedRoute>
                            <CreatePost />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/admin/edit-post/:id" 
                        element={
                          <ProtectedRoute>
                            <EditPost />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </MainLayout>
                </div>
              </div>
            </Router>
          </ErrorBoundary>
        </CommentsProvider>
      {/* Replace "G-XXXXXXXXXX" with your actual Google Analytics measurement ID */}
      <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
