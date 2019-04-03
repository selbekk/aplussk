import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useTrail } from 'react-spring';

const Star = ({ fill, ...rest }) => (
  <animated.svg viewBox="0 0 200 200" {...rest}>
    <polygon points="100,10 40,180 190,60 10,60 160,180" fill={fill} />
  </animated.svg>
);

const StyledStar = styled(Star)`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
`;
// The available colors of the stars
const colors = ['#FFDC00', '#FF851B', '#FF4136', '#85144b', '#F012BE'];

// This hook returns a list of colors, which are added to on every click
function useColorList() {
  const [colorList, setColorList] = useState(colors.slice(0, 3));
  useEffect(() => {
    const handleClick = e => {
      if (colorList.length === colors.length) {
        setColorList([colors[0]]);
      } else {
        setColorList([...colorList, colors[colorList.length]]);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  return colorList;
}

// This hook returns your mouse position
function useMousePosition() {
  const [xy, setXy] = useState([0, 0]);
  useEffect(() => {
    const handleMouseMove = e => setXy([e.clientX, e.clientY]);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });
  return xy;
}

export default function FancyCursor() {
  const colorList = useColorList();
  const xy = useMousePosition();
  const [springs, set] = useTrail(colorList.length, () => ({
    xy,
  }));
  const trans = (x, y) => `translate3d(${x}px, ${y}px, 0)`;

  useEffect(() => {
    set({ xy });
  }, [xy]);

  return (
    <>
      {springs.map((spring, index) => (
        <StyledStar
          key={index}
          style={{
            ...spring,
            transform: spring.xy.interpolate(trans),
            zIndex: colorList.length - index,
            fill: colorList[index],
          }}
        />
      ))}
    </>
  );
}
