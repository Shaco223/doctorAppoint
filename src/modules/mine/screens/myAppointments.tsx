/*
 * @Author: liuxiang
 * @Date: 2026-02-01 22:00:00
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 22:40:47
 * @Description: file content
 */
import React from 'react';
import { Text, Box, helpers, Flex, Toast, WhiteSpace } from '@td-design/react-native';
import { TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { selectAllAppointments, updateAppointment, Appointment } from '@/store/slices/appointSlice';


import TitleBar from '@/components/TitleBar/titleBar';
import { Container } from '@/components/Container';
import { Image } from 'expo-image';

const { px } = helpers;

export function MyAppointments() {
    const dispatch = useDispatch();
    const statusBarHeight = StatusBar.currentHeight;

    const appointments = useSelector((state: RootState) => selectAllAppointments(state));

    const handleCancelAppointment = (appointment: Appointment) => {
        dispatch(updateAppointment({
            ...appointment,
            status: 'cancel'
        }));
        Toast.middle({
            content: 'Appointment cancelled',
            duration: 2000,
        });
    };

    const styles = StyleSheet.create({
        appointmentCard: {
            padding: px(16),
            backgroundColor: '#fff',
            borderRadius: px(12),
            marginBottom: px(12),
        },
        statusBadge: {
            paddingHorizontal: px(12),
            paddingVertical: px(4),
            borderRadius: px(12),
        },
        imageIcon: {
            width: px(12),
            height: px(12),
            marginRight: px(8),
        },
        confirmBadge: {
            backgroundColor: '#e7eee0',
        },
        cancelBadge: {
            backgroundColor: '#e1c6c6',
        },
        cancelBtn: {
            borderWidth: 1,
            borderColor: '#FF4D4F',
            borderRadius: px(8),
            paddingVertical: px(8),
            alignItems: 'center',
            marginTop: px(16),
        }
    });

    const noData = (
        <Box style={{ alignItems: 'center', marginTop: px(100) }}>
            <Image
                source={require('@/assets/nodata.png')}
                style={{ width: px(120), height: px(120), marginBottom: px(16) }}
            />
            <Text style={{ fontSize: px(16), color: '#90909A' }}>
                No appointments
            </Text>
        </Box>
    );
    const Item = ({ appointment }: { appointment: Appointment }) => (

        <Box key={appointment.id} style={styles.appointmentCard}>
            <Flex justifyContent='space-between' marginBottom={'x2'}>
                <Text style={{ fontSize: px(18), fontWeight: '600', color: '#333' }}>
                    {appointment.doctorName}
                </Text>
                <Box style={[
                    styles.statusBadge,
                    appointment.status === 'confirm' ? styles.confirmBadge : styles.cancelBadge
                ]}>
                    <Text style={{
                        fontSize: px(12),
                        color: appointment.status === 'confirm' ? '#52C41A' : '#FF4D4F',
                        fontWeight: '500'
                    }}>
                        {appointment.status === 'confirm' ? 'Confirmed' : 'Canceled'}
                    </Text>
                </Box>
            </Flex>

            <Flex >
                <Image source={require('@/assets/calendar.png')} style={styles.imageIcon} ></Image>
                <Text style={{ fontSize: px(14), color: '#90909A' }}>
                    {appointment.appointmentDate}
                </Text>
            </Flex>

            <WhiteSpace size="x2" />
            <Flex justifyContent={'space-between'}>
                <Flex >
                    <Image source={require('@/assets/timeZone.png')} style={styles.imageIcon} ></Image>
                    <Text style={{ fontSize: px(14), color: '#90909A' }}>
                        {appointment.timeZone}
                    </Text>
                </Flex>
                <Flex >
                    <Image source={require('@/assets/time.png')} style={styles.imageIcon} ></Image>
                    <Text style={{ fontSize: px(14), color: '#90909A' }}>
                        {appointment.appointmentStartTime} - {appointment.appointmentEndTime}
                    </Text>
                </Flex>
            </Flex>
            {appointment.status === 'confirm' && (
                <TouchableOpacity
                    onPress={() => handleCancelAppointment(appointment)}
                    style={styles.cancelBtn}
                >
                    <Text style={{ color: '#FF4D4F', fontSize: px(14), fontWeight: '500' }}>
                        Cancel Appointment
                    </Text>
                </TouchableOpacity>
            )}
        </Box>
    );

    return (
        <Container inTab backgroundColor='#F6F7FA'>
            <Box style={{ zIndex: 999, paddingTop: statusBarHeight, backgroundColor: '#fff' }}>
                <TitleBar title='My Appointments' isTop></TitleBar>
            </Box>
            <FlatList
                contentContainerStyle={{ padding: px(16) }}
                data={appointments}
                renderItem={({ item }) => Item({ appointment: item })}
                ListEmptyComponent={noData}
            />
            
        </Container>
    );
}
