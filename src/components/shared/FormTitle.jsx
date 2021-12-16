const FormTitle = ({children, classes = ''}) => {
    return (
        <h3 className={`text-sm font-semibold text-purple-700 mr-2 ${classes}`}>{children}</h3>
    )
}

export default FormTitle;