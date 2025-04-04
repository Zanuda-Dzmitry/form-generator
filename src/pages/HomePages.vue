<template>
  <div class="form-page">
    <h1>Регистрация</h1>
    <FormGenerator
      :fields="fields"
      submit-text="Зарегистрироваться"
      cancel-text="Отмена"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <template #field-password="{ field }">
        <div class="custom-field">
          <label>{{ field.label }} <span class="required-mark">*</span></label>
          <input
            v-model="formStore.formData[field.name]"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="field.placeholder"
            required
            class="field-input"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="toggle-password"
          >
            {{ showPassword ? "Скрыть" : "Показать" }}
          </button>
        </div>
      </template>
    </FormGenerator>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FormGenerator from "@/components/FormGenerator.vue";
import { useFormStore } from "@/stores/formStore";
import type { FormField } from "../types";

const showPassword = ref(false);
const formStore = useFormStore();

const fields: FormField[] = [
  {
    name: "username",
    type: "text",
    label: "Имя пользователя",
    placeholder: "Введите имя пользователя",
    required: true,
    validation: (value: string) => value.length >= 3 || "Минимум 3 символа",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Введите ваш email",
    required: true,
    validation: (value: string) =>
      /.+@.+\..+/.test(value) || "Некорректный email",
  },
  {
    name: "password",
    type: "password",
    label: "Пароль",
    placeholder: "Введите пароль",
    required: true,
    validation: (value: string) => value.length >= 6 || "Минимум 6 символов",
  },
  {
    name: "agree",
    type: "checkbox",
    label: "Я согласен с условиями использования",
    required: true,
    validation: (value: boolean) => value || "Необходимо согласие",
  },
];

onMounted(() => {
  formStore.initializeForm(fields);
});

const handleSubmit = () => {
  alert(`Регистрация: ${JSON.stringify(formStore.formData)}`);
};

const handleCancel = () => {
  alert("Отмена регистрации");
  formStore.resetForm();
};
</script>

<style lang="scss" scoped>
.form-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;

  .custom-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .field-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .toggle-password {
      align-self: flex-start;
      background: none;
      border: none;
      color: #646cff;
      cursor: pointer;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  }
}
</style>
