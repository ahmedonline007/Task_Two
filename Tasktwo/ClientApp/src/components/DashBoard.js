import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import toastr from 'toastr';

class DashBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 0,
            pageSize: 0,
            name: '',
            no: '',
            address: '',
            phone: ''
        }
    }

    saveInfo = async () => {
        if (this.state.name != '' || this.state.no != '' || this.state.phone != '' || this.state.address != '') {

            let obj =
            {
                CustomerName: this.state.name,
                CustomerNo: this.state.no,
                Address: this.state.address,
                Phone: this.state.phone
            };

            let dto = JSON.stringify(obj);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: dto
            };

            await fetch(`api/Values/AddCustomer`, requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ postId: data.id }));

            toastr.success('Save Success');

        } else {
            toastr.error('Please Write Info');
        }
    }

    handleValue = (e, feild) => {
        this.setState({
            [feild]: e.target.value
        })
    }

    Print = async () => {
        const response = await fetch('api/Values/GenerateReport');
        const data = await response.arrayBuffer();
        const file = new Blob([data], {
            type: 'application/pdf',
        });

        const fileURL = URL.createObjectURL(file);

        window.open(fileURL); 
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>CustomerName</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={this.state.name} onChange={(e) => this.handleValue(e, "name")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>CustomerNo</Form.Label>
                        <Form.Control type="text" placeholder="Enter No" value={this.state.no} onChange={(e) => this.handleValue(e, "no")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" value={this.state.address} onChange={(e) => this.handleValue(e, "address")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Phone" value={this.state.phone} onChange={(e) => this.handleValue(e, "phone")} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.saveInfo}>
                        Submit
                    </Button>
                    <Button onClick={this.Print}>Print</Button>
                </Form>
            </div>
        )
    }

}


export default DashBoard;