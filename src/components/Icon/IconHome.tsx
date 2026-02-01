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

import { getIconColor } from './helper';

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
    <path d="M4.45001 7.5V17.5H16.95V7.5L10.7 2.5L4.45001 7.5Z" stroke="${getIconColor(
        color,
        1,
        '#999999'
      )}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.6167 12.0833C9.06441 12.0833 8.6167 12.531 8.6167 13.0833V17.4999H12.7834V13.0833C12.7834 12.531 12.3357 12.0833 11.7834 12.0833H9.6167Z" stroke="${getIconColor(
        color,
        1,
        '#999999'
      )}" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M4.45001 17.5H16.95" stroke="${getIconColor(
        color,
        1,
        '#999999'
      )}" stroke-width="1.2" stroke-linecap="round"/>
  </svg>
`;



  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconWechat.defaultProps = {
  size: px(16),
};

IconWechat = React.memo ? React.memo(IconWechat) : IconWechat;

export default IconWechat;
