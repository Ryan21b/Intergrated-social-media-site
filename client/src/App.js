import React, { createContext, useReducer } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Login from "./components/AuthPages/Login";
import Profile from "./components/pages/Profile";
import Register from "./components/AuthPages/Register";
import CreatePost from "./components/pages/CreatePost";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

import { initialState, reducer } from "./reducer/userReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/createpost" component={CreatePost} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/home" component={Home} />
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
