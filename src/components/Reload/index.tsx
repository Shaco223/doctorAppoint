/*
 * @Author: liuxiang
 * @Date: 2026-01-31 16:26:59
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 02:55:57
 * @Description: file content
 */
import React from 'react';

import { Box, Button } from '@td-design/react-native';


import { Container } from '../Container';


export function Reload({ reload }: { reload: () => void }) {
    return (
        <Container>
            <Box flex={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button style={{ width: 120 }} title="Reload" onPress={() => { reload() }} />
            </Box>
        </Container>
    );
}
