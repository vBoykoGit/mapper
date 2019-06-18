import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RoutePoint } from './RoutePoint';
import { reorderArray } from '../otherFuncs/helpers';
import { connect } from "react-redux"

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "white" : "white",
    padding: grid
});

class List extends Component {

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorderArray(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
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
                        {this.props.points.map((item, index) => < RoutePoint key={item.id} item={item} index={index} />)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    }
}

const mapStateToProps = ({ route = {} }) => ({
    points: route.points.map((item, index) => ({ id: index, content: item.getAddressLine() }))
})

const mapDispatchToProps = dispatch => ({
    onSelection(point) {
        // dispatch(addPoint(point))
    }
})

const connectedList = connect(mapStateToProps, mapDispatchToProps)(List)
export { connectedList as List }