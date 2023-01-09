// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { uuid } from 'vue-uuid';

export const useCatsStore = defineStore('cats-store', () => {
    const cats: object = useStorage('cats', []);

    const catsAdd = (
        newName: string,
        newDesc: string,
        previewImage: File,
        newState: boolean
    ) => {
        cats.value.push({
            id: uuid.v4(),
            name: newName?.value,
            desc: newDesc?.value,
            image: previewImage.value,
            likes: 0,
            countIdeas: 0,
            isEnabled: newState ? newState : true,
        });
        newName.value = '';
        newDesc.value = '';
        previewImage.value = null;
    };

    const catsRemove = (id: string) => {
        try {
            console.log('try to remove object: ' + id);
            const indexOfObject = cats.value.findIndex((object: any) => {
                return object.id == id;
            });
            if (indexOfObject !== id) {
                cats.value.splice(indexOfObject, 1);
            }
        } catch (error) {
            console.log('felse' + error);
        }
    };

    return { cats, catsAdd, catsRemove };
});
