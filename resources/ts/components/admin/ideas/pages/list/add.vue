<!-- eslint-disable vue/valid-v-model -->
<script setup lang="ts">
import { ref } from 'vue';
import { useIdeasStore } from '@/stores/ideas';
import { useCatsStore } from '@/stores/cats';

const newCat = ref();
const newAuthor = ref();
const newStatus = ref();
const newDesc = ref();
const newTheme = ref();

const success = ref(false);

// stores
const cats: object = useCatsStore().cats;
const ideas: object = ref(useIdeasStore());

// methods
const add = () => {
    if (
        newTheme.value &&
        newDesc.value &&
        newStatus.value &&
        newCat.value &&
        previewImage.value
    ) {
        ideas.value.ideaAdd(
            newTheme,
            newDesc,
            newStatus,
            newAuthor,
            newCat,
            previewImage
        );
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
    <div class="flex flex-col py-3">
        <div class="flex flex-row justify-between py-2 px-10">
            <div class="text-2xl font-semibold">Добавление идеи</div>
            <div class="flex flex-row gap-2">
                <router-link
                    :to="{ name: 'ideas-list' }"
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
        <div class="px-10 flex flex-row gap-2 w-full">
            <form class="flex flex-col w-1/2 gap-4 py-2">
                <select
                    required
                    v-model="newCat"
                    class="bg-third w-1/2 p-2 rounded text-sm focus:bg-white focus:border-1 focus:border-third"
                >
                    <option selected value="">Категория</option>
                    <option :value="i.id" v-for="i in cats" v-bind:key="i.id">
                        {{ i.name }}
                    </option>
                </select>

                <input
                    v-model="newAuthor"
                    type="text"
                    class="bg-third w-full p-2 rounded text-sm focus:bg-white focus:border-1 focus:border-third"
                    placeholder="Имя создателя"
                />
                <input
                    required
                    v-model="newTheme"
                    type="text"
                    class="bg-third w-full p-2 rounded text-sm focus:bg-white focus:border-1 focus:border-third"
                    placeholder="Тема"
                />
                <input
                    required
                    v-model="newDesc"
                    type="text"
                    class="bg-third w-full p-2 rounded text-sm focus:bg-white focus:border-1 focus:border-third"
                    placeholder="Описание"
                />
                <div class="flex flex-row gap-x-4">
                    <select
                        v-model="newStatus"
                        required
                        class="bg-third w-1/2 p-2 rounded text-sm focus:bg-white focus:border-1 focus:border-third"
                    >
                        <option selected disabled value="">Cтатус</option>
                        <option value="completed">Реализовано</option>
                        <option value="work">В процессе</option>
                        <option value="new">Новая</option>
                    </select>

                    <div class="w-1/2">
                        <!-- eslint-disable-next-line vue/valid-v-model -->
                        <input
                            required
                            class="w-full h-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-third"
                            type="file"
                            ref="uploadedImage"
                            v-on:change="handleFileUpload()"
                        />
                    </div>
                </div>

                {{ newCat }}
            </form>

            <div
                class="flex flex-col justify-center w-1/2 px-5"
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
