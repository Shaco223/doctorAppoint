/*
 * @Author: liuxiang
 * @Date: 2026-02-01 20:13:18
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 23:36:44
 * @Description: file content
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '@/store';

export interface Appointment {
  id: string;
  doctorName: string;
  timeZone: string;
  appointmentDate: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  status: 'confirm' | 'cancel';
}

interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: []
};

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },

    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
  },
});

export const { addAppointment, updateAppointment } = appointmentSlice.actions;

export const selectAllAppointments = (state: RootState) => {
  return state.appointment.appointments;
};

const selectAppointments = (state: RootState) => state.appointment.appointments;
const selectStatus = (_state: RootState, status: string) => status;

export const selectAppointmentsByStatus = createSelector(
    [selectAppointments, selectStatus],
    (appointments, status) => {
        return appointments.filter((appointment: Appointment) => appointment.status === status);
    }
);

export default appointmentSlice.reducer;
