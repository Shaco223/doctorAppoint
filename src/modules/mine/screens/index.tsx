/*
 * @Author: liuxiang
 * @Date: 2024-11-19 16:17:48
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-02 02:07:02
 * @Description: file content
 */
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text, helpers, Avatar, Flex, WhiteSpace, WingBlank } from '@td-design/react-native'
import React, { useState } from 'react'
import { Container } from '@/components/Container';
import { Image } from 'expo-image';
import mineTopBg from '../assets/mineTopBg.png';
import Animated from 'react-native-reanimated';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { px } = helpers;

export function Mine() {
    const navigation = useNavigation<NavigationProp<AppParamList>>();
    const styles = StyleSheet.create({
        BoxStyle: {
            padding: px(16),
            backgroundColor: '#fff',
            borderRadius: px(12),
            marginBottom: px(12),
        },
        buttonText: {
            color: '#0F62FE',
            fontSize: px(16),
            lineHeight: px(24),
        },
        durText: {
            color: '#90909A',
            fontSize: px(16),
            lineHeight: px(24),
        },
        textWrap: {
            flexWrap: 'wrap',
            flex: 1
        }
    });

    return (
        <Container backgroundColor='#F5F5F5' inTab={true}>
            <Animated.ScrollView >
                <ImageBackground source={mineTopBg} style={{ width: '100%', height: px(290), paddingTop: px(46) }}>
                    <Flex height={px(48)} paddingLeft={'x4'} paddingRight={'x4'}>
                        <Flex flex={1} justifyContent={'flex-end'}>
                            <Image source={require('../../index/assets/kefu.png')} style={{ width: px(24), height: px(24) }} />
                            <Image source={require('../../index/assets/mail.png')} style={{ width: px(24), height: px(24), marginLeft: px(16), marginRight: px(16) }} />
                            <TouchableOpacity >
                                <Image source={require('../assets/setting.png')} style={{ width: px(24), height: px(24) }} />
                            </TouchableOpacity>
                        </Flex>
                    </Flex>
                    <WhiteSpace size="x4" />
                    <WingBlank size="x5">
                        <Flex gap={'x3'}>
                            <Avatar
                                size={px(52)}
                                url={require('../assets/Avatar.png')}
                            />
                            <Text fontSize={px(18)} fontWeight={'500'} color="black" lineHeight={px(30)}>Hello, Jack</Text>
                        </Flex>
                    </WingBlank>
                </ImageBackground>
                <WingBlank size="x3">
                    <Box style={[styles.BoxStyle, { marginTop: px(-80) }]}>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('MyAppointments');
                        }}>
                            <Flex gap={'x3'}>
                                <Image source={require('../assets/order.png')} style={{ width: px(24), height: px(24) }} />
                                <Text style={{ flex: 1 }} fontSize={px(16)} fontWeight={'500'} color="black" lineHeight={px(30)}>My appointments</Text>
                                <Image source={require('@/assets/right.png')} style={{ width: px(24), height: px(24) }} />
                            </Flex>
                        </TouchableOpacity>
                    </Box>
                </WingBlank>
            </Animated.ScrollView>
        </Container>
    )
}