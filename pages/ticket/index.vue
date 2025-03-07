<template>
    <VContainer class="container">
        <!-- 타이틀 -->
        <VRow class="title-container">
            <VCol class="font-weight-bold title-text">
                피니시 골프
            </VCol>
            <VCol cols="auto">
                <VBtn icon="notifications"
                      variant="text"
                      color="grey"
                      size="medium"
                      elevation="0"
                      class="notification-icon" />
            </VCol>
        </VRow>

        <!-- 사용 중인 수강권 목록 -->
        <VCard class="membership-section">
            <VCardTitle class="section-title">사용 중인 수강권</VCardTitle>
            <VList v-if="activeMemberships.length">
                <VListItem v-for="membership in activeMemberships"
                           :key="membership.id"
                           class="membership-item">
                    <VCol>
                        <div class="membership-title">
                            {{ membership.title }}
                        </div>
                        <div class="membership-description">
                            {{ membership.description }}
                        </div>
                        <div class="membership-period">
                            {{ membership.usagePeriod }}
                            <span class="membership-d-day">
                                (D-{{ membership.daysLeft }})
                            </span>
                        </div>
                    </VCol>
                </VListItem>
            </VList>
            <div v-else
                 class="empty-text">사용 중인 수강권이 없습니다.</div>
        </VCard>

        <!-- 만료된 수강권 목록 -->
        <VCard class="membership-section">
            <VCardTitle class="section-title">만료된 수강권</VCardTitle>
            <VList v-if="expiredMemberships.length">
                <VListItem v-for="membership in displayedExpiredMemberships"
                           :key="membership.id"
                           class="membership-item expired">
                    <VCol>
                        <div class="membership-title">
                            {{ membership.title }}
                        </div>
                        <div class="membership-description">
                            {{ membership.description }}
                        </div>
                        <div class="membership-period">
                            {{ membership.usagePeriod }}
                        </div>
                    </VCol>
                </VListItem>
            </VList>
            <div v-else
                 class="empty-text">만료된 수강권이 없습니다.</div>

            <!-- 더보기 버튼 -->
            <VBtn v-if="expiredMemberships.length > 1"
                  variant="text"
                  class="see-more-button"
                  @click="toggleShowAll">
                {{ showAllExpired ? '접기' : '더보기' }}
            </VBtn>
        </VCard>

        <!-- 추천 수강권 목록 -->
        <VCard class="membership-section">
            <VCardTitle class="section-title">추천 수강권</VCardTitle>

            <!-- 카테고리 필터 -->
            <VChipGroup v-model="selectedCategory"
                        filter
                        mandatory
                        class="category-chips">
                <VChip v-for="category in categories"
                       :key="category.value"
                       :value="category.value"
                       size="small"
                       variant="outlined">
                    {{ category.label }}
                </VChip>
            </VChipGroup>

            <VList>
                <VListItem v-for="membership in filteredRecommendedMemberships"
                           :key="membership.id"
                           class="membership-item">
                    <VCol>
                        <div class="membership-title">{{ membership.title }}</div>
                        <div class="membership-description">{{ membership.description }}</div>
                        <div class="membership-period">{{ membership.usagePeriod }}</div>
                    </VCol>
                </VListItem>
            </VList>
        </VCard>

    </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 사용 중인 수강권 목록
const activeMemberships = ref([
    {
        id: 1,
        title: '프리미엄 연습권',
        description: '하루 2시간 사용 가능',
        usagePeriod: '2024.01.01 - 2024.06.30',
        daysLeft: 45,
    },
    {
        id: 2,
        title: '골프 레슨 패키지',
        description: '10회 레슨 이용권',
        usagePeriod: '2024.02.01 - 2024.05.31',
        daysLeft: 90,
    },
])

// 만료된 수강권 목록
const expiredMemberships = ref([
    {
        id: 3,
        title: '기본 연습권',
        description: '하루 1시간 사용 가능',
        usagePeriod: '2023.09.01 - 2023.12.31',
    },
    {
        id: 4,
        title: 'VIP 연습권',
        description: '프리미엄 사용자 전용',
        usagePeriod: '2023.06.01 - 2023.09.01',
    },
    {
        id: 5,
        title: '단기 레슨 패키지',
        description: '5회 레슨 이용권',
        usagePeriod: '2023.05.01 - 2023.08.31',
    },
])

// 추천 수강권 목록
const recommendedMemberships = ref([
    { id: 6, title: 'VIP 레슨 패키지', description: '전문 코치 20회 레슨', usagePeriod: '3개월 이용권', category: '레슨' },
    { id: 7, title: '주말 연습권', description: '주말 전용 4시간 패키지', usagePeriod: '6개월 이용권', category: '연습실' },
    { id: 8, title: '단기 연습권', description: '1개월 단기 패키지', usagePeriod: '1개월 이용권', category: '연습실' },
    { id: 9, title: '프리미엄 레슨 패키지', description: '고급 코치 맞춤 레슨', usagePeriod: '6개월 이용권', category: '레슨' },
])

// 카테고리 필터
const categories = ref([
    { label: '전체', value: '전체' },
    { label: '연습실', value: '연습실' },
    { label: '레슨', value: '레슨' },
])
const selectedCategory = ref('전체')

// "더보기" 상태 관리
const showAllExpired = ref(false)

// "더보기" 토글 함수
const toggleShowAll = () => {
    showAllExpired.value = !showAllExpired.value
}

// 표시할 만료된 수강권 (1개 또는 전체)
const displayedExpiredMemberships = computed(() => {
    return showAllExpired.value ? expiredMemberships.value : expiredMemberships.value.slice(0, 1)
})

// 추천 수강권 필터링
const filteredRecommendedMemberships = computed(() => {
    return selectedCategory.value === '전체'
        ? recommendedMemberships.value
        : recommendedMemberships.value.filter(m => m.category === selectedCategory.value)
})

</script>

<style scoped>
/* 전체 컨테이너 */
.container {
    background-color: white;
    padding: 16px;
}

/* 타이틀 */
.title-container {
    margin-bottom: 12px;
}

.title-text {
    font-size: 20px;
    font-weight: bold;
}

/* 섹션 스타일 */
.membership-section {
    margin-top: 16px;
    padding: 12px;
    border-radius: 8px;
    background-color: #f9f9f9;
}

/* 섹션 타이틀 */
.section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}

/* 수강권 아이템 스타일 */
.membership-item {
    padding: 12px;
    border-bottom: 1px solid #ddd;
}

.membership-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.membership-description {
    font-size: 14px;
    color: #666;
    margin-top: 4px;
}

.membership-period {
    font-size: 13px;
    color: #888;
    margin-top: 4px;
}

/* 만료된 수강권 스타일 */
.expired {
    opacity: 0.5;
}

/* 더보기 버튼 */
.see-more-button {
    margin-top: 8px;
    text-align: center;
    width: 100%;
}
</style>