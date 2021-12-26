function Select({name, label, options, ...rest}) {
    return (
        <div className="mb-2">
            <label htmlFor={name} className="block text-sm font-bold mb-1 text-gray-700">{label}</label>
            <select
                {...rest}
                id={name}
                name={name}
                className="border rounded px-2 py-1 w-full">
                {options.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
        </div>
    )
}

export default Select;