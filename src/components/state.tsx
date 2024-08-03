import { Geography, GeographyProps } from "react-simple-maps"
import { useEffect, useState } from "react";

import stateNameToAbbreviation from "@/app/stateNameToAbbreviation";
import getDistance, { adjacencyList } from "@/app/stateSearch";

const DEFAULT_COLOR = "#fdfffc";
const CORRECT_COLOR = "#41ead4";
const INCORRECT_COLOR = "#ff0022";
const HIGHLIGHTED_COLOR = "#A5ADA2";

interface StateProps {
  geo: any
  setHoveredState: (state: string) => void
  makeGuess: (isCorrect: boolean) => void
  correctStates: Array<string>
  stateAdjacencyList: adjacencyList | undefined
}

const State = ({ geo, setHoveredState, correctStates, makeGuess, stateAdjacencyList }: StateProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [fill, setFill] = useState(DEFAULT_COLOR);
  const [distance, setDistance] = useState<number>();
  
  const handleClick = (geo: any) => () => {
    console.log(geo);
    
    if (isSelected) {
      console.log('Tried to select the same state twice');
      return;
    }

    if (!stateAdjacencyList) {
      console.error('Tried to search before state adjacency list loaded');
      return;
    }
    
    setIsSelected(true);

    const isCorrect = correctStates.includes(geo.NAME);
    
    if (isCorrect) {
      setFill(CORRECT_COLOR);
    } else {
      setFill(INCORRECT_COLOR);

      let minDepth = Infinity;
      let minState = '';
      for (const state of correctStates) {
        const guessAbbreviation = stateNameToAbbreviation(geo.NAME);
        const corrrectAbbreviation = stateNameToAbbreviation(state);
        console.log(stateAdjacencyList);
        const depth = getDistance(stateAdjacencyList, guessAbbreviation, corrrectAbbreviation);
        if (depth < minDepth) {
          minDepth = depth;
          minState = state;
        }
      }

      setDistance(minDepth);
    }

    makeGuess(isCorrect);
  };
  
  const handleHover = (geo: any) => () => {
    if (!isSelected) {
      setFill(HIGHLIGHTED_COLOR);  
    }

    setHoveredState(geo.NAME);
  };

  const handleExit = (geo: any) => () => {
    if (!isSelected) {
      setFill(DEFAULT_COLOR);
    }
    
    setHoveredState('');
  };
  
  return (
    <>
      <Geography key={geo.rsmKey} geography={geo}
        onMouseDown={handleClick(geo.properties)}
        onMouseEnter={handleHover(geo.properties)}
        onMouseLeave={handleExit(geo.properties)}
        className="cursor-pointer"
        fill={fill}
        stroke="#011627" />
      <p>{distance}</p>
    </>
  );
}

export default State;