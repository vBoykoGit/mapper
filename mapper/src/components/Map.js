import React from 'react';
import ObjectsList from './ObjectsList';
import '../styles/style.scss';

class Map extends React.Component {

    handleLoad() {
        window.ymaps.ready(() => {
            this.localMap = new window.ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 15,
                controls: ['zoomControl', 'geolocationControl', 'default']
            });
        });
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
        script.async = true;

        document.body.appendChild(script);
        window.addEventListener('load', this.handleLoad);
    }

    // componentWillUnmount() {
    //   this.$el.somePlugin('destroy');
    // }

    render() {
        return <div className='right' id="map"> </div>
    }
}

export default Map;