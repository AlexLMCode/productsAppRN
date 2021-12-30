import React from 'react';
import {View} from 'react-native';

interface Props {
  deviceWidth: number;
  deviceHeight: number;
}

export const Background = ({deviceWidth, deviceHeight}: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#5856D6',
        top: -95,
        width: deviceWidth + 200,
        height: deviceHeight + 200,
        transform: [
          {
            rotate: '-30deg',
          },
        ],
      }}
    />
  );
};
