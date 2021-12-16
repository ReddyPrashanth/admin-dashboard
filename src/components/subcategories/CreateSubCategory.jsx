import Form from "../shared/Form";
import http from '../../http/api';
import { connect } from "react-redux";
import { createSubCategoryRequested, subCategoryCreated, subCategoryCreationFailed, url } from "../../store/entities/subcategories";

class CreateSubCategory extends Form {
    state = {
        data: {
            name: '',
            description: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {...this.state.data, categoryId: Number.parseInt(this.props.categoryId)};
        try{
            this.props.createSubCategory();
            const response = await http.post(url, formData, {withCredentials: true});
            this.props.subCategoryCreated(response.data);
            this.setState({
                data: {
                    name: '',
                    description: ''
                }
            });
        }catch(error) {
            this.props.subCategoryFailed(error.response.data)
        }
    }

    render() {
        return (
            <div className="bg-white rounded border p-2 max-w-full">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Sub Category Name")}
                    {this.renderTextArea("description", "Sub Category Description", "3")}
                    <div className="flex justify-between">
                        {this.renderButton("CREATE SUB CATEGORY")}
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    subCategoryCreated: (subCategory) => dispatch({type: subCategoryCreated.type, payload: subCategory}),
    createSubCategory: () => dispatch({type: createSubCategoryRequested.type}),
    subCategoryFailed: (error) => dispatch({type: subCategoryCreationFailed.type, payload: error})
});

export default connect(null, mapDispatchToProps)(CreateSubCategory);