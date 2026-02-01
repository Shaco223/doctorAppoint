/*
 * @Author: liuxiang
 * @Date: 2026-01-31 16:26:59
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 02:42:57
 * @Description: file content
 */
import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Box, Text, useTheme } from '@td-design/react-native';

import { AppTheme } from '@/theme';

import { Container } from '../Container';


export function Fallback() {
  const theme = useTheme<AppTheme>();
  return (
    <Container>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator animating size="large" color={theme.colors.primary200} />
        <Text>加载中...</Text>
      </Box>
    </Container>
  );
}
