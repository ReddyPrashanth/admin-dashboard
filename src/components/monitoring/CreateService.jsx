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
        error: null
    }

    handleSubmit = async (e) => {
        e.preventDefault();
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
        }catch(error) {
            this.setState({
                ...this.state,
                error: error.response.data.message
            })
        }
    }

    resetError = () => {
        this.setState({
            ...this.state,
            error: null
        })
    }

    render() {
        const {error} = this.state;
        return (
            <div className="w-1/3 rounded border p-2">
                {error && <Alert message={error} color="red" actiontype={this.resetError} isDispatch={false}/>}
                <form onSubmit={this.handleSubmit}>
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