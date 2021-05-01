// import React from 'react';
import React, { Component } from 'react';
import SignUp from "./components/signUpPage"
import Login from "./components/loginPage"
import Admin from "./components/adminPage"
import Customer from "./components/customerPage"
import axios from "axios"

import './App.css';

class App extends Component {

  initialState = {
    signup_selected: false,
    login_selected: false,
    admin_selected: false,
    customer_selected: false,
    isLogged: false

  }
  constructor(props) {
    super(props)
    this.state = this.initialState;
  }

  handelChangePage = (pageName) => {
    if (pageName === "logout") {
      this.setState({
        signup_selected: false,
        login_selected: false,
        admin_selected: false,
        customer_selected: false,
      })
    } else if (pageName === "homepage") {
      this.setState({
        signup_selected: false,
        login_selected: false,
        admin_selected: false,
        customer_selected: false,
      })
    } else if (pageName === "signup") {
      this.setState({
        signup_selected: true,
        login_selected: false,
        admin_selected: false,
        customer_selected: false,
      })
    } else if (pageName === "login") {
      this.setState({
        login_selected: true,
        signup_selected: false,
        admin_selected: false,
        customer_selected: false,
      })
    } else if (pageName === "admin") {
      this.setState({
        admin_selected: true,
        signup_selected: false,
        login_selected: false,
        customer_selected: false,
      })
    } else if (pageName === "customer") {
      this.setState({
        signup_selected: false,
        login_selected: false,
        admin_selected: false,
        customer_selected: true,
      })
    }
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (token && token.length > 10) {
      if (role === "admin") {
        this.handelChangePage("admin")
      } else {
        this.handelChangePage("customer")
      }
    }


    // axios.get("http://localhost:3001/", {}).then((res) => {
    //   console.log(`res`, res)
    // })
  }
  singinAuth() {
    const token = localStorage.getItem('token')
    if (token && token.length > 10) return true
    else return false
  }
  render() {
    let { signup_selected, login_selected, admin_selected, customer_selected } = this.state
    return (
      <div className="main-container" >
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />

        {signup_selected ? <SignUp handelChangePage={(pageName) => { this.handelChangePage(pageName) }} /> :
          login_selected ? <Login handelChangePage={(pageName) => { this.handelChangePage(pageName) }} /> :
            admin_selected ? <Admin handelChangePage={(pageName) => { this.handelChangePage(pageName) }} /> :
              customer_selected ? <Customer handelChangePage={(pageName) => { this.handelChangePage(pageName) }} /> : (
                <div className="main-container">
                  <header className="App-header">
                    <h1 className="company-name">ABC Company</h1>
                  </header>
                  <div className="App">
                    <div className="header-container">
                      <h1 className="inner-header">Complaint</h1>
                      <h1 className="inner-header"> Management</h1>
                      <h1 className="inner-header">Portal</h1>
                    </div>
                    <div className="home-page-box">


                      <a className="home-screen-buttons" onClick={() => {
                        this.handelChangePage("signup")
                      }} >Registration</a>
                      <a className="home-screen-buttons" onClick={() => {
                        this.handelChangePage("login")
                      }} >Login</a>


                      {/* <button className="home-screen-buttons ">Registration </button>
                      <button className="home-screen-buttons">LogIn</button> */}
                    </div>
                  </div>
                </div>
              )}

      </div >
    );
  }
}

export default App;
