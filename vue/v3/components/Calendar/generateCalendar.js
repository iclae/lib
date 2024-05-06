import dayjs, { Dayjs } from "dayjs";

const daysOfWeek = [7, 1, 2, 3, 4, 5, 6];

/**
 * 生成日历数据
 * @param {Dayjs} date 
 * @param {Object} options
 * @param {Boolean} options.weekStartsOnMonday 一周的第一天是否是周一，默认是周一
 * @returns
 */
export function generateCalendar(date, options = {
  weekStartsOnMonday: true,
}) {
  const calendar = [];

  const today = dayjs();
  const year = date.year();
  const month = date.month() + 1;
  const daysInMonth = date.daysInMonth();

  const monthFirstDay = date.startOf("month");
  const monthEndDay = date.endOf("month");
  const weekStartDay = options.weekStartsOnMonday ? 1 : 0;

  // 当前月份第一天在周中是第几天
  const monthFirstDayWeekIndex = getWeekIndex(monthFirstDay.day(), weekStartDay);
  // 当前月份最后一天在周中是第几天
  const monthEndDayWeekIndex = getWeekIndex(monthEndDay.day(), weekStartDay);

  const prevMonthDays = [];
  if (monthFirstDayWeekIndex !== 1) {
    let prevMonthLastDate = monthFirstDay.subtract(1, 'day').date();
    const prevMonthYear = date.subtract(1, 'month').year();
    const prevMonthMonth = date.subtract(1, 'month').month() + 1;
    // 根据当前月份第一天在第几位，计算上个月份的天数
    for (let prevMonthWeekIndex = monthFirstDayWeekIndex - 1; prevMonthWeekIndex > 0; prevMonthWeekIndex--) {
      prevMonthDays.push({
        year: prevMonthYear,
        month: prevMonthMonth,
        date: prevMonthLastDate,
        day: getWeekDay(prevMonthWeekIndex, weekStartDay),
        isCurrentMonth: false,
        isPrevMonth: true,
        fullDate: `${prevMonthYear}-${padDate(prevMonthMonth)}-${padDate(prevMonthLastDate)}`
      });
      prevMonthLastDate--;
    }
    prevMonthDays.reverse();
  }
  // 当前日历的周数
  const calendarLength = Math.ceil((monthFirstDayWeekIndex - 1 + daysInMonth) / 7);

  const nextMonthDays = [];
  // 当前日历去掉上月数据和当月数据当剩余天数
  const nextMonthDaysLength = calendarLength * 7 - daysInMonth - prevMonthDays.length;
  if (nextMonthDaysLength > 0) {
    const nextMonthYear = date.add(1, 'month').year();
    const nextMonthMonth = date.add(1, 'month').month() + 1;
    // 根据当前月份还剩下的天数，计算下个月份的天数
    for (let nextMonthDate = 1; nextMonthDate <= nextMonthDaysLength; nextMonthDate++) {
      nextMonthDays.push({
        year: nextMonthYear,
        month: nextMonthMonth,
        date: nextMonthDate,
        day: getWeekDay(monthEndDayWeekIndex + nextMonthDate, weekStartDay),
        isCurrentMonth: false,
        isNextMonth: true,
        fullDate: `${nextMonthYear}-${padDate(nextMonthMonth)}-${padDate(nextMonthDate)}`
      });
    }
  }


  let currentMonthDate = 1;
  for (let w = 1; w <= calendarLength; w++) {
    const week = [];
    if (w === 1) {
      week.push(...prevMonthDays);
    }
    for (let wi = week.length + 1; wi <= 7; wi++) {
      if (currentMonthDate > daysInMonth) {
        break;
      }
      const day = {
        year,
        month,
        date: currentMonthDate,
        day: getWeekDay(wi, weekStartDay),
        isCurrentMonth: true,
        fullDate: `${year}-${padDate(month)}-${padDate(currentMonthDate)}`,
      }
      day.isToday = today.isSame(day.fullDate, 'day')
      week.push(day);
      currentMonthDate++;
    }
    calendar.push(week);
  }
  calendar[calendar.length - 1].push(...nextMonthDays);

  return calendar;
}

function getWeekIndex(day, startDay) {
  return (day - startDay + 7) % 7 + 1
}

function getWeekDay(index, startDay) {
  return daysOfWeek[(startDay + index - 1) % 7];
}

function padDate(date) {
  return String(date).padStart(2, '0');
}