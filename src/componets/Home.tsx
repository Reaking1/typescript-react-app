import * as React from "react";
import axios from "axios";
import { Link, RouteComponentProps } from "react-router-dom";

interface IState {
    customers: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {customers: []}
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:3000/customers`).then(data => [
            this.setState({ customers: data.data})
        ])
    }

    public deleteCustomer(id: number) {
        axios.delete(`http://localhost:3000/customers/${id}`).then(data => {
          // Create a new array excluding the deleted customer
          const updatedCustomers = this.state.customers.filter(customer => customer.id !== id);
          
          this.setState({ customers: updatedCustomers });
          this.props.history.push('/');
        });
      }
      

    public render() {
        const customers = this.state.customers;
        return (
            <div>
                {customers.length === 0 && (
                    <div className="text-center">
                        <h2>No customer found at the moment</h2>
                    </div>
                )} 
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Firstname</th>
                                   <th scope="col">Lastname</th>
                                   <th scope="col">email</th>
                                   <th scope="col">Phone</th>
                                   <th scope="col">Address</th>
                                   <th scope="col">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                                {customers && customers.map(customer => 
                                    <tr key={customer.id}><td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.description}</td>
                                    
                                       
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{marginBottom: "20px"}}>
                                                    <Link to={`edit/${customer.id}`} className="btn btn-btn-outline-secondary">Edit Customer</Link>
                                                    <button className="btn btn-sm btn outLine-secondary" onClick={() => this.deleteCustomer(customer.id)}>Delete Customer</button>
                                                    </div>
                                            </div>
                                        </td>
                                    </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

