/*
 * @Author: liuxiang
 * @Date: 2026-02-01 02:13:42
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-02 09:39:31
 * @Description: file content
 */
import React, { useState, useEffect } from 'react';
import { Text, Box, helpers, Flex, Button, WingBlank, Toast } from '@td-design/react-native';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';

import TitleBar from '@/components/TitleBar/titleBar';
import { Container } from '@/components/Container';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { addAppointment, Appointment } from '@/store/slices/appointSlice';
const { px } = helpers;


export function SubmitAppoint() {
    const navigation = useNavigation<NavigationProp<AppParamList>>();
    const dispatch = useDispatch();
    const statusBarHeight = StatusBar.currentHeight;

    const [doctorName, setDoctorName] = useState<string>('');
    const [timezone, setTimezone] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');


    const route = useRoute();
    useEffect(() => {
        const params = route.params as { detail?: SubmitAppointObj };
        if (params?.detail) {
            setDoctorName(params.detail.doctorName);
            setTimezone(params.detail.timezone);
            setDate(params.detail.date);
            setStartTime(params.detail.startTime);
            setEndTime(params.detail.endTime);
        }
    }, [route.params]);

    const handleConfirm = () => {
        if (!doctorName || !date || !startTime || !endTime) {
            Toast.middle({
                content: 'Please complete all information',
                duration: 2000,
            });
            return;
        }

        const newAppointment: Appointment = {
            id: Date.now().toString(),
            doctorName,
            timeZone: timezone,
            appointmentDate: date,
            appointmentStartTime: startTime,
            appointmentEndTime: endTime,
            status: 'confirm',
        };

        dispatch(addAppointment(newAppointment));

        Toast.middle({
            content: 'Appointment confirmed successfully!',
            duration: 2000,
        });

        setTimeout(() => {
            navigation.navigate('Tab');
        }, 1000);
    };

    const styles = StyleSheet.create({
        BoxStyle: {
            padding: px(16),
            backgroundColor: '#fff',
            borderRadius: px(12),
            marginBottom: px(12),
        },
        textTitle: {
            fontSize: px(16),
            lineHeight: px(24),
            fontWeight: '500',
            color: '#333',
        }
    });


    return (
        <Container inTab backgroundColor='#F6F7FA'>
            <Box style={{ zIndex: 999, paddingTop: statusBarHeight, backgroundColor: '#fff' }}>
                <TitleBar title='Submit Appointment' isTop></TitleBar>
            </Box>
            <ScrollView
                scrollEventThrottle={16}
                contentContainerStyle={{ flexGrow: 1, paddingTop: px(16) }}
            >
                <WingBlank size="x4">
                    <Box style={styles.BoxStyle}>
                        <Flex marginBottom={'x2'} justifyContent={'space-between'}>
                            <Text style={styles.textTitle}>Doctor: </Text>
                            <Text style={{ color: '#0F62FE', fontSize: px(16), lineHeight: px(24), fontWeight: '500' }}>
                                {doctorName}
                            </Text>
                        </Flex>
                        <Flex marginBottom={'x2'} justifyContent={'space-between'}>
                            <Text style={styles.textTitle}>Timezone: </Text>
                            <Text style={{ color: '#90909A', fontSize: px(16), lineHeight: px(24) }}>
                                {timezone}
                            </Text>
                        </Flex>
                        <Flex justifyContent={'space-between'}>
                            <Text style={styles.textTitle}>Date: </Text>
                            <Text style={{ color: '#90909A', fontSize: px(16), lineHeight: px(24) }}>
                                {date} {startTime} - {endTime}
                            </Text>
                        </Flex>
                    </Box>
                </WingBlank>
            </ScrollView>
            <Box style={{ padding: px(16), backgroundColor: '#fff' }}>
                <Button
                    style={{ backgroundColor: '#0F62FE', borderRadius: px(8) }}
                    title="Confirm"
                    onPress={handleConfirm}
                ></Button>
            </Box>
        </Container>
    );


}