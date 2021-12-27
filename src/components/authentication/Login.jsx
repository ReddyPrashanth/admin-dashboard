import toast from 'react-hot-toast';
import Joi from 'joi';
import http from "../../http/api";
import { connect } from "react-redux";
import { getError, loginFailed, loginRequested, loginSucceded, resetAuthError } from "../../store/entities/auth";
import Alert from "../shared/Alert";
import Form from "../shared/Form";

class Login extends Form {
    state = {
        data: {
            email: "",
            password: ""
        },
        validationErrors: {}
    }

    schemaOptions = {
        email: Joi.string().required().email({ tlds: { allow: false } }).label('Email'),
        password: Joi.string().required().label('Password')
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = async () => {
        const {history} = this.props;
        try{
            this.props.authenticateUser();
            const {data} = await http.post('/auth/signin', this.state.data, {withCredentials: true});
            this.props.loginSucceded(data);
            toast.success(`Welcome back ${data.firstName}.`);
            history.push('/home');
        }catch(error) {
            this.props.loginFailed(error.response.data.message);
        }
    }

    render() {
        const {error} = this.props;
        return (
            <div className="flex justify-center items-center h-screen-90">
                <div className="py-2 bg-white rounded shadow p-4 w-2/3 md:w-1/2 lg:w-1/3">
                    {error && <Alert message={error} color="red" actiontype={resetAuthError.type}/>}
                    <h3 className="text-lg font-medium text-purple-700 mb-2 mt-2 text-center">Login Form</h3>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
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