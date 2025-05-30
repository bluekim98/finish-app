<template>
    <VContainer class="container">
        <!-- 타이틀 & 알림 아이콘 -->
        <VRow class="title-container">
            <VCol class="font-weight-bold title-text">
                마이페이지
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

        <!-- 개인 정보 -->
        <VCard class="profile-section"
               flat>
            <VList>
                <VListItem class="menu-item no-border"
                           append-icon="chevron_right">
                    <VRow class="ma-0">
                        <VCol class="pa-0 mr-4"
                              cols="auto">
                            <VAvatar size="46"
                                     class="profile-avatar">👤</VAvatar>
                        </VCol>
                        <VCol class="pa-0">
                            <div class="profile-details">
                                <div class="profile-name-wrapper">
                                    <span class="profile-name">{{ user.name }}</span>
                                    <VChip size="small"
                                           color="primary"
                                           variant="flat"
                                           rounded="sm"
                                           class="ml-2 tier-badge">
                                        {{ membership.tierName }}
                                    </VChip>
                                </div>
                                <div class="profile-edit">내 정보 수정하기</div>
                            </div>
                        </VCol>
                    </VRow>
                </VListItem>
            </VList>
        </VCard>

        <!-- 등급 및 혜택 정보 -->
        <VCard class="membership-section elevation-0"
               flat>
            <VExpansionPanels variant="accordion">
                <VExpansionPanel class="membership-expansion-panel">
                    <VExpansionPanelTitle class="membership-tier-title">
                        <VRow no-gutters
                              align="center">
                            <VCol cols="auto"
                                  class="mr-2">
                                👑
                            </VCol>
                            <VCol>
                                {{ membership.tierName }} 등급 혜택 보기
                            </VCol>
                        </VRow>
                    </VExpansionPanelTitle>
                    <VExpansionPanelText class="membership-benefits-text">
                        <VList class="py-0 benefit-list"
                               lines="one">
                            <VListItem v-for="(benefit, index) in membership.benefits"
                                       :key="index"
                                       class="benefit-item"
                                       density="compact">
                                <VRow no-gutters
                                      align="center"
                                      class="fill-height">
                                    <VCol cols="auto"
                                          class="pr-2 d-flex align-center">
                                        <VIcon size="small"
                                               color="primary">mdi-check-circle-outline</VIcon>
                                    </VCol>
                                    <VCol class="d-flex align-center">
                                        <div class="benefit-text">{{ benefit }}</div>
                                    </VCol>
                                </VRow>
                            </VListItem>
                        </VList>
                    </VExpansionPanelText>
                </VExpansionPanel>
            </VExpansionPanels>
        </VCard>

        <VCard class="menu-section"
               flat>
            <VList>
                <VListItem class="menu-item"
                           append-icon="chevron_right">
                    시설 선택
                </VListItem>
                <VListItem class="menu-item"
                           append-icon="chevron_right">
                    이용 내역 조회
                </VListItem>
            </VList>
        </VCard>

        <VCard class="menu-section"
               flat>
            <VList>
                <VListItem class="menu-item"
                           append-icon="chevron_right">
                    애플리케이션 설정
                </VListItem>
                <VListItem class="menu-item"
                           append-icon="chevron_right">
                    고객센터
                </VListItem>
            </VList>
        </VCard>
    </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    auth: true,
});

// 사용자 정보 (더미 데이터)
const user = ref({
    name: useAuth().session.value?.name ?? '고객',
})

// 회원 등급 및 혜택 정보 (VIP 기준 하드코딩)
const membership = ref({
    tierName: 'VIP',
    benefits: [
        '전 지점 이용가능',
        '필드레슨무료(프로경비지원)',
        '야외레슨무료 (프로경비지원)',
        '사전예약 1회권',
        '휴회 5회권',
    ],
});

</script>

<style scoped>
/* 전체 컨테이너 */
.container {
    background-color: #f0f2f5;
    /* 토스 스타일 배경색 */
    padding: 0 16px 16px 16px;
    min-height: 100vh;
}

/* 타이틀 */
.title-container {
    padding-top: 16px;
    margin-bottom: 12px;
    background-color: white;
    /* 타이틀 영역 배경 흰색 */
    margin-left: -16px;
    /* 컨테이너 패딩 고려 */
    margin-right: -16px;
    /* 컨테이너 패딩 고려 */
    padding-left: 16px;
    padding-right: 16px;
}

