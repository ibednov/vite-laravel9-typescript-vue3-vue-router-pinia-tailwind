<script setup lang="ts">
import { useCatsStore } from '@/stores/cats';
import { computed, ref } from 'vue';

const cats = useCatsStore().getCats();

const catsActive = computed(() =>
    cats.value.filter((i) => (i.isEnabled == true ? i : ''))
);
</script>

<template>
    <div class="text-center">
        <router-link :to="{ name: 'admin' }"> go to admin </router-link>
    </div>

    <div class="container mx-auto px-32">
        <div class="text-3xl font-semibold text-center py-10">Список идей</div>
        <div class="text-xl">
            <p>
                Мы постоянно в поисках актуальных инновационных идей, которые мы
                могли бы воплотить в жизнь.
            </p>
            <p>
                Эта страница - возможность каждому поделиться своими мыслями по
                улучшению или дополнению к нашим проектам и готовым решениям, и
                выразить поддержку идеям, предложенным другими.
            </p>
        </div>

        <hr />

        <div class="text-xl font-semibold py-6">
            Выберите проект, в который Вы хотите добавить идею или проголосовать
        </div>

        <div class="flex flex-row gap-4" v-if="catsActive.length">
            <div
                class="flex flex-col rounded p-0 border-2 border-gray-300"
                v-for="(c, index) in catsActive"
                :key="c.id"
            >
                <img src="@/assets/img/3.png" class="p-0" alt="" />
                <router-link
                    :to="{ name: 'categoryById', params: { id: index } }"
                    class="p-4"
                >
                    <div class="font-semibold text-xl">
                        {{ c.name }}
                    </div>
                    <div class="text-md">
                        {{ c.desc }}
                    </div>
                </router-link>
            </div>
        </div>

        <div v-else>Пока что проектов / категорий нет.</div>

        <RouterView />
    </div>
</template>
