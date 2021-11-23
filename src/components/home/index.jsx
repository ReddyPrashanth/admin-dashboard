import React from "react";

class Home extends React.Component{
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

    render() {
        return (
            <div>
                Home Page
            </div>
        )
    }
}

export default Home;