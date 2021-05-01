// import React from 'react';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';


import axios from "axios"


class Signup extends Component {

    initialState = {
        email: "",
        password: "",
        conf_password: "",
        role: "",
        isLoading: false,
    }
    constructor(props) {
        super(props)
        this.state = this.initialState;
    }

    handelCreateNewAccount = () => {
        let email = this.state.email
        let password = this.state.password
        let conf_password = this.state.conf_password
        let role = this.state.role

        if (email === "") {
            toast.error('please fill out the E-mail address', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (password === "") {
            toast.error('please fill out the password', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (conf_password === "") {
            toast.error('please fill out the Confirm password', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (role === "") {
            toast.error('please select user Role', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (password !== conf_password) {
            toast.error('password doesn`t match', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else {
            this.setState({ isLoading: true })
            axios.post("http://localhost:3001/signup", { email: email, password: password, role: role }).then((res) => {

                if (res.data === "new user added successfully ") {
                    this.setState({ isLoading: false })
                    this.props.history.push("/login")

                } else {
                    this.setState({ isLoading: false })
                    toast.error(res.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            })
        }

    }

    handleValidateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            this.setState({ email: email })
        } else {
            toast.error('wrong e-mail format', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    onChangeRoleValue = (e) => {
        this.setState({ role: e.target.value })
    }
    render() {
        let { isLoading } = this.state
        return (
            <div className="main-container" >
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <div className="main-container">
                    <header className="App-header">
                        <i className="fas fa-arrow-circle-left" onClick={() => {
                            this.props.history.push("/")

                        }}></i>
                        <h1 className="company-name">ABC Company</h1>
                    </header>
                    <div className="App">
                        <div className="header-container">
                            <h1 className="inner-header"> Registration</h1>
                        </div>
                        {isLoading ? (
                            <div className="clipLoader">
                                <ClipLoader loading={isLoading} size={150} />
                            </div>
                        ) : (
                            <div className="signup-box">
                                <div className="inputs-div">
                                    <label className="input-label" htmlFor="email" name="email">E-mail</label>
                                    <input type="email" className="input-field" onBlur={(e) => {
                                        this.handleValidateEmail(e.target.value)
                                    }} />
                                </div>
                                <div className="inputs-div">
                                    <label className="input-label" htmlFor="password" name="password">Password</label>
                                    <input type="password" className="input-field" onChange={(e) => {
                                        this.setState({ password: e.target.value })
                                    }} />
                                </div>
                                <div className="inputs-div">
                                    <label className="input-label" htmlFor="conf_password" name="conf_password">Confirm password</label>
                                    <input type="password" className="input-field" onChange={(e) => {
                                        this.setState({ conf_password: e.target.value })
                                    }} />
                                </div>
                                <div className="radio-style" onChange={this.onChangeRoleValue}>
                                    <div>
                                        <input className="radio-button" type="radio" id="admin" name="role" value="admin" />
                                        <label className="input-label" for="admin">Admin</label>
                                    </div>
                                    <div>
                                        <input className="radio-button" type="radio" id="customer" name="role" value="customer" />
                                        <label className="input-label" for="customer">Customer</label>
                                    </div>
                                </div>
                                <div>
                                    <a className="home-screen-buttons" onClick={() => {
                                        this.props.history.push('/login');
                                        this.handelCreateNewAccount()
                                    }} >Register</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        );
    }
}

export default withRouter(Signup);
