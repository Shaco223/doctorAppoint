import React, { Component } from 'react';
// eslint-disable-next-line no-restricted-syntax
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

import { helpers } from '@td-design/react-native';
import { Image } from 'expo-image';

import iconSuccess from './success.png';
import iconError from './success.png';
import iconLoading from './success.png';
import iconWarning from './success.png';
const { px } = helpers;

type StateType = {
    isVisible: boolean;
    icon: any;
    message: string;
};

type ParamsType = string | { message: string; duration?: number };
function getParams(data: ParamsType): { message: string; duration: number } {
    let msg!: string;
    let dur!: number;
    if (typeof data === 'string') {
        msg = data;
        dur = 2000;
    } else {
        msg = data.message;
        dur = data.duration != null ? data.duration : 2000;
    }
    return {
        message: msg,
        duration: dur,
    };
}

class ToastComponent extends Component<object | Readonly<object>, StateType> {
    timeout!: NodeJS.Timeout;
    rotate: Animated.Value = new Animated.Value(0);
    constructor(props: object | Readonly<object>) {
        super(props);
        this.state = {
            isVisible: false,
            icon: null,
            message: '',
        };
        Toast.setToastInstance(this);
    }
    showToast(icon: any, message: string, duration: number) {
        this.setState({
            isVisible: true,
            icon,
            message,
        });
        if (duration !== 0) {
            const timeout = setTimeout(() => {
                this.closeToast();
            }, duration);
            this.timeout = timeout;
        }
    }
    showRotate() {
        Animated.loop(
            Animated.timing(this.rotate, {
                toValue: 360,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    }
    closeToast() {
        this.setState({
            isVisible: false,
            icon: null,
            message: '',
        });
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    render() {
        const { isVisible, icon, message } = this.state;
        return isVisible ? (
            <View style={style.root}>
                <View style={[style.main]}>
                    {icon && (
                        <Image source={icon} style={{
                            width: px(24),
                            height: px(24),
                            marginBottom: px(8),
                        }}></Image>
                    )}
                    <Text style={style.tip}>{message}</Text>
                </View>
            </View>
        ) : null;
    }
}

const style = StyleSheet.create({
    root: {
        height: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        maxWidth: px(200),
        maxHeight: px(200),
        backgroundColor: '#00000099',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: px(16),
    },
    icon: {
        width: px(24),
        height: px(24),
        resizeMode: 'cover',
        marginBottom: px(8),
    },
    tip: {
        fontSize: px(14),
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


class Toast extends Component<object | Readonly<object>, object | Readonly<object>> {
    static toastInstance: ToastComponent;
    static show(data: ParamsType) {
        const { message, duration } = getParams(data);
        this.toastInstance.showToast(null, message, duration);
    }
    static loading(data: ParamsType) {
        const { message, duration } = getParams(data);
        this.toastInstance.showToast(iconLoading, message, duration);
        this.toastInstance.showRotate();
    }
    static success(data: ParamsType) {
        const { message, duration } = getParams(data);
        this.toastInstance.showToast(iconSuccess, message, duration);
    }
    static error(data: ParamsType) {
        const { message, duration } = getParams(data);
        this.toastInstance.showToast(iconError, message, duration);
    }
    static warning(data: ParamsType) {
        const { message, duration } = getParams(data);
        this.toastInstance.showToast(iconWarning, message, duration);
    }
    static clear() {
        if (this.toastInstance) {
            this.toastInstance.closeToast();
        }
    }
    static setToastInstance(toastInstance: ToastComponent) {
        this.toastInstance = toastInstance;
    }
    render() {
        return null;
    }
}

export { Toast, ToastComponent };