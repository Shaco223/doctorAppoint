/*
 * @Author: liuxiang
 * @Date: 2024-12-16 10:51:38
 * @LastEditors: liuxiang
 * @LastEditTime: 2025-01-02 10:17:18
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
<path d="M1.50269 6.65564H19.5001" stroke="#616161" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5271 13.5975H15.5765" stroke="#616161" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="1.5" y="2.79907" width="17.9949" height="14.4005" rx="1" stroke="#616161" stroke-width="1.2"/>
</svg>

`;



  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconWechat.defaultProps = {
  size: px(16),
};

IconWechat = React.memo ? React.memo(IconWechat) : IconWechat;

export default IconWechat;
