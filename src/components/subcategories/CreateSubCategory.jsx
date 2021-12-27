import toast from 'react-hot-toast';
import Joi from 'joi';
import Form from "../shared/Form";
import http from '../../http/api';
import { connect } from "react-redux";
import { createSubCategoryRequested, subCategoryCreated, subCategoryCreationFailed, url } from "../../store/entities/subcategories";

class CreateSubCategory extends Form {
    state = {
        data: {
            name: '',
            description: ''
        },
        validationErrors: {}
    }

    schemaOptions = {
        name: Joi.string().required().label('Sub Category'),
        description: Joi.string().required().label('Sub Category Description')
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = async () => {
        const formData = {...this.state.data, categoryId: Number.parseInt(this.props.categoryId)};
        try{
            this.props.createSubCategory();
            const {data} = await http.post(url, formData, {withCredentials: true});
            this.props.subCategoryCreated(data);
            this.setState({
                data: {
                    name: '',
                    description: ''
                }
            });
            toast.success(`Sub category ${data.name} is created.`)
        }catch(error) {
            this.props.subCategoryFailed(error.response.data)
        }
    }

    render() {
        return (
            <div className="bg-white rounded border p-2 max-w-full">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    {this.renderInput("name", "Sub Category")}
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