import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <HelmetProvider>
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/article/:id" element={<SinglePost />} />
        </Routes>
      </MainLayout>
    </Router>
    </HelmetProvider>

  );
}

export default App;