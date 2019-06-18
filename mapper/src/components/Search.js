import React, { Component } from 'react';
import { suggestView } from '../otherFuncs/yandexMaps';
import { addPoint } from '../store/actions/routeActions';
import { connect } from "react-redux"

class Search extends Component {
    state = {
        tooltipText: ''
    }

    handleLoad = () => {
        window.ymaps.ready(() => suggestView('suggest', this.handleSelection))
    }

    handleSelection = ({ error, geoObject }) => {
        const { onSelection } = this.props
        this.setState({ tooltipText: '' })
        if (error) {
            this.setState({ tooltipText: error })
            return
        }
        onSelection(geoObject)
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    render() {
        return (
            <div className='searchBar tooltip'>
                <input className='searchBar' type="text" id="suggest" />
                {this.state.tooltipText !== '' ? <span className="tooltiptext" >{this.state.tooltipText}</span> : null}
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onSelection(point) {
        dispatch(addPoint(point))
    }
})

const connectedSearch = connect(null, mapDispatchToProps)(Search)
export { connectedSearch as Search }
