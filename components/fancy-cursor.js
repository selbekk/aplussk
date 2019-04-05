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
    const handleMouseMove = e => setXy([e.clientX, e.clientY]);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });
  return xy;
}

// Shamelessly stolen from StackOverflow
// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
function useTouchDeviceDetection() {
  const [isTouchDevice, setTouchDevice] = useState(true);
  useEffect(() => {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = query => window.matchMedia(query).matches;

    if (
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    ) {
      return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(
      '',
    );
    setTouchDevice(mq(query));
  }, []);
  return isTouchDevice;
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

  // Touch devices just cause trouble, so let's skip them
  const isTouchDevice = useTouchDeviceDetection();
  if (isTouchDevice) {
    return null;
  }

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
