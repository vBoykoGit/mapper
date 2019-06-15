import React, { Component } from 'react';
import { suggestView } from '../otherFuncs/yandexMaps';

class Search extends Component {
    state = {
        tooltipText: ''
    }

    handleLoad = () => {
        window.ymaps.ready(() => suggestView('suggest', this.handleSelection))
    }

    handleSelection = ({ error, object }) => {
        this.setState({ tooltipText: '' })
        if (error) {
            this.setState({ tooltipText: error })
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    render() {
        return (
            <div className='searchBar tooltip'>
                <input className='searchBar' type="text" id="suggest" />
                {this.state.tooltipText !== '' ? <span className="tooltiptext">{this.state.tooltipText}</span> : null}
            </div >
        );
    }
}

export default Search;