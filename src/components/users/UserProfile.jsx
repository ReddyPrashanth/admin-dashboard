import React from 'react';
import { connect } from 'react-redux';
import { getUser, userSelected } from '../../store/users';
import ProfilePicture from './ProfilePicture';
import SocialMedia from './SocialMedia';
import UserDetails from './UserDetails';

class UserProfile extends React.Component {
    componentDidMount() {
        const {match} = this.props;
        this.props.userSelected(Number.parseInt(match.params.id));
    }

    render() {
        const {user} = this.props;
        let content;
        if(user) {
            content = <div className="flex items-center">
                <ProfilePicture user={user}/> 
                <div className="w-1/3 mr-2">
                    <UserDetails user={user}/>
                    <SocialMedia user={user}/>
                </div>
            </div>
        } else{
            content = <div>No user found.</div>
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    userSelected: (id) => dispatch(userSelected(id)),
});

const mapStateToProps = (state) => ({
    user: getUser(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);