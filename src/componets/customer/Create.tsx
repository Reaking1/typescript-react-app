import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

interface IFormState {
  values: IValues;
  submitSuccess: boolean;
  loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      values: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
      },
      submitSuccess: false,
      loading: false,
    };
  }

  private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData: IValues = {
      first_name: this.state.values.first_name,
      last_name: this.state.values.last_name,
      email: this.state.values.email,
      phone: this.state.values.phone,
      address: this.state.values.address,
      description: this.state.values.description,
    };
    
    this.setState({ loading: true})
    try {
        //Simulate a delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000));
        //Send the actual POST request to our API
        const response = await axios.post(`http://localhost:3000/customers` , formData)
    
        console.log(response.data)
        //Stimilate a successful submission
        this.setState((prevState) => ({
          submitSuccess: true,
          values: {...prevState.values, formData},
          loading: false
        }));

        //Redirect after a succesful submission
        setTimeout(() => {
          this.props.history.push('/')
        })
    } catch (error) {
        console.error("Error during form submission", error);
        this.setState({ loading: false})
    };

    // Your form submission logic goes here

    this.setState((prevState) => ({
      submitSuccess: true,
      values: { ...prevState.values, formData },
      loading: false,
    }));
  };

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

public  render() {
  const {submitSuccess,loading} = this.state;
    return (
     <div>
     <div className={"col-md-12 form-wrapper"}>
      <h2>Create Post</h2>
      {!submitSuccess && (
        <div className="alert alert-info" role="alert">
          Fill the form below to create a new post
        </div>
      )}
        {!submitSuccess && (
        <div className="alert alert-info" role="alert">
          The form was succesfully submitted!
        </div>
      )}

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
  
    );
  }
}

export default withRouter(Create);
