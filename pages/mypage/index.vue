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
                <VListItem class="menu-item"
                           append-icon="chevron_right">
                    <VRow class="ma-0">
                        <VCol class="pa-0 mr-4"
                              cols="auto">
                            <VAvatar size="46"
                                     class="profile-avatar">👤</VAvatar>
                        </VCol>
                        <VCol class="pa-0">
                            <div class="profile-details">
                                <div class="profile-name">{{ user.name }}</div>
                                <div class="profile-edit">내 정보 수정하기</div>
                            </div>
                        </VCol>
                    </VRow>
                </VListItem>
            </VList>
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
    name: useAuth().session.value.name,
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

/* 좌측 정렬 */
.title-text {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
}

/* 섹션 스타일 */
.profile-section,
.menu-section {
    margin-top: 12px;
    padding: 8px;
    border-radius: 0px;
    background-color: white;
}

/* 그림자 제거 */
.profile-section,
.menu-section {
    box-shadow: none;
}

/* 프로필 정보 */
.VListItem {
    display: flex;
    align-items: center;
    gap: 12px;
}

/* 프로필 사진 (이전보다 작게) */
.profile-avatar {
    background-color: #ddd;
    flex-shrink: 0;
}

/* 프로필 세부 정보 */
.profile-details {
    display: flex;
    flex-direction: column;
    width: 100%;
}

/* 이름 */
.profile-name {
    font-size: 16px;
    font-weight: bold;
}

/* 내 정보 수정 버튼 */
.profile-edit {
    font-size: 13px;
    color: #aaa;
}

/* 메뉴 리스트 */
.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: black;
    border-bottom: 1px solid #eee;
    background-color: #f9f9f9;
}

/* 마지막 메뉴 항목의 테두리 제거 */
.menu-item:last-child {
    border-bottom: none;
}
</style>
