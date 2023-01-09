import { defineStore } from 'pinia';

import { useStorage } from '@vueuse/core';
import { uuid } from 'vue-uuid';

export const useIdeasStore = defineStore('ideas-store', () => {
    const ideas = useStorage('ideas', []);

    const ideaAdd = (
        newTheme: string,
        newDesc: string,
        newStatus: string,
        newAuthor: string,
        newCat: string,
        previewImage: File
    ) => {
        ideas.value.push({
            id: uuid.v4(),
            date_created: new Date(),
            date_updated: new Date(),
            theme: newTheme,
            desc: newDesc,
            status: newStatus,
            author: newAuthor ? newAuthor : '',
            cat: newCat,
            image: previewImage.value,
            likes: 0,
        });
    };

    const ideaRemove = (id: string) => {
        try {
            console.log('try to remove object: ' + id);
            const indexOfObject = ideas.value.findIndex((object: any) => {
                return object.id == id;
            });
            if (indexOfObject !== id) {
                ideas.value.splice(indexOfObject, 1);
            }
        } catch (error) {
            console.log('felse' + error);
        }
    };

    return { ideas, ideaAdd, ideaRemove };
});