/* 좌측 정렬 */
.title-text {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
}

/* 섹션 스타일 */
.profile-section,
.membership-section,
.menu-section {
    margin-top: 12px;
    border-radius: 12px;
    /* 토스 스타일 둥근 모서리 */
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    /* 은은한 그림자 */
}

/* 프로필 정보 */
.VListItem.menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid #f0f2f5;
    /* 구분선 색상 변경 */
}

.VListItem.menu-item.no-border {
    border-bottom: none;
}

/* 프로필 사진 (이전보다 작게) */
.profile-avatar {
    background-color: #e0e0e0;
    flex-shrink: 0;
    color: #757575;
}

/* 프로필 세부 정보 */
.profile-details {
    display: flex;
    flex-direction: column;
    width: 100%;
}

/* 프로필 이름과 배지 정렬 */
.profile-name-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    /* 이름과 '내 정보 수정하기' 사이 간격 */
}

.profile-name {
    font-size: 18px;
    font-weight: bold;
}

.tier-badge {
    font-weight: bold;
    /* 폰트 볼드 처리 */
    font-size: 0.72rem;
    /* 폰트 크기 미세 조정 (기존 0.78rem에서 축소) */
    color: white;
    /* Primary 배경색에 맞춰 폰트 흰색으로 */
    padding: 4px 10px;
    /* 좌우 여백 추가, 상하 패딩도 조정 */
    line-height: 1;
    /* 텍스트가 수직 중앙에 오도록 line-height 조정 */
    height: auto;
    /* rounded="sm"으로 인해 border-radius는 Vuetify가 제어, 필요시 아래 주석 해제하여 직접 제어 */
    /* border-radius: 4px !important; */
}

/* 내 정보 수정 버튼 */
.profile-edit {
    font-size: 14px;
    /* 폰트 크기 키움 */
    color: #888;
}

/* 등급 및 혜택 섹션 */
.membership-section {
    /* VCard의 기본 패딩을 제거하거나 VExpansionPanel이 잘 맞도록 조정 */
    padding: 0 !important;
    background-color: transparent !important;
    /* VCard 배경 투명하게 */
}

.membership-expansion-panel {
    background-color: white;
    border-radius: 12px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    /* 내부 컨텐츠가 border-radius를 넘지 않도록 */
}

.membership-expansion-panel:not(:first-child) {
    margin-top: 0;
    /* 아코디언 패널 사이의 기본 마진 제거 */
}

.membership-tier-title {
    font-size: 17px;
    font-weight: 500;
    color: #333;
    padding: 16px;
    background-color: white !important;
    /* menu-item과 동일한 흰색 배경 */
    border-bottom: 1px solid #f0f2f5;
    /* 펼쳐졌을 때 내용과 구분선 */
}

/* 패널이 닫혀있을 때 타이틀 하단 보더 제거 (옵션) */
.v-expansion-panel--active>.v-expansion-panel-title.membership-tier-title {
    /* border-bottom: none; */
    /* 필요에 따라 주석 해제 */
}

.membership-tier-title .v-expansion-panel-title__icon {
    color: #555;
}

.membership-benefits-text {
    padding: 16px !important;
    /* 패딩 일관성 있게 조정 */
    background-color: #f9f9f9 !important;
    /* 타이틀과 대조되는 밝은 회색 배경 */
    /* border-bottom-left-radius와 border-bottom-right-radius는 
       .membership-expansion-panel의 overflow: hidden으로 대체 가능 */
}

.benefit-list {
    background-color: transparent !important;
    /* VList 배경 투명하게 */
}

.benefit-item {
    min-height: auto;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 0 !important;
    padding-right: 0 !important;
}

.benefit-item .VRow {
    width: 100%;
}

.benefit-item .VIcon {
    color: #007aff;
}

.benefit-text {
    font-size: 14px;
    color: #555;
    line-height: 1.5;
    white-space: normal;
    word-break: keep-all;
    text-align: left;
}

/* 메뉴 리스트 */
.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    font-size: 16px;
    font-weight: 500;
    /* 폰트 두께 조정 */
    text-align: left;
    color: #333;
    background-color: white;
    border-bottom: 1px solid #f0f2f5;
}

/* 마지막 메뉴 항목의 테두리 제거 */
.menu-section .VList .menu-item:last-child {
    border-bottom: none;
}

.VListItem:hover {
    background-color: #f9f9f9;
}
</style>
