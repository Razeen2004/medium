import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Blog from "./pages/Blog";
import { Dashboard } from "./pages/Dashboard";
import { SingleBlog } from "./pages/SingleBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/blog/:id" element={<SingleBlog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
