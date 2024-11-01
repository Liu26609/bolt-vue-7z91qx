<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'

interface ItemData {
  id: string
  icon: string
  desc: string
  value: number
}

const tableData = ref<ItemData[]>([
  {
    id: '铁剑',
    icon: '⚔️',
    desc: '铁剑',
    value: 100
  },
  {
    id: '生命药水',
    icon: '🧪',
    desc: '生命药水',
    value: 50
  }
])

const dialogVisible = ref(false)
const dialogTitle = ref('添加道具')
const formRef = ref<FormInstance>()
const isEdit = ref(false)

const formData = reactive({
  id: '',
  icon: '',
  desc: '',
  value: 0
})

const rules = reactive<FormRules>({
  desc: [
    { required: true, message: '请输入道具名称', trigger: 'blur' }
  ],
  icon: [
    { required: true, message: '请输入emoji样式', trigger: 'blur' }
  ],
  value: [
    { required: true, message: '请输入出售价格', trigger: 'blur' },
    { type: 'number', min: 0, message: '价格必须大于等于0', trigger: 'blur' }
  ]
})

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  formData.id = ''
  formData.icon = ''
  formData.desc = ''
  formData.value = 0
}

const handleAdd = () => {
  dialogTitle.value = '添加道具'
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (row: ItemData) => {
  dialogTitle.value = '编辑道具'
  isEdit.value = true
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = (index: number) => {
  ElMessageBox.confirm(
    '确定要删除这个道具吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    tableData.value.splice(index, 1)
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid) => {
    if (valid) {
      // Set id equal to desc (item name)
      formData.id = formData.desc

      if (isEdit.value) {
        const index = tableData.value.findIndex(item => item.id === formData.id)
        if (index !== -1) {
          tableData.value[index] = { ...formData }
        }
      } else {
        tableData.value.push({ ...formData })
      }
      dialogVisible.value = false
      ElMessage({
        type: 'success',
        message: isEdit.value ? '编辑成功' : '添加成功'
      })
    }
  })
}

onMounted(() => {

})
</script>

<template>
  <div class="items">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>道具列表</span>
          <el-button type="primary" @click="handleAdd">添加道具</el-button>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="icon" label="icon" width="100">
          <template #default="{ row }">
            <span class="item-icon">{{ row.icon }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="道具名称" />
        <el-table-column prop="value" label="出售价格">
          <template #default="{ row }">
            {{ row.value }}💰️
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row, $index }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="道具名称" prop="desc">
          <el-input v-model="formData.desc" placeholder="请输入道具名称" />
        </el-form-item>
        <el-form-item label="样式" prop="icon">
          <el-input v-model="formData.icon" placeholder="请输入样式" />
        </el-form-item>
        <el-form-item label="出售价格" prop="value">
          <el-input-number v-model="formData.value" :min="0" placeholder="请输入出售价格" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style>
.items {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.item-icon {
  font-size: 1.5em;
}
</style>
