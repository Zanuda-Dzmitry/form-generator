import { ref } from "vue";
import FormGenerator from "@/components/FormGenerator.vue";
const formData = ref({
    name: "",
    email: "",
    topic: "",
    message: "",
    rating: 5,
});
const fields = [
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
const handleSubmit = (data) => {
    console.log("Отправка обратной связи:", data);
    // Отправка данных на сервер
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
    modelValue: (__VLS_ctx.formData),
    fields: (__VLS_ctx.fields),
    submitText: "Отправить",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.formData),
    fields: (__VLS_ctx.fields),
    submitText: "Отправить",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onSubmit: (__VLS_ctx.handleSubmit)
};
__VLS_2.slots.default;
{
    const { actions: __VLS_thisSlot } = __VLS_2.slots;
    const [{ submitting }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
        ...{ class: "submit-button" },
        disabled: (submitting),
    });
    (submitting ? "Отправка..." : "Отправить сообщение");
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['form-page']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FormGenerator: FormGenerator,
            formData: formData,
            fields: fields,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
