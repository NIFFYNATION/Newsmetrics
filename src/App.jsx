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
import NotFound from './pages/NotFound';
import { CommentsProvider } from "./context/CommentsContext";
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/article/:id" element={<SinglePost />} />
                    <Route path="/local" element={<Local />} />
                    <Route path="/entertainment" element={<Entertainment />} />
                    <Route path="/politics" element={<Politics />} />
                    <Route path="/crime" element={<Crime />} />
                    <Route path="/business" element={<Business />} />
                    <Route path="/tech" element={<Tech />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MainLayout>
              </div>
            </div>
          </Router>
        </ErrorBoundary>
      </CommentsProvider>
    </HelmetProvider>
  );
}

export default App;