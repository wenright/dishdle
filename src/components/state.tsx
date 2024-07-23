import { Geography, GeographyProps } from "react-simple-maps"
import { useState } from "react";

const DEFAULT_COLOR = "#fdfffc";
const CORRECT_COLOR = "#41ead4";
const INCORRECT_COLOR = "#ff0022";
const HIGHLIGHTED_COLOR = "#A5ADA2";

interface StateProps {
  geo: any
  setHoveredState: (state: string) => void
  makeGuess: (isCorrect: boolean) => void
  correctStates: Array<string>
}

const State = ({ geo, setHoveredState, correctStates, makeGuess }: StateProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [fill, setFill] = useState(DEFAULT_COLOR);
  
  const handleClick = (geo: any) => () => {
    console.log(geo);
    
    if (isSelected) {
      console.log('Tried to select the same state twice');
      return;
    }
    
    setIsSelected(true);

    const isCorrect = correctStates.includes(geo.NAME);
    
    if (isCorrect) {
      setFill(CORRECT_COLOR);
    } else {
      setFill(INCORRECT_COLOR);
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
    </>
  );
}

export default State;