import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const DraggableCards = () => {
  const [positions, setPositions] = useState({
    card1: { x: 0, y: 0, locked: false },
    card2: { x: 0, y: 0, locked: false },
    card3: { x: 0, y: 0, locked: false },
  });

  // Load positions from localStorage when the component mounts
  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem('cardPositions'));
    if (savedPositions) {
      setPositions(savedPositions);
    }
  }, []);

  // Function to handle drag stop and start the 1-minute timer
  const handleDragStop = (e, data, cardKey) => {
    if (!positions[cardKey].locked) {
      const newPositions = {
        ...positions,
        [cardKey]: { ...positions[cardKey], x: data.x, y: data.y },
      };
      setPositions(newPositions);
      localStorage.setItem('cardPositions', JSON.stringify(newPositions));

      // Start the timer to lock the position after 1 minute (60000 ms)
      setTimeout(() => {
        const updatedPositions = {
          ...newPositions,
          [cardKey]: { ...newPositions[cardKey], locked: true },
        };
        setPositions(updatedPositions);
        localStorage.setItem('cardPositions', JSON.stringify(updatedPositions));
      }, 60000); // 60 seconds
    }
  };

  return (
    <div>
      {/* First Draggable Card */}
      <Draggable
        position={{ x: positions.card1.x, y: positions.card1.y }}
        disabled={positions.card1.locked} // Disable dragging if locked
        onStop={(e, data) => handleDragStop(e, data, 'card1')}
      >
        <div className="box_shadow_box flex flex-col p-2 items-center justify-center lg:w-96 cursor-move">
          <h1 className="text-center font-bold text-2xl my-2 text-gray-600">Business Banking Summary</h1>
        </div>
      </Draggable>

      {/* Second Draggable Card */}
      <Draggable
        position={{ x: positions.card2.x, y: positions.card2.y }}
        disabled={positions.card2.locked}
        onStop={(e, data) => handleDragStop(e, data, 'card2')}
      >
        <div className="txn_summary box_shadow_box p-2 flex-1 cursor-move">
          <h1 className="font-bold text-2xl my-2 text-gray-600">Transaction Summary</h1>
        </div>
      </Draggable>

      {/* Third Draggable Card */}
      <Draggable
        position={{ x: positions.card3.x, y: positions.card3.y }}
        disabled={positions.card3.locked}
        onStop={(e, data) => handleDragStop(e, data, 'card3')}
      >
        <div className="box_shadow flex-1 card shadow-md p-2 rounded-sm cursor-move">
          <h1 className="font-bold text-2xl my-2 text-gray-600 text-nowrap px-5">New Launch</h1>
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableCards;
