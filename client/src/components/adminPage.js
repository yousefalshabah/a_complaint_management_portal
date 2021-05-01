// import React from 'react';
import React, { Component } from 'react';
import axios from "axios"


class Admin extends Component {

    initialState = {


    }
    constructor(props) {
        super(props)
        this.state = this.initialState;
    }



    componentDidMount = () => {
        // axios.get("http://localhost:3001/", {}).then((res) => {
        //     console.log(`res`, res)
        // })
    }
    render() {
        return (
            <div>
                <h1>hello admin</h1>
            </div >
        );
    }
}

export default Admin;
