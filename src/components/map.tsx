import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import states from "../../public/data/gz_2010_us_040_00_20m.json";
import { FeatureCollection } from "geojson";

const width = 700;
const height = 400;

const Map = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const projection = d3.geoMercator().scale(340).center([-100, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }

    const geoPathGenerator = d3
      .geoPath()
      .projection(projection)
      .context(context); // if a context is provided, geoPath() understands that we work with canvas, not SVG

    context.clearRect(0, 0, width, height);
    context.beginPath();

    geoPathGenerator(states as FeatureCollection);

    context.fillStyle = 'grey';
    context.fill();

    context.strokeStyle = 'lightGrey';
    context.lineWidth = 0.1;
    context.stroke();
  }, [projection]);

  return (
   <canvas ref={canvasRef} width={width} height={height}>

   </canvas>
  );
}

export default Map;