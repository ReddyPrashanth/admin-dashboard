import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../store/entities/auth';

class NavBar extends React.Component {

    state = {
        isOpen: false
    }

    handleDrawer = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeDrawer = () => {
        this.setState({
            isOpen: false
        })
    }

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const { isOpen } = this.state;
        const {authenticated} = this.props;
        const asideCl = "transform top-0 left-0 w-64 bg-gray-800 text-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30";
        const classes = isOpen ? `${asideCl} translate-x-0` : `${asideCl} -translate-x-full`;
        return (
            <header>
                <nav className="flex w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b-2 border-purple-700 z-10">
                    <div className="flex items-center">
                    <button className="mr-2" aria-label="Open Menu" onClick={this.handleDrawer}>
                        <svg 
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-8 h-8"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <Link to="/"><h4 className="h-auto font-bold"><span className="text-purple-600">ADMIN</span> DASHBOARD</h4></Link>
                </div>
                    <div>
                        {!authenticated && <Link to="/login" className="font-semibold text-sm hover:bg-gray-200 px-4 py-2 rounded">Sign In</Link>}
                        {authenticated &&<Link to="/signup" className="font-semibold text-sm hover:bg-gray-200 px-4 py-2 rounded">Sign Up</Link>}
                        {authenticated && <Link to="/home" onClick={this.handleLogout} className="font-semibold text-sm hover:bg-gray-200 px-4 py-2 rounded">Log Out</Link>}
                    </div>
                    <aside className={classes}>
                    <span className="flex w-full justify-between p-5">
                        <h4 className="h-auto font-bold">ADMIN DASHBOARD</h4>
                        <button onClick={this.handleDrawer}>X</button>
                    </span>
                    <span className="flex items-center px-5 py-3 hover:bg-gray-700">
                        <Link to="/" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>HOME</Link>
                    </span>
                    <span className="flex items-center px-5 py-3 hover:bg-gray-700">
                        <Link to="/users" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>USERS</Link>
                    </span>
                    <span className="flex items-center px-5 py-3 hover:bg-gray-700">
                        <Link to="/roles" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>ROLES</Link>
                    </span>
                    <span className="flex items-center px-5 py-3 hover:bg-gray-700">
                        <Link to="/permissions" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>PERMISSIONS</Link>
                    </span>
                </aside>
                </nav>
            </header>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

const mapStateToProps = (state) => ({
    authenticated: isAuthenticated(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);