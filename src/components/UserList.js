import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.profession}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm mx-1" 
                  onClick={() => onEdit(user)}
                  data-toggle="tooltip" 
                  data-placement="top" 
                  title="Edit User"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="btn btn-danger btn-sm mx-1" 
                  onClick={() => onDelete(user._id)}
                  data-toggle="tooltip" 
                  data-placement="top" 
                  title="Delete User"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
