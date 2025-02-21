<template>
    <VApp>
        <VContainer class="mt-5">
            <VCard class="pa-3">
                <VCardTitle class="text-center text-h5">오늘의 연습실 예약 현황</VCardTitle>

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

// 5개의 연습실
const rooms = ref([1, 2, 3, 4, 5])

// 시간대 리스트 (30분 단위)
const timeSlots = ref([
    '09:00 - 09:30',
    '09:30 - 10:00',
    '10:00 - 10:30',
    '10:30 - 11:00',
    '11:00 - 11:30',
    '11:30 - 12:00',
    '12:00 - 12:30',
    '12:30 - 13:00',
    '13:00 - 13:30',
    '13:30 - 14:00',
    '14:00 - 14:30',
    '14:30 - 15:00',
    '15:00 - 15:30',
    '15:30 - 16:00',
    '16:00 - 16:30',
    '16:30 - 17:00',
])

// 예약된 룸 정보 (예제 데이터)
const reservedSlots = ref([
    { time: '09:30 - 10:00', room: 2 },
    { time: '10:00 - 10:30', room: 4 },
    { time: '11:00 - 11:30', room: 1 },
    { time: '12:30 - 13:00', room: 3 },
    { time: '14:00 - 14:30', room: 5 },
    { time: '16:00 - 16:30', room: 2 },
])

// 특정 시간과 룸이 예약되었는지 확인하는 함수
const isReserved = (time: string, room: number): boolean => {
    return reservedSlots.value.some(slot => slot.time === time && slot.room === room)
}
</script>