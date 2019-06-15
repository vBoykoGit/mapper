import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RoutePoint from './RoutePoint';
import { reorderArray } from '../otherFuncs/helpers';

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "white" : "white",
    padding: grid
});

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{ id: `1`, content: 'Якиманка' },
            { id: `2`, content: 'Якиманка1' },
            { id: `3`, content: 'Якиманка2' },
            { id: `4`, content: 'Якиманка3' },
            { id: `5`, content: 'Якиманка4' }]
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
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
                        {this.state.items.map((item, index) => (
                            <RoutePoint key={item.id} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    }
}

export default List;