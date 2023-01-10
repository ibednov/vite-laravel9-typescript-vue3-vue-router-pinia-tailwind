import { defineStore } from 'pinia';

import { useStorage } from '@vueuse/core';
import { uuid } from 'vue-uuid';
import axios from 'axios';

export const useIdeasStore = defineStore('ideas-store', () => {
    const ideas = useStorage('ideas', []);

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    };

    const getIdeas = () => {
        axios.get('/sanctum/csrf-cookie').then((response) => {
            axios
                .get('/api/ideas', config)
                .then((response) => {
                    ideas.value = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
        return ideas;
    };

    const ideaAdd = (
        newTheme: string,
        newDesc: string,
        newStatus: string,
        newAuthor: string,
        newCat: string,
        previewImage: File
    ) => {
        const data = {
            stringId: uuid.v4(),
            theme: newTheme.value,
            desc: newDesc.value,
            status: newStatus.value,
            author: newAuthor.value ? newAuthor.value : '',
            category: newCat.value,
            likes: 0,
            image: previewImage.value.imageUrl.toString(),
        };
        axios
            .post('/api/ideas/add', data, config)
            .then((response) => {
                // router.push({name: 'books'})
            })
            .catch(function (error) {
                console.error(error);
            });

        newTheme.value = '';
        newDesc.value = '';
        newStatus.value = '';
        newCat.value = '';
        newAuthor.value = '';
        previewImage.value = null;
        // previewImage.value.imageUrl = null;
    };

    const frontIdeaAdd = (
        newTheme: string,
        newDesc: string,
        newStatus: string,
        newAuthor: string,
        newCat: string
        // previewImage: File
    ) => {
        const data = {
            stringId: uuid.v4(),
            theme: newTheme.value,
            desc: newDesc.value,
            status: 'new',
            author: newAuthor.value ? newAuthor.value : '',
            category: newCat.value,
            likes: 0,
            image: 'previewImage.value.imageUrl.toString()',
        };
        axios
            .post('/api/ideas/add', data, config)
            .then((response) => {
                // router.push({name: 'books'})
            })
            .catch(function (error) {
                console.error(error);
            });

        newTheme.value = '';
        newDesc.value = '';
        newStatus.value = '';
        newCat.value = '';
        newAuthor.value = '';
    };

    const ideaRemove = (id: string) => {
        axios.get('/sanctum/csrf-cookie').then((response) => {
            axios
                .delete('/api/ideas/delete/' + id, config)
                .then((response) => {
                    console.log('try to remove object: ' + id);
                    const indexOfObject = ideas.value.findIndex(
                        (object: any) => {
                            return object.id == id;
                        }
                    );
                    if (indexOfObject !== id) {
                        ideas.value.splice(indexOfObject, 1);
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    };

    return { ideas, getIdeas, ideaAdd, ideaRemove, frontIdeaAdd };
});
