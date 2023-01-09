<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    data: Object,
});

const isOpen = ref(false);
</script>

<template>
    <div class="add-new__col col-sm-6">
        <div class="select add-new__select">
            <button class="btn select__btn add-new__select-btn" type="button">
                <span>Статус</span>
                <svg><use xlink:href="./img/sprite.svg#drop"></use></svg>
            </button>
            <ul class="select__list add-new__select-list">
                <li class="select__item add-new__select-item">Статус 1</li>
                <li class="select__item add-new__select-item">Статус 2</li>
            </ul>
        </div>
    </div>
</template>
