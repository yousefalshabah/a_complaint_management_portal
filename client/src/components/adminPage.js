// import React from 'react';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios"


class Admin extends Component {

    initialState = {
        customer_complaint: [],
        status: ""

    }
    constructor(props) {
        super(props)
        this.state = this.initialState;
    }



    componentDidMount = () => {
        this.handelGetAllComplaints()
    }

    handelGetAllComplaints = () => {

        axios.get("http://localhost:3001/getAllComplaints", {
            params: {}
        }).then((res) => {
            console.log(`res.data`, res.data)
            this.setState({ customer_complaint: res.data })
        })
    }
    onChangeStatusValue = (e, status) => {
        this.setState({ [status]: e.target.value })
    }

    handelUpdateStatus = (element, index) => {
        let status = this.state["status" + index]
        let id = element.id
        axios.post("http://localhost:3001/updateComplaintStatus", {
            status: status,
            id: id
        }).then((res) => {
            console.log(`res.data`, res.data)
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
                        <h1 className="inner-header"> Admin</h1>
                    </div>
                    <div className="admin-box">
                        {this.state.customer_complaint.length > 0 ? this.state.customer_complaint.map((element, index) => {
                            return (
                                <div className="admin-card">
                                    <div className="admin-inner-card">
                                        <div>client E-mail : {element.email}</div>
                                        <div>Complaint Details : {element.complaint}</div>
                                        <div>Complaint status : {element.status}</div>
                                    </div>
                                    <div className="admin-inner-card" style={{ marginTop: 10 }}>
                                        <div className="radio-style" onChange={(e) => {
                                            let tag = "status" + index
                                            this.onChangeStatusValue(e, tag)
                                        }}>
                                            <div>
                                                <input className="radio-button-admin" type="radio" id="resolved" name={"status" + index} value="resolved" defaultChecked={element.status === "resolved" ? true : false} />
                                                <label className="admin-input-label" for="resolved">resolved</label>
                                            </div>
                                            <div>
                                                <input className="radio-button-admin" type="radio" id="pending" name={"status" + index} value="pending" defaultChecked={element.status == "pending" ? true : false} />
                                                <label className="admin-input-label" for="pending">pending</label>
                                            </div>
                                            <div>
                                                <input className="radio-button-admin" type="radio" id="dismissed" name={"status" + index} value="dismissed" defaultChecked={element.status === "dismissed" ? true : false} />
                                                <label className="admin-input-label" for="dismissed">dismissed</label>
                                            </div>
                                        </div>
                                        <div>
                                            <a className="admin-screen-buttons" onClick={() => {
                                                this.handelUpdateStatus(element, index)
                                            }} >update status</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : (<div className="no-complaint" >No available claims</div>)}
                    </div>

                </div>
            </div>
        );
    }
}

export default Admin;
