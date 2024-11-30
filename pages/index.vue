<template>
    <div>
        hello
    </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const isAuth = ref(false)
if (!isAuth.value) {
    router.push('/login')
}
</script>

<style></style>