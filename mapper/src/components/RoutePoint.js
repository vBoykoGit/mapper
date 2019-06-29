import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux"
import { moveMapTo, removePoint } from '../store/actions/mapActions';

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "lightgrey" : "white",
    ...draggableStyle
})

const RoutePoint = ({ item, index, onClose, onHover }) =>
    <Draggable draggableId={`${index}`} index={index}>
        {(provided, snapshot) => (
            <div
                className='routePoint'
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                )}
                onMouseEnter={() => onHover(item)}
            >
                {item.properties.get('text')}
                <button onClick={() => onClose(item)}>✖</button>
            </div>
        )}
    </Draggable>

const mapDispatchToProps = dispatch => ({
    onClose(item) {
        dispatch(removePoint(item))
    },
    onHover(item) {
        dispatch(moveMapTo(item))
    }
})

const connectedRoutePoint = connect(null, mapDispatchToProps)(RoutePoint)
export { connectedRoutePoint as RoutePoint }