<template>
  <div class="form-page">
    <h1>Обратная связь</h1>
    <FormGenerator
      :fields="fields"
      submit-text="Отправить"
      @submit="handleSubmit"
    >
      <template #actions="{ submitting }">
        <button type="submit" class="submit-button" :disabled="submitting">
          {{ submitting ? "Отправка..." : "Отправить сообщение" }}
        </button>
      </template>
    </FormGenerator>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import FormGenerator from "@/components/FormGenerator.vue";
import { useFormStore } from "@/stores/formStore";
import type { FormField } from "../types";

const formStore = useFormStore();

const fields: FormField[] = [
  {
    name: "name",
    type: "text",
    label: "Ваше имя",
    placeholder: "Как к вам обращаться?",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Ваш email",
    placeholder: "Для обратной связи",
    required: true,
  },
  {
    name: "topic",
    type: "select",
    label: "Тема сообщения",
    required: true,
    options: [
      { value: "question", label: "Вопрос" },
      { value: "suggestion", label: "Предложение" },
      { value: "complaint", label: "Жалоба" },
      { value: "other", label: "Другое" },
    ],
  },
  {
    name: "message",
    type: "textarea",
    label: "Сообщение",
    placeholder: "Опишите вашу проблему или вопрос",
    rows: 5,
    required: true,
  },
  {
    name: "rating",
    type: "select",
    label: "Оценка",
    options: [
      { value: 1, label: "1 - Плохо" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5 - Отлично" },
    ],
  },
];

onMounted(() => {
  formStore.initializeForm(fields);
});

const handleSubmit = () => {
  alert(`Отправка обратной связи: ${JSON.stringify(formStore.formData)}`);
};
</script>

<style lang="scss" scoped>
.form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  .submit-button {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
  }
}
</style>
