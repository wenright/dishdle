import states from "../../public/data/gz_2010_us_040_00_20m.json";
import { ComposableMap, Geographies, Geography, GeographyProps } from "react-simple-maps"
import State from "./state";

interface MapProps {
  setHoveredState: (state: string) => void
  makeGuess: (isCorrect: boolean) => void
  correctStates: Array<string>
}

const Map = ({setHoveredState, correctStates, makeGuess}: MapProps) => {  
  return (
    <div className="">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          rotate: [90.0, 0, 0],
          center: [-8, 30],
          scale: 1000,
        }}>
        <Geographies geography={states}>
          {({ geographies }: { geographies: any}) =>
            geographies.map((geo: any) => (
              <State key={geo.rsmKey} geo={geo} setHoveredState={setHoveredState} correctStates={correctStates} makeGuess={makeGuess} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default Map;