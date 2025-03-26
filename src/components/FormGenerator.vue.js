import { computed, ref, watch } from "vue";
// Пропсы компонента
const props = defineProps({
    fields: {
        type: Array,
        required: true,
        validator: (value) => value.every((field) => "name" in field && "type" in field),
    },
    modelValue: {
        type: Object,
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
const emit = defineEmits();
// Состояние формы
const formData = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
const errors = ref({});
const submitting = ref(false);
// Инициализация формы
props.fields.forEach((field) => {
    if (!(field.name in formData.value)) {
        formData.value[field.name] = field.type === "checkbox" ? false : "";
    }
});
// Валидация поля
const validateField = (fieldName) => {
    const field = props.fields.find((f) => f.name === fieldName);
    if (!field || !field.validation)
        return true;
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
            if (!fieldValid)
                isValid = false;
        }
    });
    return isValid;
};
const handleSubmit = async () => {
    if (!validateForm())
        return;
    submitting.value = true;
    try {
        emit("submit", formData.value);
    }
    finally {
        submitting.value = false;
    }
};
const handleCancel = () => {
    emit("cancel");
};
// Следим за изменениями modelValue извне
watch(formData, (newValue) => {
    emit("update:modelValue", newValue);
}, { deep: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['field-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['field-select']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-button']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "form-generator" },
});
for (const [field, index] of __VLS_getVForSourceType((__VLS_ctx.fields))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "form-field" },
    });
    var __VLS_0 = {
        ...({ field, value: __VLS_ctx.formData[field.name] }),
    };
    var __VLS_1 = __VLS_tryAsConstant(`field-${field.name}`);
    if (field.type !== 'checkbox') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "field-label" },
        });
        (field.label);
        if (field.required) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "required-mark" },
            });
        }
    }
    if (field.type === 'text' ||
        field.type === 'email' ||
        field.type === 'password' ||
        field.type === 'number') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: (field.type),
            placeholder: (field.placeholder),
            required: (field.required),
            disabled: (field.disabled),
            ...{ class: "field-input" },
        });
        (__VLS_ctx.formData[field.name]);
    }
    else if (field.type === 'textarea') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
            value: (__VLS_ctx.formData[field.name]),
            placeholder: (field.placeholder),
            required: (field.required),
            disabled: (field.disabled),
            rows: (field.rows || 3),
            ...{ class: "field-textarea" },
        });
    }
    else if (field.type === 'select') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
            value: (__VLS_ctx.formData[field.name]),
            required: (field.required),
            disabled: (field.disabled),
            ...{ class: "field-select" },
        });
        for (const [option] of __VLS_getVForSourceType((field.options))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                key: (option.value),
                value: (option.value),
            });
            (option.label);
        }
    }
    else if (field.type === 'checkbox') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "checkbox-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "checkbox",
            disabled: (field.disabled),
            ...{ class: "field-checkbox" },
        });
        (__VLS_ctx.formData[field.name]);
        (field.label);
    }
    if (__VLS_ctx.errors[field.name]) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.errors[field.name]);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-actions" },
});
var __VLS_4 = {
    ...({ submitting: __VLS_ctx.submitting }),
};
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleCancel) },
    type: "button",
    ...{ class: "cancel-button" },
    disabled: (__VLS_ctx.submitting),
});
(__VLS_ctx.cancelText);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "submit-button" },
    disabled: (__VLS_ctx.submitting),
});
(__VLS_ctx.submitting ? __VLS_ctx.submittingText : __VLS_ctx.submitText);
/** @type {__VLS_StyleScopedClasses['form-generator']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['field-label']} */ ;
/** @type {__VLS_StyleScopedClasses['required-mark']} */ ;
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
/** @type {__VLS_StyleScopedClasses['field-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['field-select']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['field-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-button']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-button']} */ ;
// @ts-ignore
var __VLS_2 = __VLS_1, __VLS_3 = __VLS_0, __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formData: formData,
            errors: errors,
            submitting: submitting,
            handleSubmit: handleSubmit,
            handleCancel: handleCancel,
        };
    },
    __typeEmits: {},
    props: {
        fields: {
            type: Array,
            required: true,
            validator: (value) => value.every((field) => "name" in field && "type" in field),
        },
        modelValue: {
            type: Object,
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
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    props: {
        fields: {
            type: Array,
            required: true,
            validator: (value) => value.every((field) => "name" in field && "type" in field),
        },
        modelValue: {
            type: Object,
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
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
