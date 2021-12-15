function Input({name, label, ...rest}) {
    return (
        <div className="mb-2">
            <label htmlFor={name} className="block text-sm font-bold mb-1 text-gray-700">{label}</label>
            <input
                {...rest}
                id={name}
                name={name}
                className="border rounded px-2 py-1 w-full"/>
        </div>
    )
}

export default Input;