import React, {Component} from 'react';
import UserItem from './user_item';
import { getRandomUsers } from '../../User';

import SearchBar from '../search_bar'; 

export class UserList extends Component {

    constructor(props){
      super(props);
      this.state = {
          fetching: true,
          selectedUser: null  
        };
    }

    filterNames(e) {
        console.log(this.state.users)
        this.setState({users: this.state.users.filter(item => item.name.first.toLowerCase().includes(e.target.value.toLowerCase()))})
    }

    componentWillMount() {
    
      getRandomUsers(56)
        .then( data => {
          this.setState({
            users: data,
            fetching: false
          });
        });
    }
  
    renderUserItems() {
      return this.state.users.map((user, index) => {
        const first = user.name.first;
        const last = user.name.last;
        return (
         <UserItem
            key={first+last+index}
            title={user.name.title}
            firstName={first}
            lastName={last}
            thumbnail={user.picture.thumbnail}
            user={user}/>
        );
      });
    }
    render () {
        if(this.state.fetching){
            return (
                <div>
                    <h2>Loading....</h2>
                </div>
            )
        }

        return (
            <div className="header">
                <SearchBar  onSearchTermChange={(e) => this.filterNames(e)}/>
                <div className="ajust-items">
                    {this.renderUserItems()}
                </div>
            </div>
        );
    }
}