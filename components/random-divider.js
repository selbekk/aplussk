import React from 'react';
import styled from 'styled-components';

const randomDividerImages = [
  'https://www.fg-a.com/lines/1_line_misc_5d.gif',
  'https://www.fg-a.com/lines/1_line_misc_6d.gif',
  'https://www.fg-a.com/lines/color-flash-1.gif',
  'https://www.fg-a.com/lines/jumping-rope-1.gif',
  'https://www.fg-a.com/lines/star-left-right-center.gif',
  'https://www.fg-a.com/lines/black-silver-animated-line.gif',
  'https://www.fg-a.com/lines/1_line_misc_7.gif',
  'https://www.fg-a.com/lines/1_line_misc_9x.gif',
  'https://www.fg-a.com/lines/2-yellow-lights-animated.gif',
  'https://www.fg-a.com/lines/3-tiny-bubbles.gif',
];

const Spacer = styled.div`
  margin: 16px 0;
`;

class RandomDivider extends React.Component {
  image =
    randomDividerImages[Math.floor(Math.random() * randomDividerImages.length)];
  render() {
    return (
      <Spacer>
        <img src={this.image} role="presentation" />
      </Spacer>
    );
  }
}

export default RandomDivider;
