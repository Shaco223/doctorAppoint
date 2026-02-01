/*
 * @Author: liuxiang
 * @Date: 2024-11-13 16:09:46
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-02 01:56:22
 * @Description: file content
 */
import { ImageBackground, TouchableOpacity, ScrollView, StatusBar, Animated, StyleSheet } from 'react-native';
import { Box, Text, helpers, useTheme, Theme, Input, SvgIcon, Flex } from '@td-design/react-native'
import React, { useRef, useState, useEffect } from 'react'
import { Container } from '@/components/Container';
import { Image } from 'expo-image';
import indexTopBg from '../assets/indexTopBg.png';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useGet } from '@/hooks/useRequset';
import { Fallback } from '@/components/Fallback';
import { Reload } from '@/components/Reload';

const { px } = helpers;
export function Index() {
  const theme = useTheme<Theme>();
  const statusBarHeight = StatusBar.currentHeight;
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<AppParamList>>();

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  console.log(statusBarHeight);

  const [search, setSearch] = useState<string>('');
  const [doctorList, setDoctorList] = useState<Array<DoctorGroupObj>>([]);
  const [filterDoctorList, setFilterDoctorList] = useState<Array<DoctorGroupObj>>([]);

  const onScroll = (event: any) => {
    console.log(event.nativeEvent.contentOffset.y);
    scrollY.setValue(event.nativeEvent.contentOffset.y);
  }

  //定义数据类型
  
  const getDoctorList = (resData: Array<DoctorObj>) => {
    const doctorListData: Array<DoctorGroupObj> = [];

    const groupObj = resData.reduce((accu, item) => {
      if (!accu[item.name]) {
        accu[item.name] = {
          name: item.name,
          timezone: item.timezone,
          infoArray: [item],
        };
      } else {
        accu[item.name].infoArray.push(item);
      }
      return accu;
    }, {} as Record<string, DoctorGroupObj>);

    Object.values(groupObj).forEach((item) => {
      const weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      item.infoArray = item.infoArray.sort((a, b) => {
        const index1 = weekDay.indexOf(a.day_of_week);
        const index2 = weekDay.indexOf(b.day_of_week);
        return index1 - index2;
      });
      
      doctorListData.push({
        ...item
      });
    });


    return doctorListData;
  }

  const { data, loading, error, run } = useGet('https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json');

  useEffect(() => {
    if (data) {
      console.log(data);
      const processedData = getDoctorList(data);
      setDoctorList(processedData);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setFilterDoctorList(doctorList.filter((item) => item.name.includes(search)));
      } else {
        setFilterDoctorList(doctorList);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search, doctorList]);


  const styles = StyleSheet.create({
    imageIcon: {
      width: px(24),
      height: px(24),
    },
    textWrap: {
      flexWrap: 'wrap',
      flex: 1
    }
  });

  return (
    <Container backgroundColor='#F5F5F5' inTab={true}>

      <Animated.View style={{ opacity: headerOpacity, zIndex: 999, paddingTop: statusBarHeight, backgroundColor: '#fff' }}>
        <Flex width="100%" height={px(60)} style={{ paddingLeft: px(16), paddingRight: px(16), borderBottomColor: '#e7e7e7', borderBottomWidth: 0.5, paddingTop: px(12) }}>

          <Box style={{ width: px(250) }}>
            <Input
              value={search}
              onChange={(e) => setSearch(e)}
              style={{ width: px(290), height: px(32), borderRadius: px(24), backgroundColor: '#F5F5F5', borderWidth: 0, paddingHorizontal: px(12) }}
              placeholder="Please enter the doctor's name"
              inputStyle={{ height: px(36) }}
              left={<SvgIcon name="search" fontWeight={'bold'} color={theme.colors.icon} style={{ marginRight: px(8) }} />}
              
            />
          </Box>
          <Image source={require('../assets/kefu.png')} style={[styles.imageIcon, { marginLeft: px(16), marginRight: px(16) }]} />
          <Image source={require('../assets/mail.png')} style={styles.imageIcon} />

        </Flex>
      </Animated.View>
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ marginTop: px(-84), position: 'relative' }}>
        <ImageBackground source={indexTopBg} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}>
        </ImageBackground>
        <Box width="100%" style={{ paddingTop: statusBarHeight }}>
          <Flex style={{ padding: px(16) }}>
            <Box style={{ width: px(250) }}>
              <Input
                value={search}
                onChange={(e) => setSearch(e)}
                style={{ width: px(290), height: px(32), borderRadius: px(24), backgroundColor: '#fff', borderWidth: 0, paddingHorizontal: px(12) }}
                placeholder="Please enter the doctor's name"
                inputStyle={{ height: px(36) }}
                left={<SvgIcon name="search" fontWeight={'bold'} color={theme.colors.icon} style={{ marginRight: px(8) }} />}
                
              />
            </Box>
            <Image source={require('../assets/kefu.png')} style={[styles.imageIcon, { marginLeft: px(16), marginRight: px(16) }]} />
            <Image source={require('../assets/mail.png')} style={styles.imageIcon} />
          </Flex>
        </Box>
        {loading && <Fallback />}
        {error && <Reload reload={() => {
          run();
        }} />}
        { !loading && !error && <Box style={{ padding: px(16) }}>
          {filterDoctorList.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('DoctorDetail', { detail: item })}>
              <Box  width="100%" style={{ padding: px(16), backgroundColor: '#fff', borderRadius: px(12), marginBottom: px(12) }}>
                <Flex>
                  <Image source={require('@/assets/doctor.png')} style={{ width: px(60), height: px(60), marginRight: px(16) }} />
                  <Box style={{ flex: 1 }}>
                    <Text style={[styles.textWrap, { fontSize: px(16), color: theme.colors.text, fontWeight: '500', marginBottom: px(8) }]}>Name: {item.name}</Text>
                    <Text style={[styles.textWrap, {
                      fontSize: px(14), color: theme.colors.text,
                    }]}>Schedule: {[...new Set(item.infoArray.map((item) => item.day_of_week))].join(', ')}</Text>
                  </Box>
                </Flex>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>}
      </ScrollView>
    </Container>
  )

}
