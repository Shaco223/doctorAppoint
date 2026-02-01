/*
 * @File name: DatePickerModal.tsx
 * @Author: 
 * @Version: 1.0
 * @Date: 2025-12-04
 * @Description: 单日期选择弹窗
 */
import React, { useState, useRef } from 'react';
import { Modal, TouchableOpacity, Animated, FlatList } from 'react-native';
import { Text, Flex, helpers, Box } from '@td-design/react-native';
import dayjs from 'dayjs';

const { px } = helpers;

const ITEM_HEIGHT = px(52);

interface DatePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (date: string) => void;
    title?: string;
    defaultDate?: string; // 默认日期
}

interface DatePickerColumnProps {
    data: { label: string; value: number }[];
    selectedValue: number;
    onValueChange: (value: number) => void;
}

// 日期选择列组件
function DatePickerColumn({ data, selectedValue, onValueChange }: DatePickerColumnProps) {
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    React.useEffect(() => {
        const selectedIndex = data.findIndex(item => item.value === selectedValue);
        if (selectedIndex > -1) {
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({
                    offset: selectedIndex * ITEM_HEIGHT,
                    animated: true
                });
            }, 100);
        }
    }, [selectedValue, data]);

    const renderItem = ({ item, index }: { item: { label: string; value: number }; index: number }) => {
        const inputRange = [
            (index - 2) * ITEM_HEIGHT,
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
            (index + 2) * ITEM_HEIGHT,
        ];

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 0.6, 1, 0.6, 0.3],
            extrapolate: 'clamp',
        });

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.85, 0.92, 1, 0.92, 0.85],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity
                style={{
                    height: ITEM_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    onValueChange(item.value);
                    flatListRef.current?.scrollToOffset({
                        offset: index * ITEM_HEIGHT,
                        animated: true
                    });
                }}
            >
                <Animated.Text
                    style={{
                        fontSize: px(16),
                        opacity,
                        transform: [{ scale }],
                        color: item.value === selectedValue ? '#242424' : '#90909A',
                        fontWeight: item.value === selectedValue ? '500' : '400',
                    }}
                >
                    {item.label}
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    return (
        <Animated.FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.value.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{
                paddingTop: ITEM_HEIGHT * 2,
                paddingBottom: ITEM_HEIGHT * 2,
            }}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                const index = Math.round(offsetY / ITEM_HEIGHT);
                if (index >= 0 && index < data.length) {
                    onValueChange(data[index].value);
                }
            }}
            getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
        />
    );
}

export default function DatePickerModal({ visible, onClose, onConfirm, title = '请选择日期', defaultDate }: DatePickerModalProps) {
    // 初始化日期
    const initDate = defaultDate ? dayjs(defaultDate) : dayjs();
    const [selectedYear, setSelectedYear] = useState(initDate.year());
    const [selectedMonth, setSelectedMonth] = useState(initDate.month() + 1);
    const [selectedDay, setSelectedDay] = useState(initDate.date());

    // 生成年份列表（当前年份前后各5年）
    const currentYear = dayjs().year();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
    
    // 生成月份列表
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // 根据年份和月份计算该月的天数
    const getDaysInMonth = (year: number, month: number) => {
        return dayjs(`${year}-${month}-01`).daysInMonth();
    };

    // 生成日期列表 - 根据选中的年月动态生成
    const days = Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => i + 1);

    // 当年份或月份改变时，检查并调整日期
    const handleYearChange = (year: number) => {
        setSelectedYear(year);
        const maxDay = getDaysInMonth(year, selectedMonth);
        if (selectedDay > maxDay) {
            setSelectedDay(maxDay);
        }
    };

    const handleMonthChange = (month: number) => {
        setSelectedMonth(month);
        const maxDay = getDaysInMonth(selectedYear, month);
        if (selectedDay > maxDay) {
            setSelectedDay(maxDay);
        }
    };

    const handleConfirm = () => {
        const date = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
        onConfirm(date);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                    <Box style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: px(12),
                        borderTopRightRadius: px(12),
                        paddingBottom: px(34),
                        overflow: 'hidden',
                    }}>
                        {/* 头部 */}
                        <Flex justifyContent='space-between' alignItems='center' style={{ paddingTop: px(12), paddingBottom: px(16), paddingHorizontal: px(16) }}>
                            <TouchableOpacity onPress={onClose}>
                                <Text fontSize={px(16)} style={{ color: '#90909A', lineHeight: px(26) }}>Cancel</Text>
                            </TouchableOpacity>
                            <Text fontSize={px(18)} fontWeight='500' style={{ color: '#242424', lineHeight: px(26) }}>
                                {title}
                            </Text>
                            <TouchableOpacity onPress={handleConfirm}>
                                <Text fontSize={px(16)} style={{ color: '#0F62FE', lineHeight: px(26) }}>Confirm</Text>
                            </TouchableOpacity>
                        </Flex>

                        {/* 日期选择器 */}
                        <Box style={{ paddingHorizontal: px(16) }}>
                            <Box style={{ height: ITEM_HEIGHT * 5, position: 'relative' }}>
                                {/* 中间选中项指示器 */}
                                <Box style={{
                                    position: 'absolute',
                                    top: ITEM_HEIGHT * 2,
                                    left: 0,
                                    right: 0,
                                    height: ITEM_HEIGHT,
                                    borderRadius: px(4),
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: '#e7e7e7',
                                    zIndex: 1,
                                }} />

                                <Flex style={{ height: '100%' }}>
                                    {/* 年份选择器 */}
                                    <Box style={{ flex: 1 }}>
                                        <DatePickerColumn
                                            data={years.map(y => ({ label: `${y}年`, value: y }))}
                                            selectedValue={selectedYear}
                                            onValueChange={handleYearChange}
                                        />
                                    </Box>

                                    {/* 月份选择器 */}
                                    <Box style={{ flex: 1 }}>
                                        <DatePickerColumn
                                            data={months.map(m => ({ label: `${m}月`, value: m }))}
                                            selectedValue={selectedMonth}
                                            onValueChange={handleMonthChange}
                                        />
                                    </Box>

                                    {/* 日期选择器 */}
                                    <Box style={{ flex: 1 }}>
                                        <DatePickerColumn
                                            data={days.map(d => ({ label: `${d}日`, value: d }))}
                                            selectedValue={selectedDay}
                                            onValueChange={setSelectedDay}
                                        />
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}
