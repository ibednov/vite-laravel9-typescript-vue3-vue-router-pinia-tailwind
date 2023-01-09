<script setup lang="ts">
import ideasHeader from './parts/ideasHeader.vue';
</script>

<template>
    <div class="flex flex-col">
        <ideasHeader />
        <RouterView />
    </div>
</template>
