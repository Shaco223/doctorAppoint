/*
 * @Author: liuxiang
 * @Date: 2024-12-16 14:49:29
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 22:42:37
 * @Description: file content
 */

type MainStackParamList = {
  Tab: undefined;
  DoctorDetail?: {
    detail: DoctorGroupObj;
  };
  SubmitAppoint?: {
    detail: SubmitAppointObj;
  };
  MyAppointments: undefined;
};

type AppParamList = MainStackParamList;