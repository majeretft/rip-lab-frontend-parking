import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import Home from "./components/home";
import About from "./components/about";
import Cart from "./components/cart";
import Admin from "./components/admin";
import Page404 from "./components/page404";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
