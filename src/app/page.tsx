'use client';

import Image from "next/image";
import { dsvFormat, DSVRowString } from "d3-dsv";
import { useEffect, useState } from "react";

import Map from "@/components/map";

export default function Home() {
  const [foodData, setFoodData] = useState<DSVRowString>();

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
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {foodData &&
          <div className="">
            <h1>{foodData.name}</h1>
            <p>{foodData.description}</p>
            <p>{foodData.region} - {foodData.state}</p>
          </div>
        }
        <Map />
      </div>
    </main>
  );
}
