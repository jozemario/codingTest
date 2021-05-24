import React, { Component } from 'react';

import { UserList } from './userlist'
import { DisplayBoard } from './DisplayBoard'
import CreateUser from './CreateUser'
import { getAllUsers, createUser } from '../services/UserService'



type Props = {
    children: React.ReactNode
}

const connect = function (Component: React.FC): React.FC<Props> {
    const ComponentWrapper = function (props: Props): JSX.Element {
        return <UserManager {...props} />;
    };

    return ComponentWrapper;
};



class UserManager extends Component {

  state = {
    user: {email:'',name:'',password:''},
    users: [],
    numberOfUsers: 0
  }

  createUser = (e) => {
      createUser(this.state.user)
        .then(response => {
          console.log(response);
          this.setState({numberOfUsers: this.state.numberOfUsers + 1})
      });
  }

  getAllUsers = () => {
    getAllUsers()
      .then(users => {
        console.log(users)
        this.setState({users: users, numberOfUsers: users.length})
      });
  }

  onChangeForm = (e) => {
      let user = this.state.user
      if (e.target.name === 'name') {
          user.email = e.target.value;
      } else if (e.target.name === 'lastname') {
          user.password = e.target.value;
      } else if (e.target.name === 'email') {
          user.email = e.target.value;
      }
      this.setState({user})
  }

  render() {
    
    return (
      <div className="App">
        
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
                <CreateUser 
                  user={this.state.user}
                  onChangeForm={this.onChangeForm}
                  createUser={this.createUser}
                  >
                </CreateUser>
            </div>
            <div className="col-md-4">
                <DisplayBoard
                  numberOfUsers={this.state.numberOfUsers}
                  getAllUsers={this.getAllUsers}
                >
                </DisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">
          <UserList users={this.state.users}></UserList>
        </div>
      </div>
    );
  }
}



//export default UserManager;