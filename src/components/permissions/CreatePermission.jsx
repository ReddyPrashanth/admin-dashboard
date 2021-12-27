import { connect } from "react-redux";
import Joi from 'joi';
import { createPermission, resetPermissionError } from "../../store/entities/permissions";
import Alert from "../shared/Alert";
import Form from "../shared/Form";

class CreatePermission extends Form {
    state = {
        data: {
            name: "",
            description: ""
        },
        validationErrors: {}
    }

    schemaOptions = {
        name: Joi.string().required().label('Permission Name'),
        description: Joi.string().required().label('Permission Description')
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = () => {
        const formData = this.state.data;
        this.props.createPermission(formData);
        this.setState({
            data: {
                name: "",
                description: ""
            }  
        });
    }

    render() {
        const {error} = this.props;
        return (
            <div className="py-2 bg-white rounded shadow p-4 max-w-full">
                {error && <Alert message={error} color="red" actiontype={resetPermissionError.type}/>}
                <br />
                <h3 className="text-lg font-medium text-purple-700 mb-2 text-center">Create Permission Form</h3>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    {this.renderInput("name", "Permission")}
                    {this.renderTextArea("description", "Permission Description", "3")}
                    <div className="flex justify-between">
                        {this.renderButton("CREATE PERMISSION")}
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createPermission: (formData) => dispatch(createPermission(formData)),
});

export default connect(null, mapDispatchToProps)(CreatePermission);