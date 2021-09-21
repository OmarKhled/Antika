import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import HamburgerMenu from "./components/HamburgerMenu";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Cart from "./pages/Cart";

const App = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ele = document.getElementById("loading");
    if (ele) {
      ele.classList.add("available");
      setTimeout(() => {
        ele.outerHTML = "";
        document
          .querySelector(
            'link[rel=stylesheet][href~="/static/styles/styles.css"]'
          )
          .remove();
      }, 200);
    }
  }, []);
  return (
    <Router>
      <HamburgerMenu open={open} setOpen={setOpen} />
      <Header open={open} setOpen={setOpen} />
      <div className="root">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
        <br />
      </div>
      <Footer />
    </Router>
  );
};

export default App;
