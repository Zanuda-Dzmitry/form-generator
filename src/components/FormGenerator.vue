<template>
  <form @submit.prevent="handleSubmit" class="form-generator">
    <div v-for="(field, index) in fields" :key="index" class="form-field">
      <!-- Слот для кастомизации поля -->
      <slot
        :name="`field-${field.name}`"
        v-bind="{ field, value: formData[field.name] }"
      >
        <!-- Стандартные поля -->
        <label v-if="field.type !== 'checkbox'" class="field-label">
          {{ field.label }}
          <span v-if="field.required" class="required-mark">*</span>
        </label>

        <!-- Text input -->
        <input
          v-if="
            field.type === 'text' ||
            field.type === 'email' ||
            field.type === 'password' ||
            field.type === 'number'
          "
          v-model="formData[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          :required="field.required"
          :disabled="field.disabled"
          class="field-input"
        />

        <!-- Textarea -->
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.name]"
          :placeholder="field.placeholder"
          :required="field.required"
          :disabled="field.disabled"
          :rows="field.rows || 3"
          class="field-textarea"
        ></textarea>

        <!-- Select -->
        <select
          v-else-if="field.type === 'select'"
          v-model="formData[field.name]"
          :required="field.required"
          :disabled="field.disabled"
          class="field-select"
        >
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Checkbox -->
        <label v-else-if="field.type === 'checkbox'" class="checkbox-label">
          <input
            type="checkbox"
            v-model="formData[field.name]"
            :disabled="field.disabled"
            class="field-checkbox"
          />
          {{ field.label }}
        </label>

        <!-- Ошибки валидации -->
        <span v-if="errors[field.name]" class="error-message">
          {{ errors[field.name] }}
        </span>
      </slot>
    </div>

    <!-- Кнопки формы -->
    <div class="form-actions">
      <slot name="actions" v-bind="{ submitting: submitting }">
        <button
          type="button"
          @click="handleCancel"
          class="cancel-button"
          :disabled="submitting"
        >
          {{ cancelText }}
        </button>
        <button type="submit" class="submit-button" :disabled="submitting">
          {{ submitting ? submittingText : submitText }}
        </button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";

import type { FormField, FormData } from "../types";

// Пропсы компонента
const props = defineProps({
  fields: {
    type: Array as PropType<FormField[]>,
    required: true,
    validator: (value: FormField[]) =>
      value.every((field) => "name" in field && "type" in field),
  },
  modelValue: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  submitText: {
    type: String,
    default: "Сохранить",
  },
  cancelText: {
    type: String,
    default: "Отмена",
  },
  submittingText: {
    type: String,
    default: "Сохранение...",
  },
  validateOnChange: {
    type: Boolean,
    default: false,
  },
});

// Эмиты
const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
  (e: "submit", value: Record<string, any>): void;
  (e: "cancel"): void;
  (e: "field-change", payload: { field: string; value: any }): void;
}>();

// Состояние формы
const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const errors = ref<Record<string, string>>({});
const submitting = ref(false);

// Инициализация формы
props.fields.forEach((field) => {
  if (!(field.name in formData.value)) {
    formData.value[field.name] = field.type === "checkbox" ? false : "";
  }
});

// Валидация поля
const validateField = (fieldName: string) => {
  const field = props.fields.find((f) => f.name === fieldName);
  if (!field || !field.validation) return true;

  const result = field.validation(formData.value[fieldName]);
  if (typeof result === "string") {
    errors.value[fieldName] = result;
    return false;
  }

  delete errors.value[fieldName];
  return result;
};

// Валидация всей формы
const validateForm = () => {
  let isValid = true;
  props.fields.forEach((field) => {
    if (field.validation) {
      const fieldValid = validateField(field.name);
      if (!fieldValid) isValid = false;
    }
  });
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  submitting.value = true;
  try {
    emit("submit", formData.value);
  } finally {
    submitting.value = false;
  }
};

const handleCancel = () => {
  emit("cancel");
};

// Следим за изменениями modelValue извне
watch(
  formData,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.form-generator {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .field-label {
      font-weight: 500;
      color: #333;

      .required-mark {
        color: red;
      }
    }

    .field-input,
    .field-textarea,
    .field-select {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: #646cff;
      }
    }

    .field-textarea {
      resize: vertical;
      min-height: 100px;
    }

    .field-select {
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      .field-checkbox {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    .error-message {
      color: #ff4d4f;
      font-size: 0.875rem;
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;

    .submit-button,
    .cancel-button {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;

      &:disabled {
        cursor: not-allowed;
      }
    }

    .submit-button {
      background-color: #646cff;
      color: white;
      border: none;

      &:hover {
        background-color: #535bf2;
      }

      &:disabled {
        background-color: #ccc;
      }
    }

    .cancel-button {
      background-color: transparent;
      border: 1px solid #ddd;
      color: #666;

      &:hover {
        border-color: #bbb;
        color: #333;
      }

      &:disabled {
        opacity: 0.6;
      }
    }
  }
}
</style>
