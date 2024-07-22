'use client';

import { dsvFormat, DSVRowString } from "d3-dsv";
import { useEffect, useState } from "react";
import { GeographyProps } from "react-simple-maps";

import Map from "@/components/map";
import Tooltip from "@/components/tooltip";

export default function Home() {
  const [foodData, setFoodData] = useState<DSVRowString>();
  const [hoveredState, setHoveredState] = useState('');

  useEffect(() => {
    fetch('data/data.csv').then((fileData) => {
      fileData.text().then((text) => {
        console.log(text);
        const data = dsvFormat('|').parse(text);
        let index = Math.floor(Math.random() * data.length);
        setFoodData(data[index]);
      });
    });
  }, []);
  
  const onStateClick = (geo: GeographyProps) => {
    console.log(foodData?.region);
    console.log(geo);
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {foodData &&
          <div className="flex flex-col justify-center text-center">
            <p className="text-4xl mb-4">{foodData.name}</p>
            <img src={"food/" + foodData.image} alt="" />
            <p className="text-lg my-4">{foodData.description}</p>
            {/* <p>{foodData.region} - {foodData.state}</p> */}
          </div>
        }
        <Tooltip content={hoveredState} child={
          <Map onStateClick={onStateClick} setHoveredState={setHoveredState} />
        } />
      </div>
    </main>
  );
}
