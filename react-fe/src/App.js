import React, { Component } from 'react';
import ButtonAppBar from './components/AppBar'
import Button from '@material-ui/core/Button';
import DataPage from './containers/DataPage'
import { AWS_AMPLIFY_CONFIG } from './constants';
import Amplify from 'aws-amplify';

Amplify.configure(AWS_AMPLIFY_CONFIG);

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <ButtonAppBar />
        <DataPage />
      </div>
    );
  }
}

export default App;
