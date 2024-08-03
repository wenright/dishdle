'use client';

import { csvParse, dsvFormat, DSVRowString } from "d3-dsv";
import { useEffect, useState } from "react";
import { GeographyProps, Line } from "react-simple-maps";

import Map from "@/components/map";
import Tooltip from "@/components/tooltip";
import { adjacencyList } from "./stateSearch";

export default function Home() {
  const [foodData, setFoodData] = useState<DSVRowString>();
  const [correctStates, setCorrectStates] = useState<Array<string>>([]);
  const [hoveredState, setHoveredState] = useState('');
  const [numGuesses, setNumGuesses] = useState(0);
  const [stateAdjacencyList, setStateAdjacencyList] = useState<adjacencyList>();

  useEffect(() => {
    fetch('data/data.csv').then((fileData) => {
      fileData.text().then((text) => {
        const data = dsvFormat('|').parse(text);
        let index = Math.floor(Math.random() * data.length);
        setFoodData(data[index]);

        setCorrectStates(data[index]?.state.split(',') ?? []);
      });
    });

    // Load state adjacency list
    fetch('data/states.csv').then((fileData) => {
      fileData.text().then((text) => {
        const data = text.split('\n');
        const map: adjacencyList = {};

        for (let i = 0; i < data.length; i++) {
          const row = data[i].split(',');
          const linkedStates = [];
          for (let j = 1; j < row.length; j++) {
            linkedStates.push(row[j]);
          }

          map[row[0]] = linkedStates;
        }

        setStateAdjacencyList(map);
      });
    });
  }, []);

  const makeGuess = (isCorrect: boolean) => {
    setNumGuesses(currentNum => currentNum+1);
  }
  
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24" style={{backgroundColor: '#011627'}}>
      <div>
        {foodData &&
          <div className="flex flex-col justify-center text-center">
            <p className="mb-4 text-4xl">{foodData.name}</p>
            <div className="flex flex-row">
              <div className="w-1/2 m-8">
                <p className="my-4 text-lg text-left">{foodData.description}</p>
                {/* <p>{foodData.region} - {foodData.state}</p> */}
              </div>
              <div className="flex content-center justify-center w-1/2 m-8">
                <img src={"food/" + foodData.image} alt="" className="object-contain" />
              </div>
            </div>
          </div>
        }
        <Tooltip content={hoveredState} child={
          <Map setHoveredState={setHoveredState} correctStates={correctStates} makeGuess={makeGuess} stateAdjacencyList={stateAdjacencyList} />
        } />
        <div>
          guesses: {numGuesses}
        </div>
      </div>
    </main>
  );
}
