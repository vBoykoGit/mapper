import React from 'react';
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "lightgrey" : "white",
    ...draggableStyle
})

const RoutePoint = ({ item, index }) =>
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
                <button>✖</button>
            </div>
        )}
    </Draggable>

export default RoutePoint;