<script setup lang="ts">
import NavbarLeft from './navbarLeft.vue';
</script>

<template>
    <div class="flex flex-row">
        <NavbarLeft class="" />
        <RouterView class="grow" />
    </div>
</template>
