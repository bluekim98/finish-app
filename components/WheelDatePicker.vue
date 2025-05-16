<template>
    <div ref="container"
         class="wheel-picker"
         @scroll.passive="onScroll">
        <div class="spacer" />

        <div v-for="item in items"
             :key="item"
             class="wheel-item"
             :class="{ active: item === modelValue }">
            {{ item }}{{ suffix }}
        </div>

        <div class="spacer" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

interface Props {
    modelValue: number
    items: number[]
    suffix?: string
}

const props = defineProps<Props>()
const emit = defineEmits([
    'update:modelValue',
    'cancel'
])

const container = ref<HTMLElement | null>(null)

const ITEM_HEIGHT = 40

const onScroll = () => {
    if (!container.value) return

    clearTimeout((container.value as any)._scrollTimeout)

        ; (container.value as any)._scrollTimeout = setTimeout(() => {
            const scrollTop = container.value!.scrollTop
            const index = Math.round(scrollTop / ITEM_HEIGHT)
            const value = props.items[index]
            if (value !== props.modelValue) {
                emit('update:modelValue', value)
            }
            scrollToIndex(index)
        }, 80)
}

const scrollToIndex = (index: number) => {
    nextTick(() => {
        container.value?.scrollTo({
            top: index * ITEM_HEIGHT,
            behavior: 'smooth',
        })
    })
}

onMounted(() => {
    const index = props.items.indexOf(props.modelValue)
    if (index === -1) {
        emit('cancel')
        return
    }
    scrollToIndex(index)
})

watch(() => props.modelValue, (val) => {
    const index = props.items.indexOf(val)
    if (index === -1) {
        emit('cancel')
        return
    }
    scrollToIndex(index)
})
</script>

<style scoped>
.wheel-picker {
    height: 160px;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
    text-align: center;
    perspective: 1000px;
    position: relative;
    padding: 0;
    width: 100%;
}

.wheel-item {
    height: 40px;
    line-height: 40px;
    scroll-snap-align: center;
    font-size: 16px;
    color: #999;
    transition: 0.2s ease;
    transform-origin: center center;
    transform: rotateX(15deg);
}

.wheel-item.active {
    font-size: 20px;
    color: #000;
    font-weight: bold;
    transform: rotateX(0deg) scale(1.1);
}

.spacer {
    height: 60px;
    pointer-events: none;
}
</style>