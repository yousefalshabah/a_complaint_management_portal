// import React from 'react';
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';


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
        console.log(this.props)
        this.handelGetAllComplaints()
    }

    handelGetAllComplaints = () => {

        axios.get("http://localhost:3001/getAllComplaints", {
            params: {}
        }).then((res) => {
            this.setState({ customer_complaint: res.data })
        })
    }
    onChangeStatusValue = (e, status) => {
        this.setState({ [status]: e.target.value })
    }

    handelUpdateStatus = (element, index) => {
        let status = this.state["status" + index]
        let id = element.id
        axios.put("http://localhost:3001/updateComplaintStatus", {
            status: status,
            id: id
        }).then((res) => {
            this.handelGetAllComplaints();
        })
    }
    render() {
        return (
            <div>

                <header className="App-header">
                    <i className="fas fa-door-open" onClick={() => {
                        {
                            localStorage.clear()
                            this.props.history.push("/")
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
                                <div key={index} className="admin-card">
                                    <div className="admin-inner-card">
                                        <div>client E-mail : {element.email}</div>
                                        <div>Complaint Details : {element.complaint}</div>
                                        <div>Complaint status : {element.status}</div>
                                    </div>
                                    <div className="admin-inner-card" style={{ paddingTop: 10 }}>
                                        <div className="radio-style" style={{ paddingTop: 20 }} onChange={(e) => {
                                            let tag = "status" + index
                                            this.onChangeStatusValue(e, tag)
                                        }}>
                                            <div>
                                                <input className="radio-button-admin" type="radio" id="resolved" name={"status" + index} value="resolved" defaultChecked={element.status === "resolved" ? true : false} />
                                                <label className="admin-input-label" htmlFor="resolved">resolved</label>
                                            </div>
                                            <div>
                                                <input className="radio-button-admin" type="radio" id="pending" name={"status" + index} value="pending" defaultChecked={element.status == "pending" ? true : false} />
                                                <label className="admin-input-label" htmlFor="pending">pending</label>
                                            </div>
                                            <div>
                                                <input className="radio-button-admin" type="radio" id="dismissed" name={"status" + index} value="dismissed" defaultChecked={element.status === "dismissed" ? true : false} />
                                                <label className="admin-input-label" htmlFor="dismissed">dismissed</label>
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
                        }) : (<div className="admin-no-complaint" >No available complaints</div>)}
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(Admin);
