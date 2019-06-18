import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux"
import { deletePoint } from '../store/actions/routeActions';

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "lightgrey" : "white",
    ...draggableStyle
})

const RoutePoint = ({ item, index, onClose }) =>
    <Draggable draggableId={`${item.id}`} index={index}>
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
            >
                {item.content}
                <button onClick={() => onClose(item)}>✖</button>
            </div>
        )}
    </Draggable>

const mapDispatchToProps = dispatch => ({
    onClose(item) {
        dispatch(deletePoint(item.id))
    }
})

const connectedRoutePoint = connect(null, mapDispatchToProps)(RoutePoint)
export { connectedRoutePoint as RoutePoint }