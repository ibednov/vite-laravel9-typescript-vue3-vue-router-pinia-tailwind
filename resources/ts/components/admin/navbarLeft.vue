<script setup lang="ts">
//

const isTabActive = 'border-l-4 border-main';
const isTabUnactive = 'border-l-4 border-transparent';
</script>

<template>
    <div
        class="flex flex-col md:w-[13%] h-screen bg-black text-white content-between"
    >
        <div class="text-main p-4">
            <div class="pb-5">Список идей</div>

            <div class="border-b border-slate-600" />
        </div>

        <div class="flex flex-col gap-4">
            <router-link v-slot="{ isActive }" :to="{ name: 'ideas' }">
                <div
                    class="px-4 flex flex-row gap-4 items-center"
                    :class="isActive == true ? isTabActive : isTabUnactive"
                >
                    <div>icon</div>
                    <div class="text-main text-xs">Список идей</div>
                </div>
            </router-link>

            <router-link v-slot="{ isActive }" :to="{ name: 'other' }">
                <div
                    class="px-4 flex flex-row gap-4 items-center"
                    :class="isActive == true ? isTabActive : isTabUnactive"
                >
                    <div>icon</div>
                    <div class="text-main text-xs">Другой блок</div>
                </div>
            </router-link>
        </div>

        <div class="flex items-end h-full text-main justify-center">
            <router-link :to="{ name: 'home' }"> go to front</router-link>
        </div>
    </div>
</template>
