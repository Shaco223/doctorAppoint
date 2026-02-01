/*
 * @Author: liuxiang
 * @Date: 2026-02-01 02:13:42
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 23:32:03
 * @Description: file content
 */
import React, { useState, useEffect } from 'react';
import { Text, Box, helpers, Flex, Button, WingBlank, useTheme, Theme, Toast } from '@td-design/react-native';
import { TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';

import TitleBar from '@/components/TitleBar/titleBar';
import { Container } from '@/components/Container';
import { Image } from 'expo-image';
import { NavigationProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
const { px } = helpers;
import DatePickerModal from '@/components/DatePickerModal';
import dayjs from 'dayjs';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectAppointmentsByStatus, Appointment } from '@/store/slices/appointSlice';



export function DoctorDetail() {
    const navigation = useNavigation<NavigationProp<AppParamList>>();
    const statusBarHeight = StatusBar.currentHeight;

    const theme = useTheme<Theme>();
    const [title, setTitle] = useState<string>('');
    const [timezone, setTimezone] = useState<string>('');
    const [infoArray, setInfoArray] = useState<Array<DoctorObj>>([]);
    const [appointListMap, setAppointListMap] = useState<Map<string, TimeObj[]>>(new Map());
    const [appointList, setAppointList] = useState<TimeObj[]>([]);
    const [dateVisible, setDateVisible] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const appointments = useSelector((state: RootState) => selectAppointmentsByStatus(state, 'confirm'));



    const route = useRoute();
    useEffect(() => {
        const params = route.params as { detail?: DoctorGroupObj };
        if (params?.detail) {
            //console.log(params.detail);
            setTitle(params.detail.name);
            setTimezone(params.detail.timezone);
            setInfoArray(params.detail.infoArray);
            params.detail.infoArray.forEach((item) => {
                if (!appointListMap.has(item.day_of_week)) {
                    appointListMap.set(item.day_of_week, getAppointList(item.available_at, item.available_until));

                } else {
                    appointListMap.set(item.day_of_week, [...appointListMap.get(item.day_of_week)!, ...getAppointList(item.available_at, item.available_until)]);

                }
                setAppointListMap(new Map(appointListMap));

            });

            console.log(appointListMap);

        }
    }, [route.params])

    useEffect(() => {
        if (infoArray.length > 0) {
            changeSelectedDate(dayjs().format('YYYY-MM-DD'));
        }
    }, [appointListMap]);

    const timeToMinute = (time: string) => {
        let timeMatch = time.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
        if (!timeMatch) {
            return 0;
        }
        let [, hours, minutes, period] = timeMatch;

        if (period === 'PM' && hours !== '12') {
            hours = (parseInt(hours) + 12).toString();
        }
        console.log(timeMatch);

        return parseInt(hours) * 60 + parseInt(minutes);
    }

    const minuteToTime = (minute: number) => {
        let hour = Math.floor(minute / 60) % 12;
        if (hour === 0 && Math.floor(minute / 60) >= 12) {
            hour = 12;
        }
        const minuteStr = minute % 60 < 10 ? `0${minute % 60}` : `${minute % 60}`;

        return `${hour}:${minuteStr}${Math.floor(minute / 60) >= 12 ? 'PM' : 'AM'}`;
    }

    const getAppointList = (available_at: string, available_until: string) => {
        let startTime = timeToMinute(available_at);
        let endTime = timeToMinute(available_until);
        let appointArr: Array<TimeObj> = [];
        for (let i = startTime; i < endTime; i += 30) {
            appointArr.push({
                startTime: minuteToTime(i),
                endTime: minuteToTime(i + 30),
                status: true,
            });
        }
        return appointArr;
    }

    const changeSelectedDate = (date: string) => {
        console.log(date);
        if (dayjs(date).isBefore(dayjs().format('YYYY-MM-DD'))) {
            Toast.middle({
                content: 'Please select a date after today',
                duration: 2000,
            });
            return;
        }
        setSelectedDate(date);
        setSelectedIndex(-1);

        if (!appointListMap.has(dayjs(date).format('dddd'))) {
            setAppointList([]);
        } else {
            let filteredAppointList = appointments.filter((item: Appointment) => item.doctorName === title && item.appointmentDate === date);
            console.log(filteredAppointList);

            if (filteredAppointList.length > 0) {
                const newAppointList: TimeObj[] = appointListMap.get(dayjs(date).format('dddd'))!.map((item: TimeObj) => {
                    const newItem = { ...item };
                    filteredAppointList.forEach((appoint: Appointment) => {
                        if (appoint.appointmentStartTime === item.startTime) {
                            newItem.status = false;
                        }
                    });
                    return newItem;
                });
                setAppointList(newAppointList);
            } else {
                setAppointList(appointListMap.get(dayjs(date).format('dddd'))!);
            }
        }
    }

    const onPressBookAppoint = () => {
        const filteredDoctorAppointList = appointments.filter((item: Appointment) => item.doctorName === title);

        if (filteredDoctorAppointList.length > 0) {
            Toast.middle({
                content: 'You have already made an appointment with this doctor',
                duration: 2000,
            });
            return;
        }

        const filteredTimeAppointList = appointments.filter((item: Appointment) => item.appointmentDate === selectedDate && item.appointmentStartTime === appointList[selectedIndex].startTime);

        if (filteredTimeAppointList.length > 0) {
            Toast.middle({
                content: 'You have already made an appointment with this time',
                duration: 2000,
            });
            return;
        }


        navigation.navigate('SubmitAppoint', {
            detail: {
                doctorName: title,
                timezone: timezone,
                date: selectedDate,
                startTime: appointList[selectedIndex].startTime,
                endTime: appointList[selectedIndex].endTime,
            }
        });
    }



    const styles = StyleSheet.create({
        BoxStyle: {
            padding: px(16),
            backgroundColor: '#fff',
            borderRadius: px(12),
            marginBottom: px(12),
        },
        textWrap: {
            flexWrap: 'wrap',
            flex: 1
        },
        selectedBox: {
            backgroundColor: '#0F62FE',
        },
        disabledBox: {
            backgroundColor: '#999999',
        },
    });


    return (
        <Container inTab backgroundColor='#F6F7FA'>
            <Box style={{ zIndex: 999, paddingTop: statusBarHeight, backgroundColor: '#fff' }}>
                <TitleBar title={title} isTop></TitleBar>
            </Box>
            <ScrollView
                scrollEventThrottle={16}
                contentContainerStyle={{ flexGrow: 1, paddingTop: px(16) }}
            >
                <WingBlank size="x4">
                    <Box width="100%" style={{ padding: px(16), backgroundColor: '#fff', borderRadius: px(12), marginBottom: px(12) }}>
                        <Flex>
                            <Image source={require('@/assets/doctor.png')} style={{ width: px(60), height: px(60), marginRight: px(16) }} />
                            <Box style={{ flex: 1 }}>
                                <Text style={[styles.textWrap, { fontSize: px(16), color: theme.colors.text, fontWeight: '500', marginBottom: px(8) }]}>Name: {title}</Text>
                                <Text style={[styles.textWrap, {
                                    fontSize: px(14), color: theme.colors.text,
                                }]}>Schedule: {[...new Set(infoArray.map((item) => item.day_of_week))].join(', ')}</Text>
                            </Box>
                        </Flex>
                    </Box>
                    <Box width="100%" style={styles.BoxStyle}>
                        <Text style={[styles.textWrap, { fontSize: px(16), color: '#f30d18', fontWeight: '500' }]}>Timezone: {timezone}</Text>
                    </Box>
                    <Flex style={styles.BoxStyle}>
                        <Text style={[styles.textWrap, { fontSize: px(14), color: theme.colors.text, fontWeight: '500' }]}>Appointment date:</Text>
                        <TouchableOpacity onPress={() => setDateVisible(true)}>
                            <Text style={[styles.textWrap, { fontSize: px(14), color: '#1986d9', fontWeight: '500', textAlign: 'right' }]}>{dayjs(selectedDate).format('YYYY-MM-DD')}({dayjs(selectedDate).format('dddd')})</Text>
                        </TouchableOpacity>
                    </Flex>
                    {appointList.length > 0 ? <Flex flexWrap={'wrap'} justifyContent={'space-between'}>
                        {appointList.map((item, index) => (
                            <TouchableOpacity disabled={!item.status} style={{ width: '48%' }} key={index} onPress={() => {
                                if (!item.status) {
                                    return;
                                }
                                setSelectedIndex(index);
                            }}>
                                <Box style={[{ height: px(32), backgroundColor: '#E8E8E8', borderRadius: px(8), marginBottom: px(8) }, selectedIndex === index && styles.selectedBox, !item.status && styles.disabledBox]}>
                                    <Text style={{ fontSize: px(14), lineHeight: px(32), color: selectedIndex === index ? '#fff' : '#333', fontWeight: '500', textAlign: 'center' }}>{item.startTime} - {item.endTime}</Text>
                                </Box>
                            </TouchableOpacity>
                        ))}
                    </Flex> : <Text style={[styles.textWrap, { fontSize: px(14), color: theme.colors.text, fontWeight: '500', textAlign: 'center' }]}>No available time</Text>}
                </WingBlank>
            </ScrollView>
            <Box style={{ padding: px(16), backgroundColor: '#fff' }}>
                <Button
                    disabled={selectedIndex === -1}
                    style={{ backgroundColor: selectedIndex === -1 ? '#E8E8E8' : '#0F62FE', borderRadius: px(8) }}
                    title="Book Appointment"
                    onPress={onPressBookAppoint}
                ></Button>
            </Box>

            <DatePickerModal
                visible={dateVisible}
                title="Select Date"
                onClose={() => setDateVisible(false)}
                onConfirm={(date) => changeSelectedDate(date)}
            />
        </Container>
    );


}