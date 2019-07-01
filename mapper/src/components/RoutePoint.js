import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux"
import { moveMapTo, removePoint } from '../store/actions/mapActions';

const getItemStyle = (isDragging, draggableStyle) => ({
    width: '100%',
    background: isDragging ? "lightgrey" : "white",
    // margin: '0.5rem',
    ...draggableStyle
})

const RoutePoint = ({ item, index, onClose, onHover }) =>
    <Draggable style={{ width: '100%' }} draggableId={`${index}`} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                )}
                onMouseEnter={() => onHover(item)}
            >
                <div className='routePoint'>
                    {item.properties.get('text')}
                    <div className='closeButton' onClick={() => onClose(item)}>✖</div>
                </div>
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