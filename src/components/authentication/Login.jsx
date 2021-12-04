import axios from "axios";
import { connect } from "react-redux";
import { getError, loginFailed, loginRequested, loginSucceded, resetAuthError } from "../../store/entities/auth";
import Alert from "../shared/Alert";
import Form from "../shared/Form";

class Login extends Form {
    state = {
        data: {
            email: "",
            password: ""
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {history} = this.props;
        try{
            this.props.authenticateUser();
            const response = await axios.post('http://127.0.0.1:3000/auth/signin', this.state.data, {withCredentials: true});
            this.props.loginSucceded(response.data);
            history.push('/home');
        }catch(error) {
            this.props.loginFailed(error.response.data.message);
            history.push('/login');
        }
    }

    render() {
        const {error} = this.props;
        return (
            <div className="flex justify-center items-center h-screen-90">
                <div className="py-2 bg-white rounded shadow p-4 w-2/3 md:w-1/2 lg:w-1/3">
                    {error && <Alert message={error} color="red" actiontype={resetAuthError.type}/>}
                    <h3 className="text-lg font-medium text-purple-700 mb-2 mt-2 text-center">Login Form</h3>
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

const mapDispatchToProps = (dispatch) => ({
    authenticateUser: () => dispatch(loginRequested()),
    loginSucceded: (user) => dispatch(loginSucceded(user)),
    loginFailed: (error) => dispatch(loginFailed(error))
});

const mapStateToProps = (state) => ({
    error: getError(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);