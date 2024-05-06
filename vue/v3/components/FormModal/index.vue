// vue3 + Element Plus

<template>
  <el-dialog :model-value="_visible" :title="title" @closed="resetFields()" :before-close="syncVisible">
    <el-form :model="_form" :rules="rules" :label-width="labelWidth" ref="formRef"
      @submit.prevent="handleSubmit(formRef)" v-loading="loading">
      <slot :form="_form" :templateData="readonly(templateData)" :resetFields="resetFields" />
      <el-form-item v-if="showFooter">
        <slot name="footer" :resetFields="resetFields" :close="close">
          <el-button v-if="showSubmit" type="primary" native-type="submit">{{ submitText }}</el-button>
          <el-button v-if="showCancel" type="primary" @click="close">{{ cancelText }}</el-button>
        </slot>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, readonly } from 'vue';
import useVModel from '../../hooks/useVModel';

const props = defineProps({
  visible: Boolean,
  title: String,
  loading: Boolean,
  labelWidth: {
    type: String,
    default: '130px'
  },
  form: {
    type: Object,
    default: () => ({})
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  templateData: {
    type: Object,
    default: () => ({})
  },
  submitText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  showSubmit: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
})

const emit = defineEmits(['update:visible', 'update:form', 'finish'])
const _visible = useVModel(props, 'visible', emit)
const _form = useVModel(props, 'form', emit)

const formRef = ref(null)

const handleSubmit = async (ref) => {
  try {
    await ref.validate()
    emit('finish')
  } catch (error) { }
}

const syncVisible = (close) => {
  _visible.value = false
  close()
}

const resetFields = fields => {
  formRef.value.resetFields(fields)
}

const close = () => {
  _visible.value = false
}

</script>



<!-- <template>
  <FormModal>
    <template #default="{ form, templateData, resetFields }">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" :disabled="templateData.disabledit" />
      </el-form-item>
    </template>
  </FormModal>
</template>


<script setup>
import FormModal from '@/components/FormModal.vue';
</script> -->