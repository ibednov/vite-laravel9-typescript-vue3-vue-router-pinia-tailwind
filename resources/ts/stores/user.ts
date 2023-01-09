import axios from 'axios';
import router from '@/router';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const userData = ref(useStorage('userData', []));
    const userToken: Ref<string> = ref(useStorage('userToken', ''));
    const error: Ref<string> = ref('');

    const getUserData = async () => {
        await axios
            .get('/api/user', {
                headers: { Authorization: `Bearer ${userToken.value}` },
            })
            .then((response) => {
                // console.log('getUser Response ' + response.data)
                userData.value = response.data;
                // console.log('userData' + userData.value)
            });
    };

    const signUp = async (
        name: string,
        email: string,
        password: string,
        c_password: string
    ) => {
        if (password.length > 0) {
            await axios.get('/sanctum/csrf-cookie').then((response) => {
                axios
                    .post('/api/register', {
                        name: name,
                        email: email,
                        password: password,
                        c_password: c_password,
                    })
                    .then((response) => {
                        console.log('RESPONCEEEEE ' + response);
                        if (response.data.success) {
                            userToken.value = response.data.data.token;
                            getUserData();
                            router.push({ name: 'admin', replace: true });
                        } else {
                            error.value = response.data.message;
                            console.log('error  ' + error.value);
                        }
                    });
            });
        }
    };

    const signIn = async (email: string, password: string) => {
        if (password.length > 0) {
            await axios.get('/sanctum/csrf-cookie').then((response) => {
                axios
                    .post('/api/login', {
                        email: email,
                        password: password,
                    })
                    .then((response) => {
                        console.log('RESPONCEEEEE ' + response);
                        if (response.data.success) {
                            userToken.value = response.data.data.token;
                            getUserData();
                            router.push({ name: 'admin', replace: true });
                        } else {
                            error.value = response.data.message;
                            console.log('error  ' + error.value);
                        }
                    });
            });
        }
    };

    const logOut = async () => {
        const instance = axios.create({
            baseURL: 'api/user',
            timeout: 1000,
            headers: { Authorization: 'Bearer ' + userToken.value },
        });

        axios.get('/sanctum/csrf-cookie').then(() => {
            instance
                .get('/api/logout')
                .then((response) => {
                    if (response.data.success) {
                        window.location.href = '/';
                        userData.value = [];
                        userToken.value = '';
                    } else {
                        console.log('else response ' + response);
                    }
                })
                .catch(function (error) {
                    // console.error(error)
                    console.log('error with logout ' + error);
                });
        });
    };

    return {
        signIn,
        signUp,
        userData,
        userToken,
        error,
        getUserData,
        logOut,
    };
});
