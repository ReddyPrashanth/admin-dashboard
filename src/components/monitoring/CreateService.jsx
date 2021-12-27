import toast from 'react-hot-toast';
import Joi from 'joi';
import Form from "../shared/Form";
import http from '../../http/api';
import Alert from "../shared/Alert";

class CreateService extends Form {
    state = {
        data: {
            name: '',
            description: '',
            url: ''
        },
        validationErrors: {},
        error: null
    }

    schemaOptions = {
        name: Joi.string().required().label('Service Name'),
        description: Joi.string().required().label('Service Description'),
        url: Joi.string().required().label('Service URL')
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = async () => {
        const formData = this.state.data;
        try{
            const {data} = await http.post('/monitoring', formData, {withCredentials: true});
            this.props.addService(data);
            this.setState({
                ...this.state,
                data: {
                    name: '',
                    description: '',
                    url: ''
                }
            });
            toast.success(`Monitoring is enabled for service ${data.name}.`)
        }catch(error) {
            this.setState({
                ...this.state,
                error: error.response.data.message
            })
        }
    }

    render() {
        const {error} = this.state;
        return (
            <div className="w-1/3 rounded border p-2">
                {error && <Alert message={error} color="red" actiontype={this.resetError} isDispatch={false}/>}
                <form onSubmit={this.handleSubmit} autoComplete='off'>
                    {this.renderInput("name", "Service Name")}
                    {this.renderInput("url", "Service URL")}
                    {this.renderTextArea("description", "Service Description", "3")}
                    <div className="flex justify-between">
                        {this.renderButton("CREATE SERVICE")}
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateService;