import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="root">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
