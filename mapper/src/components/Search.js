import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';


class Search extends Component {
    handleLoad() {
        window.ymaps.ready(() => {
            var suggestView = new window.ymaps.SuggestView('suggest');
        });
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }


    render() {
        return (
            <input type="text" id="suggest" />
        );
    }
}

export default Search;