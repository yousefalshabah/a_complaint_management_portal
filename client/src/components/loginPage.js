// import React from 'react';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import { withRouter } from 'react-router-dom';



class Login extends Component {

    initialState = {
        email: "",
        password: "",
    }
    constructor(props) {
        super(props)
        this.state = this.initialState;
    }


    handelLogin = () => {
        let email = this.state.email
        let password = this.state.password

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
        else {
            axios.post("http://localhost:3001/login", { email: email, password: password }).then((res) => {
                if (res.data === "E-mail address dose note exists") {
                    toast.error(res.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {

                    const token = res.data.token;
                    const role = res.data.user_role
                    const email = res.data.email


                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);
                    localStorage.setItem('email', email);
                    if (role === "admin") {
                        this.props.history.push("/admin")

                    } else {
                        this.props.history.push("/customer")

                    }
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

    render() {
        return (
            <div>
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
                <div className="main-container" >
                    <div className="main-container">
                        <header className="App-header">
                            <i className="fas fa-arrow-circle-left" onClick={() => {
                                this.props.history.push("/")

                            }}></i>
                            <h1 className="company-name">ABC Company</h1>
                        </header>
                        <div className="App">
                            <div className="header-container">
                                <h1 className="inner-header"> Login</h1>
                            </div>

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

                                <div>
                                    <a className="home-screen-buttons" onClick={() => {
                                        this.handelLogin()
                                    }} >Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default withRouter(Login);
