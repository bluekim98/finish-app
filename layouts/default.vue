<template>
    <v-app>
        <v-layout class="overflow-visible">
            <!-- 동적으로 페이지 콘텐츠 삽입 -->
            <v-main>
                <NuxtPage />
            </v-main>

            <!-- 하단 네비게이션 -->
            <v-bottom-navigation :model-value="value"
                                 @update:model-value="(v) => {
                                    if (v === undefined || v === value) return;
                                    value = v;
                                }"
                                 color="teal"
                                 height="64"
                                 grow>
                <v-col class="pa-0">
                    <v-btn block>
                        <v-icon icon="confirmation_number"
                                :color="getFontColor(0)"
                                size="large" />
                        <span class="title text-grey-lighten-1">수강권</span>
                    </v-btn>
                </v-col>

                <v-col class="pa-0">
                    <v-btn block>
                        <v-icon icon="calendar_today"
                                :color="getFontColor(1)"
                                size="large" />
                        <span class="title text-grey-lighten-1">예약</span>
                    </v-btn>
                </v-col>

                <v-col class="pa-0">
                    <v-btn block>
                        <v-icon icon="account_circle"
                                :color="getFontColor(2)"
                                size="large" />
                        <span class="title text-grey-lighten-1">마이페이지</span>
                    </v-btn>
                </v-col>
            </v-bottom-navigation>
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
const value = ref(0)

const getFontColor = (index: number) => {
    return index === value.value ? 'grey-darken-3' : 'grey-lighten-1'
}
</script>

<style scoped>
.title {
    font-size: 0.8em;
    margin: 0.5em;
}
</style>