import React from 'react';
import Draggable from 'react-draggable';

const DraggableComponent = () => {
  return (
    <Draggable>
      <div style={styles}>
        Drag me around!
      </div>
    </Draggable>
  );
};

const styles = {
  width: '200px',
  height: '100px',
  backgroundColor: 'lightblue',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  cursor: 'grab',
};

export default DraggableComponent;
