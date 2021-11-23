import Form from "../shared/Form";

class Login extends Form {
    state = {
        data: {
            email: "",
            password: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.data);
    }

    render() {
        return (
            <div className="flex justify-center items-center h-screen-90">
                <div className="py-2 bg-white rounded shadow p-4 w-2/3 md:w-1/2 lg:w-1/3">
                    <h3 className="text-lg font-medium text-purple-700 mb-2 text-center">Login Form</h3>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("email", "Email", "email")}
                        {this.renderInput("password", "Password", "password")}
                        <div className="flex justify-between">
                        {this.renderButton("SIGN IN")}
                        {this.renderLink("Forgot Password ?")}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;