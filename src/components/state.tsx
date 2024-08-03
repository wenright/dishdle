import { useState } from "react";
import { Geography, Marker } from "react-simple-maps"
// import { geoCentroid } from "d3-geo";

import stateNameToAbbreviation from "@/app/stateNameToAbbreviation";
import getDistance, { adjacencyList } from "@/app/stateSearch";

const DEFAULT_COLOR = "#ab947a";
const HIGHLIGHTED_COLOR = "#9babb2";
const CORRECT_COLOR = "#1ebc73";
const INCORRECT_COLORs = ["#fbff86", "#f68181", "#b33831"];

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
      let minDepth = Infinity;
      let minState = '';
      for (const state of correctStates) {
        const guessAbbreviation = stateNameToAbbreviation(geo.NAME);
        const corrrectAbbreviation = stateNameToAbbreviation(state);

        const depth = getDistance(stateAdjacencyList, guessAbbreviation, corrrectAbbreviation);
        if (depth < minDepth) {
          minDepth = depth;
          minState = state;
        }
      }

      setDistance(minDepth);
      let colorIndex = Math.min(minDepth, INCORRECT_COLORs.length);
      setFill(INCORRECT_COLORs[colorIndex - 1]);

      console.log(colorIndex);
    }

    makeGuess(isCorrect);
    
    console.log(correctStates);
    console.log(geo.NAME);
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

  // TODO fix bug in react-simple-maps
  // const centroid = geoCentroid(geo);
  
  return (
    <g key={geo.rsmKey}>
      <Geography geography={geo}
        onMouseDown={handleClick(geo.properties)}
        onMouseEnter={handleHover(geo.properties)}
        onMouseLeave={handleExit(geo.properties)}
        className="cursor-pointer"
        fill={fill}
        stroke="#011627" />
      {/* TODO a bug in react-simple-maps prevents this from working */}
      {/* <Marker coordinates={centroid} fill="#777">
        <text textAnchor="middle" fill="#F53">
          {distance}
        </text>
      </Marker> */}
    </g>
  );
}

export default State;