<script setup lang="ts">
import { useCatsStore } from '@/stores/cats';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const cats = useCatsStore().cats;
const catId = route.params.id;
const cat = useCatsStore().cats[catId];
// const index = cats.indexOf(catId);
console.log(catId);

const newName = ref('');
const newDesc = ref('');
const newState: boolean = ref();
const previewImage: object = ref({
    image: ref(null),
    imageUrl: ref(null),
});

onMounted(() => {
    if (cat.name) newName.value = cat.name;
    if (cat.desc) newDesc.value = cat.desc;
    if (cat.image) previewImage.value = cat.image;
    if (cat.isEnabled) newState.value = cat.isEnabled;
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

const edit = () => {
    if (newName.value && previewImage.value && newDesc.value) {
        console.log(newState.value);
        console.log(cat);

        const object = {
            id: cat.id,
            name: newName.value,
            desc: newDesc.value,
            image: previewImage.value,
            likes: cat.likes,
            countIdeas: cat.countIdeas,
            isEnabled: newState.value,
        };

        useCatsStore().cats[catId] = object;

        router.push({ name: 'ideas-cats', replace: true });
    } else {
        alert('Заполните все поля');
    }
};

const imageRemove = () => {
    console.log('try to remove');
    previewImage.value = null;
};
</script>

<template>
    <div class="flex flex-col py-3">
        <div class="flex flex-row justify-between py-2 px-10">
            <div class="text-2xl font-semibold">Редактирование категории</div>
            <div class="flex flex-row gap-2">
                <router-link
                    :to="{ name: 'ideas-cats' }"
                    class="px-3 py-2 bg-third rounded text-xs font-semibold"
                >
                    Отменить
                </router-link>
                <button
                    @click="edit(cat.id)"
                    class="px-3 py-2 bg-main rounded text-xs font-semibold"
                >
                    Обновить
                </button>
            </div>
        </div>
        <hr />
        <div class="flex flex-row gap-2 w-full py-4 px-10">
            <form class="flex flex-col w-1/2 gap-4 py-2">
                <input
                    v-model="newName"
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
                <div class="flex">
                    <div class="flex items-center h-5">
                        <input
                            id="helper-checkbox"
                            aria-describedby="helper-checkbox-text"
                            type="checkbox"
                            v-model="newState"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div class="ml-2 text-sm">
                        <label
                            for="helper-checkbox"
                            class="font-medium text-black"
                        >
                            Отображать категорию (активна)?
                        </label>
                    </div>
                </div>

                <div
                    class="flex flex-row gap-x-4"
                    v-if="!previewImage?.imageUrl"
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

            <div
                class="flex flex-col w-1/2 px-5 justify-center"
                v-if="previewImage?.imageUrl"
            >
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
