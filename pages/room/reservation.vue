<template>
    <VApp>
        <VContainer class="mt-5">
            <VCard class="pa-3">
                <VCardTitle class="d-flex align-center justify-space-between">
                    <span>{{ todayFormatted }} 연습실 예약 현황</span>
                    <!-- 캘린더 선택 버튼 -->
                    <VDialog v-model="datePickerMenu"
                             max-width="300">
                        <template v-slot:activator="{ props }">
                            <VBtn v-bind="props"
                                  variant="text">
                                <VIcon>calendar_month</VIcon>
                            </VBtn>
                        </template>
                        <VCard>
                            <VCardTitle class="text-center">날짜 선택</VCardTitle>
                            <VCardText>
                                <VDatePicker @update:model-value="updateDate" />

                            </VCardText>
                            <VCardActions class="d-flex justify-end">
                                <VBtn @click="datePickerMenu = false">닫기</VBtn>
                            </VCardActions>
                        </VCard>
                    </VDialog>
                </VCardTitle>

                <VCardText>
                    <VList>
                        <VListItem v-for="(time, index) in timeSlots"
                                   :key="index">
                            <VCard class="mb-3">
                                <VCardTitle class="text-subtitle-1 font-weight-bold">
                                    ⏰ {{ time }}
                                </VCardTitle>

                                <VCardText class="d-flex flex-wrap">
                                    <VChip v-for="room in rooms"
                                           :key="room"
                                           :color="isReserved(time, room) ? 'red' : 'green'"
                                           class="ma-1"
                                           label
                                           size="large">
                                        룸 {{ room }} - {{ isReserved(time, room) ? '예약됨' : '예약 가능' }}
                                    </VChip>
                                </VCardText>
                            </VCard>
                        </VListItem>
                    </VList>
                </VCardText>
            </VCard>
        </VContainer>
    </VApp>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ko' // 한국어 요일 적용

dayjs.locale('ko')

// 5개의 연습실
const rooms = ref([1, 2, 3, 4, 5])

// 선택된 날짜
const selectedDate = ref(dayjs().format('YYYY-MM-DD'))
const datePickerMenu = ref(false)

// 날짜 포맷: M/DD(요일)
const todayFormatted = ref(dayjs(selectedDate.value).format('M/D(dd)'))

// 날짜 변경 시 업데이트
const updateDate = () => {
    todayFormatted.value = dayjs(selectedDate.value).format('M/D(dd)')
    datePickerMenu.value = false
}

// 시간대 리스트 (1시간 간격, 09:00 AM ~ 11:00 PM)
const timeSlots = ref(
    Array.from({ length: 15 }, (_, i) => {
        const start = dayjs().hour(9 + i).minute(0).format('HH:mm')
        const end = dayjs().hour(10 + i).minute(0).format('HH:mm')
        return `${start} - ${end}`
    })
)

// 예약된 룸 정보 (예제 데이터)
const reservedSlots = ref([
    { time: '09:00 - 10:00', room: 2 },
    { time: '10:00 - 11:00', room: 4 },
    { time: '11:00 - 12:00', room: 1 },
    { time: '14:00 - 15:00', room: 5 },
    { time: '16:00 - 17:00', room: 2 },
])

// 특정 시간과 룸이 예약되었는지 확인하는 함수
const isReserved = (time: string, room: number): boolean => {
    return reservedSlots.value.some(slot => slot.time === time && slot.room === room)
}
</script>
