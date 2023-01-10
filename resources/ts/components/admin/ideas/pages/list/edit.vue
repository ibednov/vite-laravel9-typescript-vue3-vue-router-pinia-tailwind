<script setup lang="ts">
import { useCatsStore } from '@/stores/cats';
import { useIdeasStore } from '@/stores/ideas';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const routeId = route.params.id;

const idea = useIdeasStore().ideas[routeId];

const ideaId = useIdeasStore().ideas[routeId].id;
const cats: object = useCatsStore().cats;

console.log(ideaId);

const newCat = ref();
const newAuthor = ref();
const newStatus = ref();
const newDesc = ref();
const newTheme = ref();
const previewImage: object = ref({
    image: ref(null),
    imageUrl: ref(null),
});

onMounted(() => {
    if (idea.theme) newTheme.value = idea.theme;
    if (idea.desc) newDesc.value = idea.desc;
    if (idea.status) newStatus.value = idea.status;
    if (idea.author) newAuthor.value = idea.author;
    if (idea.category) newCat.value = idea.category;
    if (idea.previewImage) previewImage.value = idea.previewImage;
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
    // if (newTheme.value && previewImage.value && newDesc.value) {
    //     const object = {
    //         id: idea.id,
    //         date_created: idea.date_created,
    //         date_updated: new Date(),
    //         theme: newTheme,
    //         desc: newDesc,
    //         status: newStatus,
    //         author: newAuthor,
    //         cat: newCat,
    //         image: previewImage.value,
    //         likes: 0,
    //     };

    //     useIdeasStore().ideas[ideaId] = object;

    //     router.push({ name: 'ideas-list', replace: true });
    // } else {
    //     alert('Заполните все поля');
    // }

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    };

    if (newTheme.value && previewImage.value && newDesc.value) {
        const data = {
            id: idea.id,
            desc: newDesc.value,
            image: previewImage.value,
            likes: idea.likes,
            theme: newTheme.value,
            status: newStatus.value,
            author: newAuthor.value,
            category: newCat.value,
        };

        axios.get('/sanctum/csrf-cookie', config).then((response) => {
            axios
                .post('/api/ideas/update/' + ideaId, data, config)
                .then((response) => {
                    // router.push({ name: 'ideas-list' });
                })
                .catch(function (error) {
                    console.error(error);
                });
        });

        // useCatsStore().cats[catId] = object;
        router.push({ name: 'ideas-list', replace: true });
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
            <div class="text-2xl font-semibold">Редактирование идеи</div>
            <div class="flex flex-row gap-2">
                <router-link
                    :to="{ name: 'ideas-list' }"
                    class="px-3 py-2 bg-third rounded text-xs font-semibold"
                >
                    Отменить
                </router-link>
                <button
                    @click="edit()"
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
                    <option disabled selected value="">Категория</option>
                    <option
                        :value="i.stringId"
                        v-for="i in cats"
                        v-bind:key="i.id"
                    >
                        {{ i.name }}
                    </option>
                </select>

                <input
                    v-model="newAuthor"
                    required
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
