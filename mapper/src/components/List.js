import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RoutePoint } from './RoutePoint';
import { connect } from "react-redux"
import { reorderPoints } from '../store/actions/routeActions';


const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "white" : "white",
    width: '100%'
});

class List extends Component {

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        this.props.onDropItem(result.source.index, result.destination.index)
    }

    render() {
        return <div className='pointsList'>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.points.map((item, index) => < RoutePoint key={index} item={item} index={index} />)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    }
}

const mapStateToProps = ({ route = {} }) => ({
    points: route.points
})

const mapDispatchToProps = dispatch => ({
    onDropItem(fromIndex, toIndex) {
        dispatch(reorderPoints(fromIndex, toIndex))
    }
})

const connectedList = connect(mapStateToProps, mapDispatchToProps)(List)
export { connectedList as List }