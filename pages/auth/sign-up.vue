<template>
    <VContainer class="fill-height"
                fluid
                style="background-color: #f8fafc">
        <VRow justify="center"
              align-content="center"
              class="ma-0 pa-0"
              style="min-height: 90vh">
            <VCol class="pa-0"
                  cols="12"
                  sm="8"
                  md="6"
                  lg="4">
                <!-- Previous Button -->
                <VBtn variant="text"
                      prepend-icon="chevron_left"
                      :disabled="currentStep === 1"
                      size="x-small"
                      color="teal"
                      @click="handlePrevious">
                    이전
                </VBtn>

                <!-- Step-by-Step Form -->
                <VForm @submit.prevent="handleNext">
                    <!-- Step 1: Name -->
                    <div v-if="currentStep === 1"
                         class="d-flex flex-column mb-4">
                        <VTextField v-model="formData.name"
                                    placeholder="이름을 입력하세요"
                                    variant="underlined"
                                    :rules="[rules.required]"
                                    class="modern-input mb-2"></VTextField>
                        <div class="d-flex justify-end">
                            <VBtn :disabled="!isCurrentStepValid"
                                  color="teal"
                                  class="next-btn"
                                  type="submit">
                                다음
                            </VBtn>
                        </div>
                    </div>

                    <!-- Step 2: Email -->
                    <div v-else-if="currentStep === 2"
                         class="d-flex flex-column mb-4">
                        <VTextField v-model="formData.email"
                                    placeholder="이메일을 입력하세요"
                                    variant="underlined"
                                    :rules="[rules.required, rules.email]"
                                    class="modern-input mb-2"></VTextField>
                        <div class="d-flex justify-end">
                            <VBtn :disabled="!isCurrentStepValid"
                                  color="teal"
                                  class="next-btn"
                                  type="submit">
                                다음
                            </VBtn>
                        </div>
                    </div>

                    <!-- Step 3: Password -->
                    <div v-else-if="currentStep === 3"
                         class="d-flex flex-column mb-4">
                        <VTextField v-model="formData.password"
                                    placeholder="비밀번호를 입력하세요"
                                    type="password"
                                    variant="underlined"
                                    :rules="[rules.required, rules.password]"
                                    class="modern-input mb-2"></VTextField>
                        <div class="d-flex justify-end">
                            <VBtn :disabled="!isCurrentStepValid"
                                  color="teal"
                                  class="next-btn"
                                  type="submit">
                                다음
                            </VBtn>
                        </div>
                    </div>

                    <!-- Step 4: Phone and Verification -->
                    <template v-else-if="currentStep === 4">
                        <!-- Phone Input -->
                        <div class="d-flex flex-column mb-4">
                            <VTextField v-model="formData.phone"
                                        placeholder="휴대전화번호"
                                        variant="underlined"
                                        :rules="[rules.required, rules.phone]"
                                        class="modern-input mb-2"></VTextField>
                            <div class="d-flex justify-end mb-4">
                                <VBtn color="secondary"
                                      @click="sendVerificationCode">
                                    인증번호 발송
                                </VBtn>
                            </div>

                            <!-- Verification Code Input -->
                            <VTextField v-model="formData.verificationCode"
                                        placeholder="인증번호를 입력하세요"
                                        variant="underlined"
                                        :rules="[rules.required]"
                                        class="modern-input mb-2" />
                            <div class="d-flex justify-end">
                                <VBtn :disabled="!isCurrentStepValid"
                                      color="secondary">
                                    인증
                                </VBtn>
                            </div>

                            <!-- Timer and Resend Button -->
                            <div v-if="isCodeSent"
                                 class="text-center mt-4">
                                <span class="text-caption text-grey-darken-1">
                                    남은 시간: <strong>{{ formattedTime }}</strong>
                                </span>
                                <VBtn variant="text"
                                      class="text-btn mt-2"
                                      @click="resendVerificationCode">
                                    재발송
                                </VBtn>
                            </div>
                        </div>
                        <div class="d-flex justify-end">
                            <VBtn :disabled="!isCurrentStepValid"
                                  color="teal"
                                  class="next-btn"
                                  block
                                  type="submit">
                                가입하기
                            </VBtn>
                        </div>
                    </template>
                </VForm>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

definePageMeta({
    layout: 'blank',
});

const currentStep = ref(1); // 현재 단계
const formData = ref({
    name: "",
    email: "",
    password: "",
    phone: "",
    verificationCode: "",
});
const isCodeSent = ref(false);
const timer = ref(300); // 5분 타이머
let timerInterval: ReturnType<typeof setInterval> | null = null;

// 규칙
const rules = {
    required: (value: string) => !!value || "필수 입력 항목입니다.",
    email: (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "유효한 이메일을 입력하세요.",
    password: (value: string) =>
        /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(value) ||
        "최소 8자, 특수문자와 숫자를 포함해야 합니다.",
    phone: (value: string) => /^\d{10,11}$/.test(value) || "유효한 휴대전화번호를 입력하세요.",
};

// 현재 단계 유효성 검사
const isCurrentStepValid = computed(() => {
    switch (currentStep.value) {
        case 1:
            return rules.required(formData.value.name) === true;
        case 2:
            return rules.required(formData.value.email) === true && rules.email(formData.value.email) === true;
        case 3:
            return rules.required(formData.value.password) === true && rules.password(formData.value.password) === true;
        case 4:
            return (
                rules.required(formData.value.phone) === true &&
                rules.phone(formData.value.phone) === true &&
                rules.required(formData.value.verificationCode) === true
            );
        default:
            return false;
    }
});

// 다음 단계로 이동
const handleNext = () => {
    if (currentStep.value < 4) {
        currentStep.value++;
    } else {
        alert("회원가입이 완료되었습니다!");
    }
};

// 이전 단계로 이동
const handlePrevious = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

// 타이머 시작
const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;
        } else {
            clearInterval(timerInterval!);
        }
    }, 1000);
};

// 타이머 포맷팅
const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (timer.value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
});

// 인증번호 발송
const sendVerificationCode = () => {
    isCodeSent.value = true;
    timer.value = 300; // 5분 초기화
    startTimer();
    alert("인증번호가 발송되었습니다!");
};

// 인증번호 재발송
const resendVerificationCode = () => {
    isCodeSent.value = true;
    timer.value = 300; // 5분 초기화
    startTimer();
    alert("인증번호가 재발송되었습니다!");
};

</script>

<style scoped>
.next-btn {
    background-color: #008080;
    /* teal */
    color: #ffffff;
    font-weight: 600;
    padding: 0.3rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    /* 작은 크기 */
}

.modern-input {
    border-bottom: 2px solid #e0e0e0;
    width: 100%;
}
</style>
