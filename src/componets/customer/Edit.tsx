import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

export interface IValues {
  [key: string]: any;
}

export interface IFormState {
  id: number;
  customer: ICustomer;
  values: IValues;
  submitSuccess: boolean;
  loading: boolean;
}

class EditCustomer extends React.Component<RouteComponentProps<{ id?: string }>, IFormState> {
  constructor(props: RouteComponentProps<{ id?: string }>) {
    super(props);
    this.state = {
      id: props.match.params.id ? Number(props.match.params.id) : 0,
      customer: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
      },
      values: {}, // Change from [] to {}
      submitSuccess: false,
      loading: false,
    };
  }

  componentDidMount(): void {
    if (this.state.id !== 0) {
      this.fetchCustomerData();
    }
  }

  private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    this.setState({ loading: true });
  
    const formData: IValues = {
      first_name: this.state.values.first_name,
      last_name: this.state.values.last_name,
      email: this.state.values.email,
      phone: this.state.values.phone,
      address: this.state.values.address,
      description: this.state.values.description,
    };
  
    try {
      // Send the actual PATCH request to your API with the form data
      const response = await axios.patch(`http://localhost:3000/customers/${this.state.id}`, formData);
  
      // Check response status or handle as needed
      console.log(response.data);
  
      // Simulate a successful submission
      this.setState({ submitSuccess: true, loading: false });
  
      // Redirect after a successful submission
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500);
    } catch (error) {
      // Handle any errors during submission
      console.error("Error during form submission:", error);
      this.setState({ loading: false });
    }
  };
  
   


  fetchCustomerData = async () => {
    try {
      const res = await axios.get<ICustomer>(`http://localhost:3000/customers/${this.state.id}`);
      const customerData = res.data;
      // Update state with the fetched customer data
      this.setState({
        customer: customerData,
      });
    } catch (error) {
      console.error("Error fetching customer data", error);
    }
  };

  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setValues({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div className="App">
        {this.state.customer && 
        <div>
          <h1>Customer List Management App</h1>
          <p>Built with React.js and Typescript</p>
          <p>The code was updated with the new version</p>

          <div>
            <div className={"col-md-12 form-wrapper"}>
              <h2>Edit Customer</h2>
    
        {!submitSuccess && (
        <div className="alert alert-info" role="alert">
          Customer's details has been edited successfully
        </div>
      )}
            </div>
            <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
        
        <div className="form-group col-md-12">
          <label htmlFor="first_name">First Name</label>
          <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter customer's first name" />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="last_name">last Name</label>
          <input type="text" id="last_name" onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter customer's last name" />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter customer's  email" />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" onChange={(e) => this.handleInputChanges(e)} name="address" className="form-control" placeholder="Enter customer's  address" />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter customer's  phone number" />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter description" />
        </div>

        <div className="group col-md-4 pull-right">
          <button type="submit" className="btn btn-succes">
            Create Customer
          </button>
          {loading && 
          <span className="fa fa-circle-o-notch fa-spin"/>
          
          }
        </div>

      </form>
          </div>
        </div>
        }
      </div>
    ) // Adjust as needed
  }
}

export default withRouter(EditCustomer);
