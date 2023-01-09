<script setup lang="ts">
import { useCatsStore } from '@/stores/cats';
import { useIdeasStore } from '@/stores/ideas';
import moment from 'moment';

const ideas = useIdeasStore();
const cats = useCatsStore();

console.log(cats);

const remove = (id: string) => {
    console.log('try to remove');
    ideas.ideaRemove(id);
};
</script>

<template>
    <div class="flex flex-col py-4">
        <div class="px-10">
            <div
                class="flex bg-second h-20 rounded justify-center items-center w-full"
            >
                filters
            </div>
        </div>

        <div v-if="ideas.ideas" class="flex flex-row w-full">
            <table class="w-full mt-4 font-semibold text-sm">
                <thead class="bg-second text-gray-500 py-10">
                    <tr class="py-10">
                        <td class="pl-10 py-4">#</td>
                        <td>Категория</td>
                        <td>Имя создателя</td>
                        <td>Дата создания</td>
                        <td>Тема</td>
                        <td>Кол-во лайков</td>
                        <td>Статус</td>
                        <td class="pr-10">Действие</td>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(i, index) in ideas.ideas"
                        v-bind:key="i?.id"
                        class="border-b-2 py-2"
                    >
                        <td class="pl-10">{{ index + 1 }}</td>
                        <td>
                            <div v-for="c in cats.cats" :key="c.id">
                                <div v-if="i.cat === c.id">
                                    {{ c.name }}
                                </div>
                            </div>
                        </td>
                        <td>
                            {{ i?.author }}
                        </td>
                        <td>{{ moment(i?.date).format('D.MM.YYYY') }}</td>
                        <td>{{ i?.theme }}</td>
                        <td>{{ i?.likes }}</td>
                        <td>{{ i?.status }}</td>

                        <td class="pb-10 align-middle flex items-center">
                            <div class="flex flex-row gap-2 top-10 self-center">
                                <button
                                    @click="remove(i.id)"
                                    class="self-center"
                                >
                                    Удалить
                                </button>
                                <router-link
                                    :to="{
                                        name: 'ideas-edit',
                                        params: { id: index },
                                    }"
                                    >Редактировать</router-link
                                >
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="p-4 text-center" v-else>Идей нет. Но вы держитесь</div>
    </div>
</template>

<style scoped>
/* need to fix */
table tbody tr td:nth-last-child(1) {
    vertical-align: middle;
    padding-top: 1rem;
    margin-top: 1rem;
}
</style>
