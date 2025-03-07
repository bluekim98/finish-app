<template>
    <VContainer class="container">
        <!-- 타이틀 및 캘린더 아이콘 -->
        <VRow align="center"
              class="title-container">
            <VCol class="font-weight-bold title-text"
                  cols="auto">
                {{ todayFormatted }} 레슨 예약 현황
            </VCol>
            <VCol cols="auto">
                <VBtn icon="calendar_month"
                      variant="text"
                      size="small"
                      elevation="0"
                      class="calendar-icon"
                      @click="datePickerMenu = true" />
            </VCol>
        </VRow>

        <!-- 레슨 예약 리스트 -->
        <VList class="reservation-list">
            <VListItem v-for="(instructor, index) in instructors"
                       :key="index"
                       class="pa-0">
                <VCol class="mb-3 pa-0">
                    <!-- 강사 이름 -->
                    <div class="instructor-name">
                        👨‍🏫 {{ instructor.name }}
                    </div>

                    <!-- 레슨 가능 시간 -->
                    <div class="d-flex flex-wrap">
                        <VChip v-for="lesson in instructor.lessons"
                               :key="lesson.time"
                               :color="lesson.isReserved ? 'red' : 'green'"
                               class="ma-1"
                               label
                               size="large">
                            {{ lesson.time }} - {{ lesson.isReserved ? '예약됨' : '예약 가능' }}
                        </VChip>
                    </div>
                </VCol>
            </VListItem>
        </VList>
    </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

const selectedDate = ref(dayjs().format('YYYY-MM-DD'))
const datePickerMenu = ref(false)

const todayFormatted = ref(dayjs(selectedDate.value).format('M/D(dd)'))

const updateDate = () => {
    todayFormatted.value = dayjs(selectedDate.value).format('M/D(dd)')
    datePickerMenu.value = false
}

// 강사 및 레슨 정보 (예제 데이터)
const instructors = ref([
    {
        name: '김OO 프로',
        lessons: [
            { time: '10:00 - 11:00', isReserved: false },
            { time: '12:00 - 13:00', isReserved: true },
            { time: '15:00 - 16:00', isReserved: false },
        ],
    },
    {
        name: '박OO 프로',
        lessons: [
            { time: '09:00 - 10:00', isReserved: true },
            { time: '14:00 - 15:00', isReserved: false },
        ],
    },
    {
        name: '이OO 프로',
        lessons: [
            { time: '11:00 - 12:00', isReserved: true },
            { time: '16:00 - 17:00', isReserved: false },
        ],
    },
])
</script>

<style scoped>
/* 전체 컨테이너 */
.container {
    background-color: white;
    padding: 16px;
}

/* 타이틀 영역 */
.title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

/* 타이틀 텍스트 */
.title-text {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.5px;
}

/* 캘린더 아이콘 버튼 */
.calendar-icon {
    margin-left: 8px;
    color: black;
    min-width: 32px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

/* 강사 이름 스타일 */
.instructor-name {
    font-size: 16px;
    font-weight: bold;
    color: #555;
}

/* 예약 리스트 스타일 */
.reservation-list {
    margin-top: 8px;
}
</style>
