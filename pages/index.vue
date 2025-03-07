<template>

</template>

<script lang="ts" setup>
definePageMeta({
    auth: false,
});

onMounted(() => {
    useRouter().push('/ticket');
})

</script>

<style></style>