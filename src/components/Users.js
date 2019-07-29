import React, { Component } from 'react'
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2';

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            id: 0,
            username : '',
            email : '',
            password : '',
            modal: false,
            modalUpdate: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.newUser = this.newUser.bind(this);
        this.chargeInputs = this.chargeInputs.bind(this);
    }

    componentDidMount = ()=>{
        this.getUsers();
    }

    emptyUsers(){
        this.setState({
            username: '',
            email: '',
            password: ''
        })
    }

    newUser() {
        axios.post('http://localhost:8000/api/newUser', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then(() => {
            Swal.fire(
                'New user add!',
                'Successfull!',
                'success'
              )
            this.toggle();
            this.getUsers();
        })
    }

    getUsers = () => {

        axios.get(`http://localhost:8000/api/getUsers`)
            .then(res => {
                // console.log(res)
                let usersData = res.data;
                console.log(usersData);
                this.setState({
                    users: usersData.users,
                });
            });
    }
    
    updateUsers = () => {
        let {id, username, email} = this.state;

        axios.put(`http://localhost:8000/api/updateUser`, {
            id: id,
            username: username,
            email: email
        }).then(res => {
            Swal.fire(
                'User updated!',
                'Successfull!',
                'success'
              )
            this.getUsers();    
            this.toggleUpdate();
        });
    }

    deleteUser(user) {
        let id = user.id;
        Swal.fire({
            title: 'Are you sure?',
            text: 'Delete user '+ user.username,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!'
        }).then((result) => {
            if (result.value) {
                console.log(id);
                axios.delete('http://localhost:8000/api/deleteUser', {
                    data: {
                        id: id
                    }
                }).then((res) => {
                    Swal.fire(
                        'Deleted!',
                        'Successfull',
                        'success'
                    )
                    console.log(res);
                    this.getUsers()
                })

                
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancel',
                    'Not deleted',
                    'error'
                )
            }
        })
    }


    toggle() {
        this.emptyUsers();
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    chargeInputs(user){
        this.toggleUpdate();
        this.setState({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password
        });
    }

    toggleUpdate() {
        this.setState(prevState => ({
            modalUpdate: !prevState.modalUpdate
        }));
    }

    handleUsername = event => {
        this.setState({username: event.target.value});
    };

    handleEmail = event => {
        this.setState({email: event.target.value});
    };

    handlePassword = event => {
        this.setState({password: event.target.value});
    };

    render() {
        let {users, username, email, password} = this.state;
        return (
            <div>
                <Table striped dark bordered hover responsive>
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) =>
                        <tr key={index}>
                            <th scope="row">{user.id}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button size="sm" color="primary" onClick={() => this.chargeInputs(user)}><i className="fa fa-edit"></i></Button>{' '}
                                <Button size="sm" color="danger" onClick={() => this.deleteUser(user)}><i className="fa fa-trash"></i></Button>{' '}

                            </td>
                        </tr>
                    )}

                    </tbody>
                </Table>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                    <Form>
                    <Row form>
                        <Col md={12} className="row">
                            <Col md={12}>
                                <FormGroup id="formStyle">
                                    <Label id="formularioLabel">Username:</Label>
                                    <Input type="text" value={username}
                                            onChange={this.handleUsername}
                                            placeholder="name123"/>
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup id="formStyle">
                                    <Label id="formularioLabel">Email:</Label>
                                    <Input type="email" onChange={this.handleEmail} value={email} placeholder="name@email.com" />
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup id="formStyle">
                                    <Label id="formularioLabel">password:</Label>
                                    <Input type="password"
                                            value={password}
                                            onChange={this.handlePassword}
                                            placeholder="pass123"/>
                                </FormGroup>
                            </Col>
                        </Col>
                    </Row>

                </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.newUser}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalUpdate} toggle={this.toggleUpdate} className={this.props.className}>
                    <ModalHeader toggle={this.toggleUpdate}>Update</ModalHeader>
                    <ModalBody>
                    <Form>
                    <Row form>
                        <Col md={12} className="row">
                            <Col md={12}>
                                <FormGroup id="formStyle">
                                    <Label id="formularioLabel">Username:</Label>
                                    <Input type="text" value={username}
                                            onChange={this.handleUsername}
                                            placeholder="name123"/>
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup id="formStyle">
                                    <Label id="formularioLabel">Email:</Label>
                                    <Input type="email" onChange={this.handleEmail} value={email} placeholder="name@email.com" />
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup id="formStyle">
                                    <Label id="formularioLabel">password:</Label>
                                    <Input type="password"
                                            value={password}
                                            onChange={this.handlePassword}
                                            placeholder="pass123"/>
                                </FormGroup>
                            </Col>
                        </Col>
                    </Row>

                </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateUsers}>Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggleUpdate}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Button color="primary" onClick={this.toggle}>Create new user</Button>

            </div>
        )
    }
}
