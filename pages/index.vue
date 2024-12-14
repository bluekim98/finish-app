<template>
    <div>
        hello
    </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const isAuth = ref(false)
if (!isAuth.value) {
    router.push('/auth/sign-in')
}
</script>

<style></style>