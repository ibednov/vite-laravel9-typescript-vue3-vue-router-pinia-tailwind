<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const routeName = computed(() => route.name);

const isTabActive = 'bg-main px-4 py-1 text-xs font-semibold rounded';
const isTabUnactive = 'bg-transparent px-4 py-1 text-xs font-semibold rounded';
</script>

<template>
    <div
        class="flex flex-row items-center w-full justify-between bg-second py-4 px-10"
    >
        <div class="flex text-2xl font-semibold self-start">Список идей</div>

        <div
            class="flex flex-row gap-2 border rounded border-gray-400 py-1 px-1 justify-self-center"
        >
            <router-link :to="{ name: 'ideas-tutorial' }" v-slot="{ isActive }">
                <div :class="isActive ? isTabActive : isTabUnactive">
                    Инструкция
                </div>
            </router-link>
            <router-link :to="{ name: 'ideas-cats' }" v-slot="{ isActive }">
                <div :class="isActive ? isTabActive : isTabUnactive">
                    Категория идей
                </div>
            </router-link>
            <router-link :to="{ name: 'ideas-list' }" v-slot="{ isActive }">
                <div :class="isActive ? isTabActive : isTabUnactive">
                    Список идей
                </div>
            </router-link>
        </div>

        <div class="flex self-end w-1/6 gap-x-4 items-center">
            <div class="flex justify-self-end justify-items-end">
                <router-link
                    :to="{
                        name: 'ideas-add-cat',
                    }"
                    v-if="routeName == 'ideas-cats-index'"
                    class="bg-main py-2 px-3 rounded text-xs font-semibold"
                >
                    Добавить категорию
                </router-link>
                <router-link
                    :to="{
                        name: 'ideas-add-idea',
                    }"
                    v-if="routeName == 'ideas-list-index'"
                    class="bg-main py-2 px-3 rounded text-xs font-semibold"
                >
                    Добавить Идею
                </router-link>
            </div>

            <div>
                <button class="font-semibold">RU</button>
            </div>
        </div>
    </div>
</template>
