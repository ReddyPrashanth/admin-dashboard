function TextArea({name, label, rows, ...rest}) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-bold mb-1 text-gray-700">{label}</label>
            <textarea
                {...rest}
                id={name}
                name={name}
                rows={rows}
                className="border rounded px-2 py-1 w-full"/>
        </div>
    )
}

export default TextArea;