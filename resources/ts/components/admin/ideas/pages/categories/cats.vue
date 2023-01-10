<script setup lang="ts">
import { useCatsStore } from '@/stores/cats';

const cats = useCatsStore();

cats.getCats();

const remove = (id: string) => {
    console.log('try to remove');
    cats.catsRemove(id);
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

        <div v-if="cats.cats" class="relative overflow-x-auto sm:rounded-lg">
            <table class="w-full mt-4 font-semibold text-sm">
                <thead class="bg-second text-gray-500 py-10">
                    <tr class="py-10">
                        <th scope="col" class="pl-10 py-4">#</th>
                        <th scope="col">id</th>
                        <th scope="col">Название</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Кол-во идей</th>
                        <th scope="col">Кол-во лайков</th>
                        <th scope="col">Статус</th>
                        <th scope="col" class="pr-10">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(i, index) in cats.cats"
                        v-bind:key="i?.id"
                        class="border-b-2 py-2"
                    >
                        <td class="pl-10">{{ index + 1 }}</td>

                        <td>{{ i?.id }}</td>
                        <td>{{ i?.name }}</td>
                        <td>
                            {{ i?.desc }}
                        </td>
                        <td>{{ i?.countIdeas }}</td>
                        <td>{{ i?.likes }}</td>
                        <td>
                            <div v-if="i.isEnabled == 1">Включена</div>
                            <div v-else>Выключена</div>
                        </td>
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
                                        name: 'cats-edit',
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
