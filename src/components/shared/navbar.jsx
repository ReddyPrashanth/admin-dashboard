import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ChevronDownIcon from '../../icons/ChevronDown';
import ChevronUpIcon from '../../icons/ChevronUp';
import { isAuthenticated, logout } from '../../store/entities/auth';

class NavBar extends React.Component {

    state = {
        isOpen: false,
        hide: {
            admin: true,
            products: true
        }
    }

    handleDrawer = () => {
        const newState = {...this.state};
        newState.isOpen = !this.state.isOpen;
        this.setState(newState);
    }

    closeDrawer = () => {
        const newState = {...this.state};
        newState.isOpen = false;
        this.setState(newState)
    }

    toggleMenu = (name) => {
        const menu = {...this.state.hide};
        menu[name] = !menu[name];
        this.setState({
            isOpen: this.state.isOpen,
            hide: menu
        });
    }

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const { isOpen, hide } = this.state;
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
                    <div>
                        <div className="flex items-center px-5 py-3 hover:bg-gray-700">
                            <span className="mr-4 text-sm font-semibold">ADMIN PANEL</span> 
                            <button onClick={() => this.toggleMenu('admin')} className="flex items-center">{hide.admin ? <ChevronUpIcon /> : <ChevronDownIcon />}</button>
                        </div>
                        {!hide.admin && <div>
                            <span className="flex items-center px-10 py-3 hover:bg-gray-700">
                                <Link to="/" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>HOME</Link>
                            </span>
                            <span className="flex items-center px-10 py-3 hover:bg-gray-700">
                                <Link to="/users" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>USERS</Link>
                            </span>
                            <span className="flex items-center px-10 py-3 hover:bg-gray-700">
                                <Link to="/roles" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>ROLES</Link>
                            </span>
                            <span className="flex items-center px-10 py-3 hover:bg-gray-700">
                                <Link to="/permissions" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>PERMISSIONS</Link>
                            </span>
                        </div>}
                        <div className="flex items-center px-5 py-3 hover:bg-gray-700">
                            <span className="mr-4 text-sm font-semibold">PRODUCTS PANEL</span> 
                            <button onClick={() => this.toggleMenu('products')} className="flex items-center">{hide.products ? <ChevronUpIcon /> : <ChevronDownIcon />}</button>
                        </div>
                        {!hide.products && <div>
                            <span className="flex items-center px-10 py-3 hover:bg-gray-700">
                                <Link to="/categories" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>CATEGORIES</Link>
                            </span>
                            <span className="flex items-center px-10 py-3 hover:bg-gray-700">
                                <Link to="/products" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>PRODUCTS</Link>
                            </span>
                            <span className="flex items-center px-10 py-3 hover:bg-gray-700">
                                <Link to="/products/create" className="mr-2 text-sm font-semibold" onClick={this.closeDrawer}>CREATE PRODUCT</Link>
                            </span>
                        </div>}
                    </div>
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