<template>
    <VApp>
        <!-- 동적으로 페이지 콘텐츠 삽입 -->
        <VMain class="content-container">
            <NuxtPage />
        </VMain>
    </VApp>
</template>
<style scoped>
.content-container {
    padding-top: env(safe-area-inset-top);
}
</style>