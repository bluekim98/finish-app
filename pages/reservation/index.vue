<template>
    <div class="tabs-container">
        <!-- 상단 고정된 탭 -->
        <VTabs v-model="tab"
               :items="tabs"
               align-tabs="start"
               color="primary"
               height="60"
               class="border sticky-tabs"
               slider-color="primary">
            <template v-slot:tab="{ item }">
                <VTab class="tabs-title"
                      :text="item.text"
                      :value="item.value">
                </VTab>
            </template>

            <template v-slot:item="{ item }">
                <VTabsWindowItem :value="item.value">
                    <ReservationRoom v-if="item.value === 't-room'" />
                    <ReservationLesson v-else-if="item.value === 't-lesson'" />
                </VTabsWindowItem>
            </template>
        </VTabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    auth: true,
});

const tab = ref('t-room')
const tabs = ref([
    {
        text: '연습실',
        value: 't-room',
    },
    {
        text: '레슨',
        value: 't-lesson',
    },
])
</script>

<style scoped>
/* 탭을 화면 상단에 고정 */
.sticky-tabs {
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: white;
}

.tabs-title {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.5px;
}
</style>
