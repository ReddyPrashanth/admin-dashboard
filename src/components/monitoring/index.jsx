import React from 'react';
import ListServices from './ListServices';
import http from '../../http/api';
import CreateService from './CreateService';


class ServiceMonitoring extends React.Component {
    state = {
        services: []
    }

    async componentDidMount() {
        await this.healthCheck();
    }

    healthCheck = async () => {
        try{
            const {data} = await http.get('/monitoring', {withCredentials: true});
            this.setState({
                services: data.data
            })
        }catch(error) {
            alert('Cannot connect to api gateway');
        }
    }

    addService = (service) => {
        const services = [...this.state.services];
        services.push(service);
        this.setState({
            ...this.state,
            services
        })
    }

    render() {
        const { services } = this.state;
        return (
            <div className="flex items-start">
                <ListServices services={services} healthCheck={this.healthCheck}/>
                <CreateService addService={this.addService}/>
            </div>
        )
    }
}

export default ServiceMonitoring;