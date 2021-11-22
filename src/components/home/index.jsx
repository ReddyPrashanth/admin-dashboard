import React from "react";
import NavBar from "./../shared/navbar";

class Home extends React.Component{
    state = {
        isOpen: false
    }

    handleDrawer = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeDrawer = () => [
        this.setState({
            isOpen: false
        })
    ]

    render() {
        return (
            <NavBar isOpen={this.state.isOpen} onToggleDrawer={this.handleDrawer} onCloseDrawer={this.closeDrawer}/>
        )
    }
}

export default Home;