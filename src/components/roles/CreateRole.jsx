import { connect } from "react-redux";
import Joi from 'joi';
import { createRole, resetRoleError } from "../../store/entities/roles";
import Alert from "../shared/Alert";
import Form from "../shared/Form";

class CreateRole extends Form {
    state = {
        data: {
            name: "",
            description: ""
        },
        validationErrors: {}
    }

    schemaOptions = {
        name: Joi.string().required().label('Role'),
        description: Joi.string().required().label('Role Description')
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = () => {
        const formData = this.state.data;
        this.props.createRole(formData);
        this.setState({
            data: {
                name: "",
                description: ""
            }
        })
    }

    componentDidMount() {
        this.props.resetError();
    }

    render() {
        const { error } = this.props;
        return (
            <div className="py-2 bg-white rounded shadow p-4 max-w-full">
                {error && <Alert message={error} color="red" actiontype={resetRoleError.type}/>}
                <br />
                <h3 className="text-lg font-medium text-purple-700 mb-2 text-center">Create Role Form</h3>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    {this.renderInput("name", "Role")}
                    {this.renderTextArea("description", "Role Description", "3")}
                    <div className="flex justify-between">
                        {this.renderButton("CREATE ROLE")}
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createRole: (formData) => dispatch(createRole(formData)),
    resetError: () => dispatch(resetRoleError())
});

export default connect(null, mapDispatchToProps)(CreateRole);