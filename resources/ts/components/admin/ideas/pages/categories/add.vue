<script setup lang="ts">
import { ref } from 'vue';
import { useCatsStore } from '@/stores/cats';

const newName = ref();
const newDesc = ref();

const success = ref(false);

const cats: object = ref(useCatsStore());

const add = () => {
    // console.log('form submitted');
    if (newName.value && previewImage.value && newDesc.value) {
        cats.value.catsAdd(newName, newDesc, previewImage);
        success.value = true;
    } else {
        alert('Заполните все поля');
    }
};

const previewImage: object = ref({
    image: ref(null),
    imageUrl: ref(null),
});

const uploadedImage = ref<File | null>();

const handleFileUpload = async () => {
    // console.log('aere you upload?');
    // console.log('selected file', previewImage.value.files[0]);
    const file = uploadedImage.value.files[0];
    previewImage.value = file;
    previewImage.value.imageUrl = URL.createObjectURL(file);
    console.log(previewImage.value);
};

const imageRemove = () => {
    console.log('try to remove');
    previewImage.value = null;
};
</script>

<template>
    <div
        v-if="success"
        id="popup-modal"
        tabindex="-1"
        class="flex fixed top-0 left-0 right-0 justify-center z-50 p-4 bg-slate-300 text-black overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
        <div class="relative w-full h-full max-w-md md:h-auto">
            <div class="relative bg-third rounded-lg shadow">
                <button
                    @click="success = false"
                    type="button"
                    class="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal"
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
                <div class="p-6 text-center">
                    <svg
                        aria-hidden="true"
                        class="mx-auto mb-4 text-black w-14 h-14"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-black">
                        Вы успешно добавили категорию, хотите добавить еще одну?
                    </h3>
                    <button
                        @click="success = false"
                        data-modal-hide="popup-modal"
                        type="button"
                        class="text-black bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                        Да
                    </button>
                    <router-link
                        :to="{
                            name: 'ideas-cats',
                        }"
                        data-modal-hide="popup-modal"
                        type="button"
                        class="text-black bg-main hover:bg-mainHover focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                    >
                        Нет, верните меня к списку категорий
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col py-3">
        <div class="flex flex-row justify-between py-2 px-10">
            <div class="text-2xl font-semibold">Добавление категории</div>
            <div class="flex flex-row gap-2">
                <router-link
                    :to="{ name: 'ideas-cats' }"
                    class="px-3 py-2 bg-third rounded text-xs font-semibold"
                >
                    Отменить
                </router-link>
                <button
                    @click="add()"
                    class="px-3 py-2 bg-main rounded text-xs font-semibold"
                >
                    Создать
                </button>
            </div>
        </div>
        <hr />
        <div class="flex flex-row gap-2 w-full py-4 px-10">
            <form class="flex flex-col w-1/2 gap-4 py-2">
                <input
                    v-model="newName"
                    required
                    type="text"
                    class="bg-third w-full p-2 rounded text-sm focus:bg-white focus:border-1 focus:border-third"
                    placeholder="Название категории"
                />

                <input
                    required
                    v-model="newDesc"
                    type="text"
                    class="bg-third w-full p-2 rounded text-sm focus:bg-white focus:border-1 focus:border-third"
                    placeholder="Описание"
                />
                <div
                    class="flex flex-row gap-x-4"
                    v-if="!previewImage?.imageUrl"
                    required
                >
                    <div class="flex items-center justify-center w-full">
                        <label
                            for="dropzone-file"
                            class="flex flex-row justify-between items-center py-2 px-4 w-full rounded bg-white border-2 border-dotted border-slate-400"
                        >
                            <div
                                class="flex flex-col items-center justify-center pt-5 pb-6"
                            >
                                <p
                                    class="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400"
                                >
                                    Перетащите фото сюда или
                                    <span class="underline">выберите файл</span>
                                </p>
                                <p
                                    class="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    SVG, PNG, JPG or GIF
                                </p>
                            </div>
                            <div class="bg-third rounded px-4 py-2">
                                Загрузить
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                ref="uploadedImage"
                                v-on:change="handleFileUpload()"
                                hidden
                            />
                        </label>
                    </div>
                </div>
            </form>

            <div class="flex flex-col w-1/2 px-5" v-if="previewImage?.imageUrl">
                <div class="flex flex-row justify-between">
                    <div class="font-semibold">Превью изображения</div>
                    <button
                        class="bg-third px-4 py-2 rounded"
                        @click="imageRemove()"
                    >
                        Удалить изображение
                    </button>
                </div>
                <img
                    :src="previewImage?.imageUrl"
                    alt=""
                    accept="image/*"
                    capture
                    class="self-center"
                />
            </div>
        </div>
    </div>
</template>
