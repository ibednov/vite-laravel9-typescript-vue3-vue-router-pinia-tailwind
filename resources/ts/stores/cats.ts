// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { uuid } from 'vue-uuid';
import axios from 'axios';

export const useCatsStore = defineStore('cats-store', () => {
    const cats: object = useStorage('cats', []);

    const cat: object = [];
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    };

    const getCats = () => {
        axios.get('/sanctum/csrf-cookie').then((response) => {
            axios
                .get('/api/categories', config)
                .then((response) => {
                    cats.value = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
        return cats;
    };

    // need to fix
    const getCatsByID = (id: number) => {
        axios.get('/sanctum/csrf-cookie', config).then((response) => {
            axios
                .get('/api/categories/edit/' + id, config)
                .then((response) => {
                    return response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    };

    const catsAdd = (
        newName: string,
        newDesc: string,
        previewImage: File,
        newState: boolean
    ) => {
        const data = {
            stringId: uuid.v4(),
            name: newName?.value,
            desc: newDesc?.value,
            isEnabled: newState ? newState : true,
            likes: 0,
            countIdeas: 0,
            image: previewImage.value.imageUrl.toString(),
        };

        console.log(data);

        // const reqInstance = axios.create({
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        //     },
        // });

        axios
            .post('/api/categories/add', data, config)
            .then((response) => {
                // router.push({name: 'books'})
            })
            .catch(function (error) {
                console.error(error);
            });

        // Axios.get(
        //     'http://localhost:8000/api/v1/get_token_payloads',
        //     bodyParameters,
        //     config
        // )
        //     .then(console.log)
        //     .catch(console.log);

        newName.value = '';
        newDesc.value = '';
        previewImage.value = null;
    };

    const catsRemove = (id: string) => {
        axios.get('/sanctum/csrf-cookie').then((response) => {
            axios
                .delete('/api/categories/delete/' + id, config)
                .then((response) => {
                    console.log('try to remove object: ' + id);
                    const indexOfObject = cats.value.findIndex(
                        (object: any) => {
                            return object.id == id;
                        }
                    );
                    if (indexOfObject !== id) {
                        cats.value.splice(indexOfObject, 1);
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    };

    return { cats, cat, getCats, getCatsByID, catsAdd, catsRemove };
});
