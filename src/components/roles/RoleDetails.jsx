import React from 'react';
import { connect } from 'react-redux';
import { getColumns } from '../../store/entities/permissions';
import { fetchRole, getRole } from '../../store/entities/roles';
import Table from "../shared/Table";

class RoleDetails extends React.Component {
    componentDidMount() {
        const {match} = this.props;
        this.props.fetchRole(Number.parseInt(match.params.id));
    }

    render() {
        const {columns, role} = this.props;
        console.log(role);
        return (
            <div>
                {role && <div className="w-2/3 mr-4">
                            <h4 className="font-semibold text-purple-600">List of permissions for <span className="uppercase">{role.name}</span> role</h4>
                            <p className="text-sm">{role.description}</p>
                            <br />
                            <Table columns={columns} items={role.permissions} name="permissions"/>
                        </div>}
                {!role && <span className="font-semibold text-red-500">Role you are looking for does not exist.</span>}
            </div>
        )
    }
}

const mapDispatchToprops = (dispatch) => ({
    fetchRole: (roleId) => dispatch(fetchRole(roleId))
});

const mapStateToProps = (state) => ({
    role: getRole(state),
    columns: getColumns(state)
})

export default connect(mapStateToProps, mapDispatchToprops)(RoleDetails);