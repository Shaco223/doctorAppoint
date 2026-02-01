/* tslint:disable */

/* eslint-disable */
import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

import IconMobile from './IconMobile';
import IconPassTab from './IconPassTab';
import IconPassword from './IconPassword';
import IconQq from './IconQq';
import IconSms from './IconSms';
import IconSmsTab from './IconSmsTab';
import IconUser from './IconUser';
import IconWarning from './IconWarning';
import IconWechat from './IconWechat';
import IconLife from './IconLife';
import IconLifeAct from './IconLifeAct';
import IconHome from './IconHome';
import IconHomeAct from './IconHomeAct';
import IconMy from './IconMy';
import IconMyAct from './IconMyAct';
import IconMoney from './IconMoney';
import IconMoneyAct from './IconMoneyAct';
import IconCard from './IconCard';
import IconCardAct from './IconCardAct';

export type IconNames = 'mobile' | 'passTab' | 'password' | 'qq' | 'sms' | 'smsTab' | 'user' | 'warning' | 'wechat' | 'life' | 'lifeAct'
| 'home' | 'homeAct' | 'my' | 'myAct' | 'money' | 'moneyAct' | 'card' | 'cardAct';

export interface SvgIconProps extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  width?: number | string;
  height?: number | string;
  color?: string | string[];
}

let SvgIcon: FC<SvgIconProps> = ({ name, ...rest }) => {
  switch (name) {
    case 'mobile':
      return <IconMobile {...rest} />;
    case 'passTab':
      return <IconPassTab {...rest} />;
    case 'password':
      return <IconPassword {...rest} />;
    case 'qq':
      return <IconQq {...rest} />;
    case 'sms':
      return <IconSms {...rest} />;
    case 'smsTab':
      return <IconSmsTab {...rest} />;
    case 'user':
      return <IconUser {...rest} />;
    case 'warning':
      return <IconWarning {...rest} />;
    case 'wechat':
      return <IconWechat {...rest} />;
    case 'life':
      return <IconLife {...rest} />;
    case 'lifeAct':
      return <IconLifeAct {...rest} />;
    case 'home':
      return <IconHome {...rest} />;
    case 'homeAct':
      return <IconHomeAct {...rest} />;
    case 'my':
      return <IconMy {...rest} />;
    case 'myAct':
      return <IconMyAct {...rest} />;
    case 'money':
      return <IconMoney {...rest} />;
    case 'moneyAct':
      return <IconMoneyAct {...rest} />;
    case 'card':
      return <IconCard {...rest} />;
    case 'cardAct':
      return <IconCardAct {...rest} />;

    default:
      return null;
  }
};

SvgIcon = React.memo ? React.memo(SvgIcon) : SvgIcon;

export default SvgIcon;
