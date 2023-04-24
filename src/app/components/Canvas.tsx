import React, { useEffect } from 'react';
import p5 from 'p5';

function Canvas(props: sketchProps) {
  useEffect(() => {
    // Create a new p5.js instance with the following settings
    const sketch = new p5((p) => {
      // Set up the canvas with an ID of "myCanvas"
      const canvas = p.createCanvas(400, 400).parent('myCanvas');

      // Set up the sketch in the setup() function
      p.setup = () => {
        p.rectMode(p.CENTER);
      };

      // Draw in the draw() function
      p.draw = () => {
        p.background(255);
        p.fill(245);
        for (let i = 0; i < props.inputVal; i++) {
          p.push();
          p.translate(canvas.width / 2, canvas.height / 2);
          p.rect(10 * i, 0, 50, 50);
          p.pop();
        }
      };
    });

    // Clean up the p5.js instance when the component unmounts
    return () => {
      sketch.remove();
    };
  }, [props.inputVal]);

  return (
    <div>
      {/* Add a container with an ID of "myCanvas" for the canvas to be created in */}
      <div id="myCanvas"></div>
    </div>
  );
}

export default Canvas;

export interface sketchProps {
  inputVal: number;
}
