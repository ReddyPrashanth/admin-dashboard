const ProfilePicture = ({user}) => {
    return (
        <div className="text-center w-1/3 p-4">
            <button className="bg-gray-200 rounded-full">
                <img className="object-cover rounded-full h-20 w-20" src="http://127.0.0.1:3001/users/avatar" alt="profile" />
            </button>
            <br />
            <br />
            <h4 className="font-semibold">{user.firstName} {user.lastName}</h4>
            <p className="text-sm align-middle font-thin">{user.email}</p>
        </div>
    )
}

export default ProfilePicture;