import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Header from "./layouts/Header"; // Updated import statement
import Home from "./pages/Home";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

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
import ErrorBoundary from "./components/ErrorBoundary";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/index";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "react-query";

const LazyTech = lazy(() => import("./pages/Tech"));
const LazyBusiness = lazy(() => import("./pages/Business"));
const LazyLocal = lazy(() => import("./pages/Local"));
const LazyEntertainment = lazy(() => import("./pages/Entertainment"));
const LazyPolitics = lazy(() => import("./pages/Politics"));
const LazyCrime = lazy(() => import("./pages/Crime"));

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
                        <Route
                          path="/local"
                          element={
                            <Suspense fallback={<LoadingSpinner />}>
                              <LazyLocal />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/entertainment"
                          element={
                            <Suspense fallback={<LoadingSpinner />}>
                              <LazyEntertainment />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/politics"
                          element={
                            <Suspense fallback={<LoadingSpinner />}>
                              <LazyPolitics />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/crime"
                          element={
                            <Suspense fallback={<LoadingSpinner />}>
                              <LazyCrime />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/business"
                          element={
                            <Suspense fallback={<LoadingSpinner />}>
                              <LazyBusiness />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/tech"
                          element={
                            <Suspense fallback={<LoadingSpinner />}>
                              <LazyTech />
                            </Suspense>
                          }
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                          path="/privacy-policy"
                          element={<PrivacyPolicy />}
                        />
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
          <GoogleAnalytics measurementId="G-9W6S8HBQBB" />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
