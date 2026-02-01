import { produce } from 'immer';

/**
 * 用于字符长度超过指定个数自动截取并添加...
 */
export const textEllipsis = (text: string, length: number) => {
  if (text.length > length && length > 0) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export function convertNullToEmptyString(obj: Obj) {
  return produce(obj, draft => {
    Object.entries(draft as Obj).forEach(([key, val]) => {
      if (val === null || val === undefined) {
        draft[key] = '';
      }
    });
  });
}

/**
 * 格式化数字
 * @param value
 * @param dots 小数位
 */
export const formatNumber = (value?: number | string, dots = 4) => {
  if (value) {
    if (typeof value === 'string' && !Number.isNaN(+value)) {
      return Number(value).toFixed(dots);
    } else if (typeof value === 'number') {
      return Number(value).toFixed(dots);
    }
  }
  return '0';
};


/**
 * 数字转中文大写数字
 * @param num 需要转换的数字
 * @returns 中文大写数字字符串
 */
export const convertToChinese = (num: number): string => {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const units = ['', '拾', '佰', '仟'];
  const bigUnits = ['', '万', '亿'];
  
  if (num === 0) return '零';
  
  let result = '';
  const integralPart = Math.floor(num);
  const decimalPart = Math.round((num - integralPart) * 100);
  
  // 处理整数部分
  if (integralPart > 0) {
    const integralStr = integralPart.toString();
    let zeroFlag = false;
    let unitIndex = 0;
    let bigUnitIndex = 0;
    
    for (let i = integralStr.length - 1; i >= 0; i--) {
      const digit = parseInt(integralStr[i]);
      
      if (digit === 0) {
        if (unitIndex === 0 && bigUnitIndex > 0) {
          result = bigUnits[bigUnitIndex] + result;
        }
        zeroFlag = true;
      } else {
        if (zeroFlag) {
          result = '零' + result;
          zeroFlag = false;
        }
        result = digits[digit] + units[unitIndex] + (unitIndex === 0 && bigUnitIndex > 0 ? bigUnits[bigUnitIndex] : '') + result;
      }
      
      unitIndex++;
      if (unitIndex > 3) {
        unitIndex = 0;
        bigUnitIndex++;
      }
    }
  }
  
  // 处理小数部分
  if (decimalPart > 0) {
    const jiao = Math.floor(decimalPart / 10);
    const fen = decimalPart % 10;
    
    if (jiao > 0) {
      result += digits[jiao] + '角';
    }
    if (fen > 0) {
      result += digits[fen] + '分';
    }
  } else if (decimalPart === 0 && integralPart > 0) {
    result += '整';
  }
  
  return result;
};