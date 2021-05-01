// import React from 'react';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"


class Customer extends Component {

    initialState = {

        display_complaint_form: false,
        complaint: "",
        customer_complaint: [],

    }
    constructor(props) {
        super(props)
        this.state = this.initialState;
    }



    componentDidMount = () => {
        this.handelFitchComplaint()
    }

    handelFitchComplaint = () => {
        var email = localStorage.getItem('email')
        axios.get("http://localhost:3001/customerComplaints", {
            params: {
                email: email
            }
        }).then((res) => {
            this.setState({ customer_complaint: res.data })
        })
    }

    handelSubmitComplaint = () => {
        var complaint = this.state.complaint
        var email = localStorage.getItem('email')

        if (complaint === "") {
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

        axios.post("http://localhost:3001/submit", { email: email, complaint: complaint }).then((res) => {

            toast.success(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.handelFitchComplaint();
            this.setState({ display_complaint_form: false })
        })
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
                <header className="App-header">
                    <i className="fas fa-door-open" onClick={() => {
                        {
                            localStorage.clear()
                            this.props.handelChangePage("logout")
                        }
                    }} >
                        {" - " + "logout"}
                    </i>
                    <h1 className="company-name">ABC Company</h1>
                </header>
                <div className="customer-App">
                    <div className="header-container">
                        <h1 className="inner-header"> Customer</h1>
                    </div>
                    <div className="customer-box">
                        <div className="customer-left">
                            {!this.state.display_complaint_form ? <a className="customer-screen-buttons" onClick={() => {
                                this.setState({ display_complaint_form: true })
                            }} >
                                <i className="fas fa-plus"></i>
                                <p style={{ fontSize: 24 }}>ADD Complaint</p>
                            </a> :
                                <div className="submit-container">
                                    <div className="inputs-div">
                                        <label className="input-label" htmlFor="email" name="email">Complaint</label>
                                        <textarea
                                            onChange={(e) => {
                                                this.setState({ complaint: e.target.value })
                                            }}
                                            type="email"
                                            className="customer-input-field"
                                            placeholder="Please fill out your complaint and Submit" />
                                    </div>
                                    <a className="home-screen-buttons" style={{ marginTop: 70 }} onClick={() => {
                                        this.handelSubmitComplaint()
                                    }} >Submit</a>
                                </div>
                            }
                        </div>
                        <div className="customer-right">
                            {this.state.customer_complaint.length > 0 ? this.state.customer_complaint.map((element, index) => {
                                return (
                                    <div key={index} className="customer-card">
                                        complaint Details : {element.complaint} <br />
                                        complaint status : {element.status}
                                    </div>
                                )
                            }) : (<div className="no-complaint">No available complaints</div>)}

                        </div>
                    </div>

                </div>
            </div>


        );
    }
}

export default Customer;
