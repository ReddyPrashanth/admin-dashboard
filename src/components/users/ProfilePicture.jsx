import UserProfileIcon from "../../icons/UserProfile";

const ProfilePicture = ({user}) => {
    return (
        <div className="text-center w-1/3 p-4">
            <button className="p-8 bg-gray-200 rounded-full">
                <UserProfileIcon />
            </button>
            <br />
            <br />
            <h4 className="font-semibold">{user.firstName} {user.lastName}</h4>
            <p className="text-sm align-middle font-thin">{user.email}</p>
        </div>
    )
}

export default ProfilePicture;