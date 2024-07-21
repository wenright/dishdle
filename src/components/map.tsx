import states from "../../public/data/gz_2010_us_040_00_20m.json";
import { ComposableMap, Geographies, Geography, GeographyProps } from "react-simple-maps"

const Map = (props: { onStateClick: (geo: GeographyProps) => void }) => {
  const handleHover = (geo: GeographyProps) => () => {

  };

  const handleExit = (geo: GeographyProps) => () => {
    
  };

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
              <Geography key={geo.rsmKey} geography={geo}
                onClick={() => props.onStateClick(geo.properties)}
                onMouseEnter={handleHover(geo.properties)}
                onMouseLeave={handleExit(geo.properties)}
                className="cursor-pointer"
                style={{
                  default: {
                    fill: "#1f5673",
                    stroke: "#759fbc"
                  },
                  hover: {
                    fill: "#759fbc",
                    stroke: "#759fbc"
                  },
                  pressed: {
                    fill: "#90c3c8",
                    stroke: "#1f5673"
                  },
                }} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default Map;