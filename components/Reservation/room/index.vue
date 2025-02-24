<template>
    <VContainer class="container">
        <!-- 타이틀 및 캘린더 아이콘 -->
        <VRow align="center"
              class="title-container">
            <VCol class="font-weight-bold title-text"
                  cols="auto">
                {{ todayFormatted }} 연습실 예약 현황
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

        <!-- 예약 리스트 -->
        <VList class="reservation-list">
            <VListItem v-for="(time, index) in timeSlots"
                       :key="index"
                       class="pa-0">
                <VCol class="mb-3 pa-0">
                    <div class="time-slot">
                        ⏰ {{ time }}
                    </div>

                    <div class="d-flex flex-wrap">
                        <VChip v-for="room in rooms"
                               :key="room"
                               :color="isReserved(time, room) ? 'red' : 'green'"
                               class="ma-1"
                               label
                               size="large">
                            룸 {{ room }} - {{ isReserved(time, room) ? '예약됨' : '예약 가능' }}
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

const rooms = ref([1, 2, 3, 4, 5])

const selectedDate = ref(dayjs().format('YYYY-MM-DD'))
const datePickerMenu = ref(false)

const todayFormatted = ref(dayjs(selectedDate.value).format('M/D(dd)'))

const updateDate = () => {
    todayFormatted.value = dayjs(selectedDate.value).format('M/D(dd)')
    datePickerMenu.value = false
}

const timeSlots = ref(
    Array.from({ length: 15 }, (_, i) => {
        const start = dayjs().hour(9 + i).minute(0).format('HH:mm')
        const end = dayjs().hour(10 + i).minute(0).format('HH:mm')
        return `${start} - ${end}`
    })
)

const reservedSlots = ref([
    { time: '09:00 - 10:00', room: 2 },
    { time: '10:00 - 11:00', room: 4 },
    { time: '11:00 - 12:00', room: 1 },
    { time: '14:00 - 15:00', room: 5 },
    { time: '16:00 - 17:00', room: 2 },
])

const isReserved = (time: string, room: number): boolean => {
    return reservedSlots.value.some(slot => slot.time === time && slot.room === room)
}
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

/* 시간 슬롯 스타일 */
.time-slot {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

/* 예약 리스트 스타일 */
.reservation-list {
    margin-top: 16px;
}
</style>
