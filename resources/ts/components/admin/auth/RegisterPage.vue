<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const name = ref('');
const email = ref('');
const password = ref('');
const c_password = ref('');
const error = ref(null);

const userStore = useUserStore();

const register = async () => {
    await userStore.signUp(
        name.value,
        email.value,
        password.value,
        c_password.value
    );
};
</script>

<template>
    <div
        v-if="error"
        id="alert-2"
        class="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
        role="alert"
    >
        <svg
            aria-hidden="true"
            class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
            ></path>
        </svg>
        <span class="sr-only">Info</span>
        <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
            {{ error }}
        </div>
        <button
            type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
            data-dismiss-target="#alert-2"
            aria-label="Close"
        >
            <span class="sr-only">Close</span>
            <svg
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
        </button>
    </div>

    <form @submit.prevent="register()" class="container mx-auto py-10">
        <div class="mb-6">
            <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Имя пользователя
            </label>
            <input
                id="name"
                v-model="name"
                type="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Ivan"
                required
            />
        </div>
        <div class="mb-6">
            <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Email
            </label>
            <div class="flex">
                <span
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                    @
                </span>
                <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email@alexbednov.work"
                />
            </div>
        </div>
        <div class="mb-6">
            <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Пароль
            </label>
            <input
                id="password"
                v-model="password"
                type="password"
                class="shadow-sm bg-third border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
            />
        </div>
        <div class="mb-6">
            <label
                for="repeat-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Повторите пароль</label
            >
            <input
                id="repeat-password"
                v-model="c_password"
                type="password"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
            />
        </div>
        <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
                <input
                    id="terms"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                />
            </div>
            <label
                for="terms"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                Я соглашаюсь с
                <a
                    href="#"
                    class="text-blue-600 hover:underline dark:text-blue-500"
                >
                    условиями пользования
                </a></label
            >
        </div>
        <button
            type="submit"
            class="bg-main hover:bg-mainHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
            Зарегистрироваться
        </button>

        <div class="flex flex-row gap-4 py-4">
            <div>Уже зарегистрированы?</div>

            <router-link
                :to="{ name: 'login' }"
                href="#"
                class="font-bold text-blue-600 hover:underline dark:text-blue-500"
            >
                Авторизоваться
            </router-link>
        </div>
    </form>
</template>
