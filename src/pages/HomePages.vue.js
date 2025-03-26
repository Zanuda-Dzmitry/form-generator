import { ref } from "vue";
import FormGenerator from "@/components/FormGenerator.vue";
const showPassword = ref(false);
const formData = ref({
    username: "",
    email: "",
    password: "",
    agree: false,
});
const fields = [
    {
        name: "username",
        type: "text",
        label: "Имя пользователя",
        placeholder: "Введите имя пользователя",
        required: true,
        validation: (value) => value.length >= 3 || "Минимум 3 символа",
    },
    {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Введите ваш email",
        required: true,
        validation: (value) => /.+@.+\..+/.test(value) || "Некорректный email",
    },
    {
        name: "password",
        type: "password",
        label: "Пароль",
        placeholder: "Введите пароль",
        required: true,
        validation: (value) => value.length >= 6 || "Минимум 6 символов",
    },
    {
        name: "agree",
        type: "checkbox",
        label: "Я согласен с условиями использования",
        required: true,
        validation: (value) => value || "Необходимо согласие",
    },
];
const handleSubmit = (data) => {
    console.log("Регистрация:", data);
    // Отправка данных на сервер
};
const handleCancel = () => {
    console.log("Отмена регистрации");
    // Возврат на предыдущую страницу
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
/** @type {[typeof FormGenerator, typeof FormGenerator, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(FormGenerator, new FormGenerator({
    ...{ 'onSubmit': {} },
    ...{ 'onCancel': {} },
    modelValue: (__VLS_ctx.formData),
    fields: (__VLS_ctx.fields),
    submitText: "Зарегистрироваться",
    cancelText: "Отмена",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onSubmit': {} },
    ...{ 'onCancel': {} },
    modelValue: (__VLS_ctx.formData),
    fields: (__VLS_ctx.fields),
    submitText: "Зарегистрироваться",
    cancelText: "Отмена",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onSubmit: (__VLS_ctx.handleSubmit)
};
const __VLS_7 = {
    onCancel: (__VLS_ctx.handleCancel)
};
__VLS_2.slots.default;
{
    const { 'field-password': __VLS_thisSlot } = __VLS_2.slots;
    const [{ field }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (field.label);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required-mark" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: (__VLS_ctx.showPassword ? 'text' : 'password'),
        placeholder: (field.placeholder),
        required: true,
        ...{ class: "field-input" },
    });
    (__VLS_ctx.formData[field.name]);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
            } },
        type: "button",
        ...{ class: "toggle-password" },
    });
    (__VLS_ctx.showPassword ? "Скрыть" : "Показать");
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['form-page']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-field']} */ ;
/** @type {__VLS_StyleScopedClasses['required-mark']} */ ;
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FormGenerator: FormGenerator,
            showPassword: showPassword,
            formData: formData,
            fields: fields,
            handleSubmit: handleSubmit,
            handleCancel: handleCancel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
