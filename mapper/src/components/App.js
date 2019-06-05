import React from 'react';
import ObjectsList from './ObjectsList';
import Map from './Map';
import '../styles/style.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className='app'>
          <ObjectsList />
          <Map />
        </div >
      </div>
    );
  }
}

export default App;
