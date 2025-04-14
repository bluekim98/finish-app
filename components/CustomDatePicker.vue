<template>
    <VBottomSheet v-model="sheet">
        <VCard class="pa-4">
            <VCardTitle class="text-center">날짜 선택</VCardTitle>

            <div class="wheel-date-container">
                <WheelDatePicker v-model="year"
                                 :items="years"
                                 suffix="년"
                                 @cancel="handleCancel" />
                <WheelDatePicker v-model="month"
                                 :items="months"
                                 suffix="월"
                                 @cancel="handleCancel" />
                <WheelDatePicker v-model="day"
                                 :items="daysInMonth"
                                 suffix="일"
                                 @cancel="handleCancel" />
            </div>

            <VCardActions class="justify-end mt-4">
                <VBtn @click="sheet = false">취소</VBtn>
                <VBtn color="primary"
                      @click="confirmDate">선택</VBtn>
            </VCardActions>
        </VCard>
    </VBottomSheet>
</template>

<script setup lang="ts">
import type { CustomDatePickerExpose } from '~/components/@types';

import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

const sheet = ref(false)

const emit = defineEmits([
    'select',
    'cancel'
])

const today = dayjs()
const year = ref(today.year())
const month = ref(today.month() + 1)
const day = ref(today.date())

const years = Array.from({ length: 5 }, (_, i) => today.year() - 2 + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate()
const daysInMonth = computed(() =>
    Array.from({ length: getDaysInMonth(year.value, month.value) }, (_, i) => i + 1)
)

const confirmDate = () => {
    const result = `${year.value}-${String(month.value).padStart(2, '0')}-${String(day.value).padStart(2, '0')}`
    emit('select', result)
    sheet.value = false
}

const handleCancel = () => {
    sheet.value = false
    emit('cancel')
}

const show = () => {
    sheet.value = true
}

const hide = () => {
    sheet.value = false
}

defineExpose<CustomDatePickerExpose>({ show, hide })
</script>

<style scoped>
.wheel-date-container {
    display: flex;
    justify-content: space-around;
}
</style>