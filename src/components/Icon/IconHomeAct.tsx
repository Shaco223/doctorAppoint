/*
 * @Author: liuxiang
 * @Date: 2024-12-16 10:51:38
 * @LastEditors: liuxiang
 * @LastEditTime: 2024-12-16 10:53:29
 * @Description: file content
 */
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
<path d="M4.45001 7.5V17.5H16.95V7.5L10.7 2.5L4.45001 7.5Z" fill="#0F62FE" stroke="#0F62FE" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.61667 12.0833C9.06438 12.0833 8.61667 12.531 8.61667 13.0833V17.4999H12.7833V13.0833C12.7833 12.531 12.3356 12.0833 11.7833 12.0833H9.61667Z" fill="white" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
<path d="M4.45001 17.5H16.95" stroke="#0F62FE" stroke-width="1.2" stroke-linecap="round"/>
</svg>

`;



  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconWechat.defaultProps = {
  size: px(16),
};

IconWechat = React.memo ? React.memo(IconWechat) : IconWechat;

export default IconWechat;
