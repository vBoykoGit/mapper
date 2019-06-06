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
            <div className='searchBar'>
                <input className='searchBar' type="text" id="suggest" />
            </div >
        );
    }
}

export default Search;