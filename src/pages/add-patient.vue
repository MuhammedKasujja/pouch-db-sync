<template>
    <div>
        Add user
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name">Name:</label>
                <input v-model="formData.name" id="name" type="text" />
                <span v-if="errors?.name">{{ errors.name }}</span>
            </div>
            <div>
                <label for="age">Age:</label>
                <input v-model="formData.age" id="age" type="number" />
                <span v-if="errors?.age">{{ errors.age }}</span>
            </div>
            <div>
                <label for="email">Email:</label>
                <input v-model="formData.email" id="email" />
                <span v-if="errors?.email">{{ errors.email }}</span>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { userSchema, User } from '../schemas/userSchema';
import { ref } from 'vue';
import { generateErrorMap, errorsMap } from "../utils/handleZodError";

const formData = ref<User>({
    name: '',
    age: 0,
    email: '',
});

const errors = errorsMap(formData.value);

const handleSubmit = () => {
    const result = userSchema.safeParse(formData.value);
    if (!result.success) {
        errors.value = generateErrorMap(result.error);
    } else {
        errors.value = undefined;
        // Handle valid data
        console.log('Form data is valid:', formData.value);
    }
}

</script>

<style scoped>
span {
    color: red;
}
</style>