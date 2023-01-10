<script setup lang="ts">
import { useCatsStore } from '@/stores/cats';
import { useIdeasStore } from '@/stores/ideas';
import moment from 'moment';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeId = computed(() => route.params.id);
// console.log(routeId.value);

const ideas = ref(useIdeasStore());
const catsId = computed(() => useCatsStore().cats[routeId.value].stringId);

const newAuthor = ref();
const newDesc = ref();
const newTheme = ref();
const newStatus = ref();
const newCat = ref();
const previewImage: object = ref({
    image: ref(null),
    imageUrl: ref(null),
});

// console.log(catsId.value);

ideas.value.getIdeas();

const ideasByCat: object = computed(() =>
    ideas.value.ideas.filter((i: object) =>
        i?.category === catsId.value ? i : ''
    )
);

const isDescMinified = ref(true);

// console.log(ideasByCat);

const isModalOpen = ref(false);

// methods
const add = () => {
    if (newTheme.value && newDesc.value) {
        (newStatus.value = 'new'),
            (newCat.value = catsId.value),
            (previewImage.value.imageUrl = 'hehe im not image');

        console.log(newCat.value);

        ideas.value.frontIdeaAdd(
            newTheme,
            newDesc,
            newStatus,
            newAuthor,
            newCat,
            previewImage
        );

        isModalOpen.value = false;
        ideas.value.getIdeas();
        // success.value = true;
    } else {
        alert('Это простая проверка. Заполните все поля');
    }
};
</script>

<template>
    <div class="flex flex-row justify-between py-10">
        <div class="flex flex-row gap-x-6">
            <select
                class="bg-white border-third border-2 px-6 py-3 rounded"
                placeholder="Статус"
            >
                <option value="" selected>Статус</option>
                <option value="">Реализована</option>
                <option value="">В реализации</option>
                <option value="">Новая</option>
            </select>
            <select class="bg-white border-third border-2 px-6 py-3 rounded">
                <option value="" selected>Сортировать по...</option>
                <option value="">По возрастанию</option>
                <option value="">По убыванию</option>
                <option value="">По дате создания</option>
            </select>
        </div>
        <button
            class="bg-main py-3 px-6 font-semibold rounded-md"
            @click="isModalOpen = true"
        >
            Поделиться идеей
        </button>
    </div>

    <div class="flex flex-col gap-4 py-10">
        <div class="flex flex-col gap-4" v-for="i in ideasByCat" :key="i.id">
            <div class="text-2xl font-semibold">
                {{ i.theme }}
            </div>

            <div class="flex flex-row gap-x-6 text-sm text-slate-400">
                <div>
                    {{
                        i?.status == 'completed'
                            ? 'Реализована'
                            : i?.status == 'work'
                            ? 'В реализации'
                            : 'Новая'
                    }}
                </div>
                <div class="">от: {{ i.author ? i.author : 'аноним' }}</div>
                <div class="">
                    {{ moment(i?.created_at).format('D.MM.YYYY') }}
                </div>
            </div>

            <div
                class="flex flex-col gap-y-6 text-left justify-start"
                v-if="isDescMinified === true"
            >
                <div class="">{{ i.desc.substring(0, 160) }}...</div>
                <button
                    @click="isDescMinified = false"
                    class="text-main"
                    v-if="i.desc.length > 159"
                >
                    Читать далее
                </button>
            </div>

            <div
                class="flex flex-col gap-y-6 text-left justify-start"
                v-if="isDescMinified === false"
            >
                <div>{{ i.desc }}</div>
                <button @click="isDescMinified = true" class="text-main">
                    Свернуть
                </button>
            </div>

            <hr />
        </div>
    </div>

    <!-- Main modal -->
    <div
        v-if="isModalOpen"
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="flex justify-center items-center fixed top-0 left-0 bg-slate-400 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
        <div class="relative w-full h-full max-w-md md:h-auto">
            <div
                class="relative bg-white w-full rounded-lg shadow dark:bg-gray-700"
            >
                <button
                    @click="isModalOpen = false"
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-semibold">Поделиться идеей</h3>
                    <form class="space-y-6" action="#">
                        <div>
                            <label
                                class="block mb-2 text-sm font-medium font-semibold"
                                >Автор</label
                            >
                            <input
                                type="text"
                                v-model="newAuthor"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Автор"
                            />
                        </div>

                        <div>
                            <label
                                class="block mb-2 text-sm font-medium font-semibold"
                                >Тема</label
                            >
                            <input
                                type="text"
                                v-model="newTheme"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Тема"
                                required
                            />
                        </div>

                        <div>
                            <label
                                class="block mb-2 text-sm font-medium font-semibold"
                                >Описание</label
                            >
                            <input
                                type="text"
                                v-model="newDesc"
                                class="bg-gray-50 border з-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Описание"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            class="w-full bg-third hover:bg-mainHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Прикрепить файл
                        </button>

                        <button
                            @click.prevent="add()"
                            type="submit"
                            class="w-full bg-main hover:bg-mainHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Предложить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
