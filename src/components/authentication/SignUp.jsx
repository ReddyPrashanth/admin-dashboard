import Form from "../shared/Form";

class SignUp extends Form {
    state = {
        data: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: ""            
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.data);
    }

    render() {
        return (
            <div className="flex justify-center items-center h-screen-90">
                <div className="py-2 bg-white rounded shadow p-4 w-2/3 md:w-1/2 lg:w-1/2">
                    <h3 className="text-lg font-medium text-purple-700 mb-2 text-center">Sign Up Form</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="flex items-center">
                            <div className="w-1/2 mr-2">
                                {this.renderInput("firstName", "First Name")}
                                {this.renderInput("lastName", "Last Name")}
                                {this.renderInput("email", "Email", "email")}
                                {this.renderInput("phone", "Mobile Phone", "tel", "15")}
                                {this.renderInput("password", "Password", "password")}
                            </div>
                            <div className="w-1/2">
                                {this.renderInput("address1", "Address1")}
                                {this.renderInput("address2", "Address2")}
                                {this.renderInput("city", "City")}
                                {this.renderInput("state", "State")}
                                {this.renderInput("zipCode", "Zip Code", "number")}
                            </div>
                        </div>
                        <div className="flex justify-between">
                        {this.renderButton("SIGN UP")}
                        {this.renderLink("Already have an account? Sign In")}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;