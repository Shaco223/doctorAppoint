/*
 * @Author: liuxiang
 * @Date: 2024-12-16 10:51:38
 * @LastEditors: liuxiang
 * @LastEditTime: 2024-12-16 11:06:32
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
<circle cx="10.3" cy="6" r="4" fill="#0F62FE"/>
<path d="M3.30005 14L10.3 12L17.3 14V17H3.30005V14Z" fill="#0F62FE"/>
<path d="M14.675 6.25C14.675 8.66625 12.7163 10.625 10.3 10.625C7.8838 10.625 5.92505 8.66625 5.92505 6.25C5.92505 3.83375 7.8838 1.875 10.3 1.875C12.7163 1.875 14.675 3.83375 14.675 6.25ZM13.425 6.25C13.425 4.52411 12.0259 3.125 10.3 3.125C8.57416 3.125 7.17505 4.52411 7.17505 6.25C7.17505 7.97589 8.57416 9.375 10.3 9.375C12.0259 9.375 13.425 7.97589 13.425 6.25Z" fill="#0F62FE"/>
<path d="M17.754 13.566C18.1713 13.7653 18.425 14.1933 18.425 14.6558V17.5C18.425 17.8452 18.1452 18.125 17.8 18.125H2.80005C2.45487 18.125 2.17505 17.8452 2.17505 17.5V14.6558C2.17505 14.1933 2.42882 13.7653 2.84613 13.566C5.1118 12.4838 7.63319 11.875 10.3 11.875C12.9669 11.875 15.4883 12.4838 17.754 13.566ZM10.3 13.125C7.8418 13.125 5.51798 13.6822 3.42505 14.6748V16.875H17.175V14.6748C15.0821 13.6822 12.7583 13.125 10.3 13.125Z" fill="#0F62FE"/>
</svg>

`;



  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconWechat.defaultProps = {
  size: px(16),
};

IconWechat = React.memo ? React.memo(IconWechat) : IconWechat;

export default IconWechat;
