// https://medium.com/@rkprasad.info/how-to-creating-a-cursor-anchored-tooltip-in-react-js-83593c5d17d2

import React, { useState, useRef, ReactNode, useEffect } from "react";

interface Props {
  content: string,
  child: ReactNode
}

const Tooltip = (props: Props) => {
  const [isTooltipVisible, setTooltipVisible] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const tooltipRef = useRef<HTMLDivElement|null>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    
    setTooltipPosition({ x: clientX + 12, y: clientY + 12 });
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    tooltipRef.current = document.createElement('div');
  }, []);

  return (
    <div
      className="min-w-min"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isTooltipVisible && !!props.content && (
        <div
          ref={tooltipRef}
          className={`fixed p-3.5 bg-black text-white rounded-lg shadow text-sm font-semibold max-w-md}`}
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            zIndex: '2147483647'
          }}
        >
          {props.content}
        </div>
      )}
      {props.child}
    </div>
  );
};



export default Tooltip;