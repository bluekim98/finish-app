<template>
    <VContainer class="fill-height"
                fluid
                style="background-color: #f8fafc">
        <VRow justify="center"
              align-content="start"
              class="ma-0 pa-0"
              style="min-height: 90vh">
            <VCol cols="12"
                  sm="8"
                  md="6"
                  lg="4"
                  class="text-center py-6">
                <!-- Logo or Branding -->
                <div class="mb-4">
                    <VIcon size="40"
                           color="teal">person</VIcon>
                </div>

                <!-- Title -->
                <h1 class="text-h6 font-weight-medium mb-4">
                    계정에 로그인하세요
                </h1>

                <!-- Login Form -->
                <VForm ref="loginForm"
                       v-model="isFormValid"
                       @submit.prevent="fetchSignIn">
                    <VTextField v-model="username"
                                label="이메일"
                                placeholder="이메일을 입력하세요"
                                variant="outlined"
                                density="comfortable"
                                :clearable="true"
                                class="mb-0"></VTextField>

                    <VTextField v-model="password"
                                label="비밀번호"
                                placeholder="비밀번호를 입력하세요"
                                variant="outlined"
                                density="comfortable"
                                type="password"
                                :clearable="true"
                                class="mb-4"></VTextField>

                    <VBtn :disabled="!isFormValid"
                          color="teal"
                          block
                          height="44"
                          type="submit"
                          class="custom-btn">
                        로그인
                    </VBtn>
                </VForm>

                <!-- Divider -->
                <div class="my-4">
                    <VDivider />
                </div>

                <!-- Kakao Login Button -->
                <div class="mb-4">
                    <VBtn block
                          height="44"
                          type="button"
                          class="custom-btn"
                          style="background-color: #fce38a; color: #3b1d1d"
                          @click="loginWithKakao">
                        <VIcon left
                               color="#3b1d1d">chat</VIcon>
                        카카오로 로그인
                    </VBtn>
                </div>

                <!-- Sign Up Area -->
                <div>
                    <p class="text-body-2">
                        계정이 없으신가요?
                        <VBtn variant="text"
                              color="teal"
                              class="font-weight-bold"
                              @click="goToSignUp">
                            회원가입
                        </VBtn>
                    </p>
                </div>

                <!-- ID / Password Recovery -->
                <div class="mt-6 text-center d-flex align-center justify-center">
                    <VBtn variant="text"
                          color="grey-darken-1"
                          class="text-caption font-weight-medium mx-2"
                          @click="findId">
                        이메일 찾기
                    </VBtn>
                    <VDivider vertical
                              class="mx-2"
                              style="height: 1em; align-self: center; background-color: #616161" />
                    <VBtn variant="text"
                          color="grey-darken-1"
                          class="text-caption font-weight-medium mx-2"
                          @click="findPassword">
                        비밀번호 찾기
                    </VBtn>
                </div>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
    layout: 'blank',
});

const username = ref('');
const password = ref('');
const isFormValid = ref(false);
const router = useRouter();

const fetchSignIn = async () => {
    const response = await $fetch('/api/auth/sign-in', {
        method: 'POST',
        body: { username: username.value, password: password.value },
    });
    if (response.error) {
        alert(response.error.message);
    } else {
        router.push('/');
    }
};

const loginWithKakao = () => {
    const kakaoClientId = 'YOUR_KAKAO_CLIENT_ID';
    const redirectUri = 'YOUR_REDIRECT_URI';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${redirectUri}`;
    window.location.href = kakaoAuthUrl; // 카카오 인증 요청
};

const goToSignUp = () => {
    router.push('/auth/sign-up'); // 회원가입 페이지로 이동
};

const findId = () => {
    alert('이메일 찾기 기능으로 이동');
};

const findPassword = () => {
    alert('비밀번호 찾기 기능으로 이동');
};
</script>

<style scoped>
/* 버튼에 은은한 쉐도우 효과 추가 */
.custom-btn {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s ease;
}

.custom-btn:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
}
</style>