import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useTrail } from 'react-spring';
import ErrorSwallower from './error-swallower';

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
// Made with https://hihayk.github.io/scale
const colors = [
  '#DCD2FE',
  '#D2B5FC',
  '#D399FA',
  '#DD7DF7',
  '#EE63F3',
  '#EE49D4',
  '#E830A9',
  '#CE2771',
  '#B31F42',
  '#97181B',
  '#7A2612',
];

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
  }, [colorList]);
  return colorList;
}

// This hook returns your mouse position
function useMousePosition() {
  const [xy, setXy] = useState([0, 0]);
  useEffect(() => {
    const handleMouseMove = e => setXy([e.pageX, e.pageY]);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });
  return xy;
}

function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize(); // Run after first mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return screenWidth;
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

  // Mobile and small devices just cause trouble, so let's skip them
  const screenWidth = useScreenWidth();
  if (screenWidth < 800) {
    return null;
  }

  return (
    <ErrorSwallower>
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
    </ErrorSwallower>
  );
}
