/* tslint:disable */

/* eslint-disable */
import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

import { helpers } from '@td-design/react-native';


const { px } = helpers;

export interface SvgIconProps extends GProps, ViewProps {
  size?: number;
  width?: number | string;
  height?: number | string;
  color?: string | string[];
}

let IconWechat: FC<SvgIconProps> = ({ size, width = size, height = size, color, ...rest }) => {
  const xml = `
<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.68633 3.77364C4.741 3.33627 5.11279 3.00806 5.55358 3.00806H16.2463C16.6871 3.00806 17.0589 3.33627 17.1136 3.77364L18.6431 16.0095C18.7083 16.5311 18.3015 16.9919 17.7758 16.9919H4.02408C3.49838 16.9919 3.09164 16.5311 3.15684 16.0095L4.68633 3.77364Z" fill="#0F62FE" stroke="#0F62FE" stroke-width="1.2" stroke-linejoin="round"/>
<path d="M6.96698 7.37793C6.96698 7.37793 7.84097 9.12591 10.8999 9.12591C13.9589 9.12591 14.8329 7.37793 14.8329 7.37793" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;



  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconWechat.defaultProps = {
  size: px(16),
};

IconWechat = React.memo ? React.memo(IconWechat) : IconWechat;

export default IconWechat;
