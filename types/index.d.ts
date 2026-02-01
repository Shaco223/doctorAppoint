/*
 * @Author: liuxiang
 * @Date: 2026-01-30 15:53:30
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 21:08:56
 * @Description: file content
 */
declare module '*.png';
declare module '*.jpg';
declare module '*.webp';
declare module '*.gif';

interface PageParams {
  page: number;
  pageSize: number;
}

interface Page<T> extends PageParams {
  list: Array<T>;
  total: number;
  totalPage?: number;
}

type UserInfo = {
  userId?: number;
  userName?: string;
  profilePicture?: string;
};

interface Token {
  accessToken?: string;
  refreshToken?: string;
  tokenExpireTime?: string;
  tokenExpiresIn?: number;
  userId?: number;
  ispassword?: boolean;
}

interface AjaxResponse<T = unknown> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

type Obj = Record<string, any>;

interface DoctorObj {
  name: string;
  timezone: string;
  day_of_week: string;
  available_at: string;
  available_until: string;
}
interface DoctorGroupObj {
  name: string;
  timezone: string;
  infoArray: Array<DoctorObj>;
}

interface TimeObj {
  startTime: string;
  endTime: string;
  status: boolean;
}


interface SubmitAppointObj {
  doctorName: string;
  timezone: string;
  date: string;
  startTime: string;
  endTime: string;
}
