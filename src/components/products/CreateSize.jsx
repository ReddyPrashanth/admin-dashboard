import toast from 'react-hot-toast';
import Form from '../shared/Form';
import Alert from '../shared/Alert';
import http from '../../http/api';

export class CreateSize extends Form {
    state = {
        data: {
            name: '',
            description: ''
        },
        error: null
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const formData = this.state.data;
        try{
            const {data} = await http.post('/productsizes', formData, {withCredentials: true});
            this.setState({
                ...this.state,
                data: {
                    name: '',
                    description: '',
                }
            });
            toast.success(`Size ${data.name} is created.`);
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
            <div className="bg-white rounded border p-2 max-w-full mb-2">
                {error && <Alert message={error} color="red" actiontype={this.resetError} isDispatch={false}/>}
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Size Name")}
                    {this.renderTextArea("description", "Size Description", "3")}
                    <div className="flex justify-between">
                        {this.renderButton("CREATE PRODUCT SIZE")}
                    </div>
                </form>
            </div>
        )
    }
}