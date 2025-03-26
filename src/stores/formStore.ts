// stores/formStore.ts
import { defineStore } from "pinia";
import type { FormField, FormData } from "../types";

interface FormState {
  fields: FormField[];
  formData: FormData;
  errors: Record<string, string>;
  submitting: boolean;
  submitText: string;
  cancelText: string;
  submittingText: string;
  validateOnChange: boolean;
}

export const useFormStore = defineStore("form", {
  state: (): FormState => ({
    fields: [],
    formData: {},
    errors: {},
    submitting: false,
    submitText: "Сохранить",
    cancelText: "Отмена",
    submittingText: "Сохранение...",
    validateOnChange: false,
  }),

  getters: {
    hasErrors: (state) => Object.keys(state.errors).length > 0,
  },

  actions: {
    initializeForm(newFields: FormField[]) {
      this.fields = newFields;
      this.formData = {};

      newFields.forEach((field) => {
        if (!(field.name in this.formData)) {
          this.formData[field.name] = field.type === "checkbox" ? false : "";
        }
      });
    },

    validateField(fieldName: string) {
      const field = this.fields.find((f) => f.name === fieldName);
      if (!field || !field.validation) return true;

      const result = field.validation(this.formData[fieldName]);
      if (typeof result === "string") {
        this.errors[fieldName] = result;
        return false;
      }

      delete this.errors[fieldName];
      return result;
    },

    validateForm() {
      let isValid = true;
      this.fields.forEach((field) => {
        if (field.validation) {
          const fieldValid = this.validateField(field.name);
          if (!fieldValid) isValid = false;
        }
      });
      return isValid;
    },

    resetForm() {
      this.errors = {};
      this.submitting = false;
      this.initializeForm(this.fields);
    },
  },
});
