/*
 * @Author: liuxiang
 * @Date: 2024-12-16 10:51:38
 * @LastEditors: liuxiang
 * @LastEditTime: 2024-12-16 11:09:24
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
<path d="M10.0999 18.3334C14.7023 18.3334 18.4333 14.6025 18.4333 10.0001C18.4333 5.39771 14.7023 1.66675 10.0999 1.66675C5.49756 1.66675 1.7666 5.39771 1.7666 10.0001C1.7666 14.6025 5.49756 18.3334 10.0999 18.3334Z" fill="#0F62FE" stroke="#0F62FE" stroke-width="1.2" stroke-linejoin="round"/>
<path d="M12.4569 9.41073L10.6891 7.64297C10.3637 7.31753 9.83603 7.31753 9.5106 7.64297L7.74283 9.41073C7.41739 9.73617 7.41739 10.2638 7.74283 10.5892L9.5106 12.357C9.83603 12.6824 10.3637 12.6824 10.6891 12.357L12.4569 10.5892C12.7823 10.2638 12.7823 9.73617 12.4569 9.41073Z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
</svg>
`;



  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconWechat.defaultProps = {
  size: px(16),
};

IconWechat = React.memo ? React.memo(IconWechat) : IconWechat;

export default IconWechat;
