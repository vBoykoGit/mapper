import React, { Component } from 'react';
import '../styles/style.scss';

class Map extends React.Component {
  // componentDidMount() {
  //   var myMap = new ymaps.Map("map", {
  //     // Координаты центра карты.
  //     // Порядок по умолчанию: «широта, долгота».
  //     // Чтобы не определять координаты центра карты вручную,
  //     // воспользуйтесь инструментом Определение координат.
  //     center: [55.76, 37.64],
  //     // Уровень масштабирования. Допустимые значения:
  //     // от 0 (весь мир) до 19.
  //     zoom: 7
  // });
  // }

  // componentWillUnmount() {
  //   this.$el.somePlugin('destroy');
  // }

  render() {
    // return <div ref={el => this.el = el} />;
    return <div className='app'>
      <div className='left' > 1 </div>
      <div className='right'> 2 </div>
    </div >
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
