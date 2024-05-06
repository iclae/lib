import { ref, h, defineComponent, reactive, toRaw } from "vue";
import { ElMessage } from "element-plus";

export default function (Template, TemplateDatas = []) {

  return TemplateDatas.map(({
    title = 'Title',
    finish = () => { },
    templateData,
    submitText,
    cancelText,
    successMsg = '操作成功',
    successShowMsg = true,
    showFooter = true,
    showSubmit = true,
    showCancel = true,
  }) => {
    const visible = ref(false);
    const form = reactive({})
    const loading = ref(false);

    return {
      component: defineComponent({
        name: Template.__name + 'Container',
        setup() {
          return () => h(Template, {
            visible: visible.value,
            loading: loading.value,
            title,
            form,
            templateData,
            submitText,
            cancelText,
            showFooter,
            showSubmit,
            showCancel,
            'onUpdate:visible': value => visible.value = value,
            'onUpdate:form': value => Object.assign(form, value),
            'onFinish': () => {
              loading.value = true;
              // 解构原始对象浅拷贝给finish作参数
              const { ...formData } = toRaw(form);
              finish(formData, (isSuccess, successCallback) => {
                if (isSuccess) {
                  loading.value = false;
                  if (successShowMsg) ElMessage.success(successMsg)
                  visible.value = false;
                  successCallback && successCallback();
                } else {
                  loading.value = false;
                }
              })
            }
          })
        },
      }),
      open: (initForm = {}) => {
        Object.assign(form, initForm);
        visible.value = true;
      }
    }
  })
}
