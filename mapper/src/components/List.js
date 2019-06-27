import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RoutePoint } from './RoutePoint';
import { connect } from "react-redux"
import { reorderPoints } from '../store/actions/routeActions';

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "white" : "white",
    padding: grid
});

class List extends Component {

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        this.props.onDropItem(result.source.index, result.destination.index)
    }

    render() {
        return <DragDropContext onDragEnd={this.onDragEnd}>
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