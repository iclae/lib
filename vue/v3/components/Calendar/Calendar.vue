<template>
  <div class="calendar" :style="{ 'background-color': backgroundColor }">
    <div v-if="showHeader" class="header flex justify-between items-center px-3 py-2 border-b">
      <div class="title">
        <span v-if="showHeaderYear">{{ selectDate.year() }} 年 </span>
        {{ selectDate.month() + 1 }} 月
      </div>
      <div class="button-group flex items-center justify-end">
        <button
          class="button border rounded-l py-1 px-4 text-center text-xs lg:hover:text-sky-600 lg:hover:bg-sky-100 lg:hover:border-sky-200"
          style="margin-right: -1px" @click="changeMonth(-1)">上个月</button>
        <button
          class="button border py-1 px-4 text-center text-xs lg:hover:text-sky-600 lg:hover:bg-sky-100 lg:hover:border-sky-200"
          :class="{ 'text-sky-600': isToday }" @click="goToday">今天</button>
        <button
          class="button border rounded-r py-1 px-4 text-center text-xs lg:hover:text-sky-600 lg:hover:bg-sky-100 lg:hover:border-sky-200"
          style="margin-left: -1px" @click="changeMonth(1)">下个月</button>
      </div>
    </div>
    <div class="body relative p-2">
      <div v-if="showMonthOnBackground"
        :class="['month-shadow', 'absolute', 'text-9xl', 'top-1/2', 'left-1/2', 'text-gray-100/80', '-translate-x-2/4', '-translate-y-2/4', 'pointer-events-none']">
        {{ month.split('-')[1] }}
      </div>
      <div class="weekdays grid grid-cols-7">
        <div v-for="weekday in _weekDays" :key="weekday" class="weekday text-center text-base py-3"
          :style="weekDayStyle">{{ weekday }}
        </div>
      </div>
      <div class="week relative grid grid-cols-7" v-for="(week, weekIndex) in calendar">
        <div v-for="(day, dayIndex) in week" :key="day.fullDate" :class="[
          'day',
          'text-center',
          'text-base',
          'cursor-pointer',
          'lg:hover:bg-blue-200',
          'transition-colors',
          {
            'border-r': bordered,
            'border-b': bordered,
            'border-t': !weekIndex && bordered,
            'border-l': !dayIndex && bordered,
            'pointer-events-none': isCellDisabled(day),
            'opacity-50': isCellDisabled(day),
            'invisible': isHiddenCell(day),
          }]" @click="onSelect(day)" :style="dateCellStyle">
          <div
            :class="['day-inner', 'py-2', { 'text-gray-400': !day.isCurrentMonth, 'text-sky-500': day.isToday || selectDate.isSame(day.fullDate, 'day'), 'bg-blue-200': selectDate.isSame(day.fullDate, 'day') }]">
            <slot :day="day" name="date-cell"><span>{{ day.date }}</span></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, computed, ref } from 'vue'
import dayjs from 'dayjs';
import { generateCalendar } from './generateCalendar'

const FORMAT = 'YYYY-MM-DD';

const props = defineProps({
  date: {
    type: String,
    default: dayjs().format('YYYY-MM-DD')
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  // 是否显示Header Title中的年份
  showHeaderYear: {
    type: Boolean,
    default: true
  },
  // 是否禁止选择非当前月份的日期
  disableNonCurrentMonth: {
    type: Boolean,
    default: false
  },
  // 是否显示上个月的日期
  showPrevMonth: {
    type: Boolean,
    default: true
  },
  // 是否显示下个月的日期
  showNextMonth: {
    type: Boolean,
    default: true
  },
  // 是否显示非本月的日期
  showOtherMonth: {
    type: Boolean,
    default: true
  },
  // 禁止选中的日期
  disabledDate: {
    type: Function,
    default: () => false
  },
  // 点击上/下个月选择的日期, first: 上/下个月第一天, last: 上/下个月最后一天, none: 当前选择日期的上/下个月
  monthSelectType: {
    type: String,
    default: 'none',
  },
  // 星期的样式
  weekDayStyle: {
    type: Object,
    default: () => ({})
  },
  // 星期的显示文字
  weekDays: {
    type: Array,
    default: () => ['一', '二', '三', '四', '五', '六', '日']
  },
  // 是否显示边框
  bordered: {
    type: Boolean,
    default: true
  },
  // 日期单元格的样式
  dateCellStyle: {
    type: Object,
    default: () => ({})
  },
  // 是否背景显示月份虚影
  showMonthOnBackground: {
    type: Boolean,
    default: false
  },
  // 一周是否开始于周一
  weekStartsOnMonday: {
    type: Boolean,
    default: true
  },
  // 日历背景颜色
  backgroundColor: {
    type: String,
    default: '#fff'
  },
})

const emit = defineEmits(['onSelect'])

const selectDate = computed(() => dayjs(props.date))
const month = computed(() => {
  return `${selectDate.value.year()}-${selectDate.value.month() + 1}`
})
const today = dayjs()
const todayStr = today.format(FORMAT)
const isToday = computed(() => selectDate.value.isSame(today, 'day'))

const calendar = ref([])
const _weekDays = computed(() => {
  let weekDays = [...props.weekDays];
  if (!props.weekStartsOnMonday) {
    const lastDay = weekDays.pop()
    weekDays.unshift(lastDay)
  }
  return weekDays;
})

watch(month, () => {
  calendar.value = generateCalendar(selectDate.value, {
    weekStartsOnMonday: props.weekStartsOnMonday
  })
}, { immediate: true })

function isCellDisabled(day) {
  if (props.disableNonCurrentMonth && !day.isCurrentMonth) {
    return true
  }

  return props.disabledDate(day)
}

function changeMonth(delta) {
  const newMonthDay = selectDate.value.add(delta, 'month');

  let targetDate = null;

  if (props.monthSelectType === 'first') {
    targetDate = newMonthDay.startOf('month');
  } else if (props.monthSelectType === 'last') {
    targetDate = newMonthDay.endOf('month');
  } else {
    targetDate = newMonthDay;
  }

  emit('onSelect', targetDate.format(FORMAT), {
    from: delta > 0 ? 'next' : 'prev',
    isOverMonth: true,
  })
}

function goToday() {
  emit('onSelect', todayStr, {
    from: 'today',
    isOverMonth: !selectDate.value.isSame(today, 'month')
  })
}

function onSelect(newDate) {
  emit('onSelect', newDate.fullDate, {
    from: 'select',
    isOverMonth: !selectDate.value.isSame(newDate.fullDate, 'month')
  })
}

function isHiddenCell(day) {
  if (day.isCurrentMonth) return false;
  if (!props.showOtherMonth) return true;
  if (!props.showPrevMonth && day.isPrevMonth) return true;
  if (!props.showNextMonth && day.isNextMonth) return true;
}

// 以下方法是暴露给外部的方法
function prevMonth() {
  changeMonth(-1)
}
function nextMonth() {
  changeMonth(1)
}
defineExpose({
  prevMonth,
  nextMonth,
})
</script>