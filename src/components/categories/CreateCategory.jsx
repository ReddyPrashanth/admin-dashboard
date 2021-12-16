import Form from "../shared/Form";
import http from '../../http/api';
import { categoryCreated, categoryCreationFailed, createCategoryRequested, url } from "../../store/entities/categories";
import { connect } from "react-redux";

class CreateCategory extends Form {
    state = {
        data: {
            name: '',
            description: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const formData = this.state.data;
        try{
            this.props.createCategory();
            const response = await http.post(url, formData, {withCredentials: true});
            this.props.categoryCreated(response.data);
            this.setState({
                data: {
                    name: '',
                    description: ''
                }
            });
        }catch(error) {
            this.props.categoryFailed(error.response.data)
        }
    }

    render() {
        return (
            <div className="bg-white rounded border p-2 max-w-full">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Category Name")}
                    {this.renderTextArea("description", "Category Description", "3")}
                    <div className="flex justify-between">
                        {this.renderButton("CREATE CATEGORY")}
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    categoryCreated: (category) => dispatch({type: categoryCreated.type, payload: category}),
    createCategory: () => dispatch({type: createCategoryRequested.type}),
    categoryFailed: (error) => dispatch({type: categoryCreationFailed.type, payload: error})
});

export default connect(null, mapDispatchToProps)(CreateCategory);