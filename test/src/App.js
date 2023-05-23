import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import TodoPage from "./TodoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="Task" element={<TodoPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="About" element={<About />} />
        <Route path="Login" element={<Login />} />
        <Route path="Sign" element={<Registration />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};



export default App;
