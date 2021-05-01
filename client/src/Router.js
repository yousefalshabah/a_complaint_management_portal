import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignUp from "./components/signUpPage"
import Login from "./components/loginPage"
import Admin from "./components/adminPage"
import Customer from "./components/customerPage"
import Main from "./components/main"
export default function router() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <Main />
                </Route>
                <Route path="/signup" exact={true}>
                    <SignUp />
                </Route>
                <Route path="/login" exact={true}>
                    <Login />
                </Route>
                <Route path="/admin" exact={true}>
                    <Admin />
                </Route>
                <Route path="/customer" exact={true}>
                    <Customer />
                </Route>
            </Switch>
        </Router>
    );
}