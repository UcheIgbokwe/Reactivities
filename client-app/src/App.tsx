import React, {Component} from 'react';
import {Header, Icon, List} from 'semantic-ui-react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  }

  
  componentDidMount(){
    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        this.setState({
          values: [{id: 1, name: 'Uche Igbokwe'}, {id: 2, name: 'Imoh Odoro'}]
        })
      })
    
  }

  render() {
    return (
      <div >
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
        {this.state.values.map((value: any) => (
            <List key={value.id}>{value.name}</List>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
