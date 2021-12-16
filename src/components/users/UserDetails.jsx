const UserDetails = ({user}) => {
    return (
        <div className="m-2 p-4 border rounded space-y-2">
            <h4 className="font-semibold text-purple-500 text-lg">General Information</h4>
            <div className="flex items-center">
                <p className="w-1/3 font-medium">Name</p>
                <p className="w-2/3 font-light">{user.firstName} {user.lastName}</p>
            </div>
            <div className="flex items-center">
                <p className="w-1/3 font-medium">Email</p>
                <p className="w-2/3 font-light">{user.email}</p>
            </div>
            <div className="flex items-center">
                <p className="w-1/3 font-medium">Gender</p>
                <p className="w-2/3 font-light">{user.gender}</p>
            </div>
            <div className="flex items-center">
                <p className="w-1/3 font-medium">Address1</p>
                <p className="w-2/3 font-light">{user.address.address1}</p>
            </div>
            <div className="flex items-center">
                <p className="w-1/3 font-medium">Address2</p>
                <p className="w-2/3 font-light">{user.address.address2}</p>
            </div>
            <div className="flex items-center">
                <p className="w-1/3 font-medium">City</p>
                <p className="w-2/3 font-light">{user.address.city}</p>
            </div>
            <div className="flex items-center">
                <p className="w-1/3 font-medium">State</p>
                <p className="w-2/3 font-light">{user.address.state}</p>
            </div>
            <div className="flex items-center">
                <p className="w-1/3 font-medium">Mobile</p>
                <p className="w-2/3 font-light">{user.address.phone}</p>
            </div>
        </div>
    )
}

export default UserDetails;