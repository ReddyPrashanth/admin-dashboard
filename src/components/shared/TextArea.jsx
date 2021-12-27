function TextArea({name, label, rows, error, ...rest}) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-bold text-gray-700">{label}</label>
            <textarea
                {...rest}
                id={name}
                name={name}
                rows={rows}
                className="border rounded px-2 py-1 w-full"/>
            {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
    )
}

export default TextArea;