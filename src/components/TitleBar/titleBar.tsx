/*
 * @Author: liuxiang
 * @Date: 2024-12-17 15:23:59
 * @LastEditors: cuihuifen
 * @LastEditTime: 2025-08-05 16:51:32
 * @Description: file content
 */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Flex, helpers, SvgIcon } from '@td-design/react-native';
import { Image } from 'expo-image';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
const { px } = helpers;

export default function TitleBar({ isTop = true, title = '转账', rightIcon=null ,color='#242424'}: { isTop?: boolean, title?: string, rightIcon?: any, color?: string }) {
    const navigation = useNavigation<NavigationProp<AppParamList>>();
    return (
        <Flex paddingLeft={isTop ? 'x4' : 'x3'} paddingRight={isTop ? 'x4' : 'x3'} alignItems={'center'} style={{ width: '100%', height: px(44) }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <SvgIcon name="left" color={color} size={24} />
            </TouchableOpacity>
            <Text fontSize={px(18)} style={{
                color: color,
                textAlign: 'center',
                flex: 1,
                lineHeight: px(26),
                fontWeight: '500',
            }}>{title}</Text>
            {rightIcon ? rightIcon : 
            (color=='#242424'?<Image source={require('./assets/kefu.png')} style={{ width: px(24), height: px(24) }} />:<Image source={require('./assets/kefu-white.png')} style={{ width: px(24), height: px(24) }} />)}
        </Flex>
    )
}
// 添加 prop 类型验证
TitleBar.propTypes = {
    isTop: PropTypes.bool,
    title: PropTypes.string,
    rightIcon: PropTypes.any,
    color: PropTypes.string,
};

// 设置默认值
TitleBar.defaultProps = {
    isTop: true,
    title: '转账',
    rightIcon: null,
    color:'#242424'
};