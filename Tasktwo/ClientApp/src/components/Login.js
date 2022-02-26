import React, { Component, Fragment } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import toastr from 'toastr';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "Admin",
            password: "Admin",
            isLoading: false
        }
    }

    handleLogin = () => {
        if (this.state.userName === "Admin" && this.state.password == "Admin") {
            this.props.history.push("/DashBoard");
        }
        else {
            toastr.error("Invalid UserName Or Password");
        }
    }

    handleValue = (e, feild) => {
        this.setState({
            [feild]: e.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <div style={{ backgroundColor: "rgb(240, 235, 235)", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <form style={{
                        border: "1px solid black", backgroundColor: 'white', padding: '20px 50px',
                        margin: '10px 0', width: '400px', height: '400px', borderRadius: '5px'
                    }}>
                        <h2 style={{ fontFamily: 'Arial', textAlign: 'center' }}>
                            Login
                        </h2>
                        <div>
                            <label htmlFor="userId">UserName</label> <br />
                            <input
                                style={{
                                    border: "1px solid rgb(194, 189, 189)", padding: '15px 15px',
                                    margin: '5px 0', width: '100%', boxSizing: 'border-box', borderRadius: '4px'
                                }}
                                type="text"
                                value={this.state.userName}
                                onChange={(e) => this.handleValue(e, "userName")}
                                id="userId"
                                name="userName"
                                placeholder="UserName"
                            />
                        </div>
                        <div>
                            <label htmlFor="pass"> Password </label><br />
                            <input
                                style={{
                                    border: "1px solid rgb(194, 189, 189)", padding: '15px 15px',
                                    margin: '5px 0', width: '100%', boxSizing: 'border-box', borderRadius: '4px'
                                }}
                                type="password" id="pass" name="pass" placeholder="Password" onChange={(e) => this.handleValue(e, "password")} value={this.state.password} />
                        </div>
                        <br />
                        {this.state.isLoading ? <Button disabled style={{ width: '100px', height: '35px' }}>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading
                        </Button> :
                            <Button variant="success" type="button" onClick={this.handleLogin} style={{ width: '115px', height: '35px' }}> تسجيل الدخول </Button>
                        }
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default Login;
