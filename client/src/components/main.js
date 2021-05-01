// import React from 'react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Main extends Component {

    initialState = {}
    constructor(props) {
        super(props)
        this.state = this.initialState;
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        if (token && token.length > 10) {
            if (role === "admin") {
                this.props.history.push('/admin');

            } else {
                this.props.history.push('/customer');
            }
        }
    }

    render() {

        return (
            <div className="main-container" >
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
                                // this.handelChangePage("signup")
                                this.props.history.push("/signup")

                            }} >Registration</a>
                            <a className="home-screen-buttons" onClick={() => {
                                // this.handelChangePage("login")
                                this.props.history.push("/login")
                            }} >Login</a>
                        </div>
                    </div>
                </div>
            </div >
        )

    }
}

export default withRouter(Main);
