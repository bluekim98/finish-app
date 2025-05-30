<template>
    <VApp>
        <VLayout>
            <!-- 동적으로 페이지 콘텐츠 삽입 -->
            <VMain class="content-container">
                <NuxtPage />
            </VMain>

            <!-- 하단 네비게이션 -->
            <VBottomNavigation :model-value="value"
                               color="transparent"
                               height="64"
                               grow
                               class="bottom-nav"
                               @update:model-value="(v) => {
                                if (v === undefined || v === value) return;
                                value = v;
                            }">
                <VBtn block
                      :ripple="false"
                      variant="plain"
                      @click="$router.push('/ticket')">
                    <VIcon icon="confirmation_number"
                           :color="getFontColor(0)"
                           size="large" />
                    <span :class="['title', 'text-' + getFontColor(0)]">수강권</span>
                </VBtn>

                <VBtn block
                      :ripple="false"
                      variant="plain"
                      @click="$router.push('/reservation')">
                    <VIcon icon="calendar_today"
                           :color="getFontColor(1)"
                           size="large" />
                    <span :class="['title', 'text-' + getFontColor(1)]">예약</span>
                </VBtn>

                <VBtn block
                      :ripple="false"
                      variant="plain"
                      @click="$router.push('/mypage')">
                    <VIcon icon="account_circle"
                           :color="getFontColor(2)"
                           size="large" />
                    <span :class="['title', 'text-' + getFontColor(2)]">마이페이지</span>
                </VBtn>
            </VBottomNavigation>
        </VLayout>
    </VApp>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)

const getFontColor = (index: number) => {
    return index === value.value ? 'primary' : 'grey-lighten-1'
}
</script>

<style scoped>
/* 하단 네비게이션을 화면 하단에 고정 */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding-bottom: env(safe-area-inset-bottom);
    box-sizing: content-box;
}

/* 상단 영역까지 스크롤 가능하도록 설정 */
.content-container {
    flex-grow: 1;
    overflow-y: auto;
    padding-top: env(safe-area-inset-top);
    padding-bottom: calc(70px + env(safe-area-inset-bottom));
    /* 하단 네비게이션과 겹치지 않도록 패딩 추가 */
    height: calc(100vh - 64px - env(safe-area-inset-bottom));
    /* 네비게이션 높이를 제외한 영역을 자동 조정 */
}

/* 버튼 폰트 크기 조정 */
.title {
    font-size: 0.8em;
    margin: 0.5em;
}
</style>