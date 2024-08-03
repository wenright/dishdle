'use client';

import { dsvFormat, DSVRowString } from "d3-dsv";
import { useEffect, useState } from "react";
import Image from 'next/image';

import Map from "@/components/map";
import Tooltip from "@/components/tooltip";
import { adjacencyList } from "./stateSearch";

export default function Home() {
  const [foodData, setFoodData] = useState<DSVRowString>();
  const [correctStates, setCorrectStates] = useState<Array<string>>([]);
  const [hoveredState, setHoveredState] = useState('');
  const [numGuesses, setNumGuesses] = useState(0);
  const [stateAdjacencyList, setStateAdjacencyList] = useState<adjacencyList>();
  const [hasGuessedCorrectly, setHasGuessedCorrectly] = useState(false);

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

    setHasGuessedCorrectly(isCorrect);
  }
  
  return (
    <main className="flex flex-col items-center justify-between min-h-screen md:p-24" style={{ backgroundColor: '#313638'}}>
      <div>
        {foodData &&
          <div className="flex flex-col justify-center text-center">
            <p className="mb-12 mt-8 md:mb-4 text-4xl">{foodData.name}</p>
            <div className="flex flex-col-reverse md:flex-row items-center">
              <div className="md:w-1/2 m-2 md:m-8">
                <p className="my-4 text-lg align-center md:text-left">{foodData.description}</p>
              </div>
              <div className="flex content-center justify-center md:w-1/2 m-2 md:m-8">
                <Image src={"/food/" + foodData.image} alt="" className="object-contain" width={300} height={300} />
              </div>
            </div>
          </div>
        }
        <Tooltip content={hoveredState} child={
          <Map setHoveredState={setHoveredState} correctStates={correctStates} makeGuess={makeGuess} stateAdjacencyList={stateAdjacencyList} />
        } />
        {hasGuessedCorrectly &&
          <div className="fixed bg-[#c7dcd0] h-16 flex content-center justify-center items-center bottom-0 left-0 right-0">
            <button className="border-2 border-[#2e222f] rounded text-[#313638] hover:bg-[#2e222f] hover:text-[#c7dcd0] w-24 h-8" onClick={() => window.location.reload()}>Play again</button>
          </div>
        }
      </div>
    </main>
  );
}
