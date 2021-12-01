import React from 'react';
import { connect } from 'react-redux';
import { getColumns } from '../../store/entities/permissions';
import { attachPermissionsForARole, fetchAttachablePermissions, fetchRole, getAttachablePermissions, getRole } from '../../store/entities/roles';
import Table from "../shared/Table";
import AttachRoles from './AttachRoles';

class RoleDetails extends React.Component {
    state = {
        permissions: []
    }

    componentDidMount() {
        const {match} = this.props;
        this.props.fetchRole(Number.parseInt(match.params.id));
    }

    fetchPermissions = () => {
        const {match} = this.props;
        this.props.fetchAttachablePermissions(Number.parseInt(match.params.id));
    }

    handleCheckboxEvent = (event) => {
        const permId = Number.parseInt(event.target.value);
        const permissions = [...this.state.permissions, permId];
        this.setState({
            permissions
        });
    }

    attachPermissions = async () => {
        const {match} = this.props;
        if(this.state.permissions.length > 0) {
            await this.props.attachPermissionsForARole(match.params.id, this.state.permissions);
            this.props.fetchRole(Number.parseInt(match.params.id));
            this.setState({
                permissions: []
            })
        }
    }

    render() {
        const {columns, role, attachablePermissions} = this.props;
        return (
            <div>
                {role && <div>
                            <h4 className="font-semibold text-purple-600">List of permissions for <span className="uppercase">{role.name}</span> role</h4>
                            <p className="text-sm">{role.description}</p>
                            <br />
                            <div className="flex items-start">
                                <div className="w-2/3 mr-4">
                                    <Table columns={columns} items={role.permissions} name="permissions"/>
                                </div>
                                <div className="w-1/3 border rounded">
                                    <AttachRoles 
                                        permissions = {attachablePermissions} 
                                        role={role.name} 
                                        fetchPermissions={this.fetchPermissions} 
                                        onChecked={this.handleCheckboxEvent}
                                        onAttachPermissions={this.attachPermissions}/>
                                </div>
                            </div>
                        </div>}
                {!role && <span className="font-semibold text-red-500">Role you are looking for does not exist.</span>}
            </div>
        )
    }
}

const mapDispatchToprops = (dispatch) => ({
    fetchRole: (roleId) => dispatch(fetchRole(roleId)),
    fetchAttachablePermissions: (roleId) => dispatch(fetchAttachablePermissions(roleId)),
    attachPermissionsForARole: (roleId, permissions) => dispatch(attachPermissionsForARole(roleId, permissions)),
});

const mapStateToProps = (state) => ({
    role: getRole(state),
    columns: getColumns(state),
    attachablePermissions: getAttachablePermissions(state)
})

export default connect(mapStateToProps, mapDispatchToprops)(RoleDetails);