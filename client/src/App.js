import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Header />
      <div
        style={{
          margin: "auto",
          marginTop: "9rem",
          padding: "1rem",
          minHeight: "90vh",
          maxWidth: "80%",
        }}
      >
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
