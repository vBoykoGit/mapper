import React from 'react';
import ObjectsList from './ObjectsList';
import '../styles/style.scss';
import { createMap } from '../otherFuncs/yandexMaps';

class Map extends React.Component {

    handleLoad() {
        window.ymaps.ready(() => createMap('yandexMap'));
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://api-maps.yandex.ru/2.1/?apikey=efa426fb-e798-4c50-9b39-aef5e39578ad&lang=ru_RU";
        script.async = true;

        document.body.appendChild(script);
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
    }

    render() {
        return <div className='right' id="yandexMap"> </div>
    }
}

export default Map;