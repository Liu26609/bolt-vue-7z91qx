<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: '活跃',
    created: '2024-01-01'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '用户',
    status: '离线',
    created: '2024-01-02'
  }
])

const handleEdit = (index: number) => {
  console.log('编辑用户:', index)
}

const handleDelete = (index: number) => {
  console.log('删除用户:', index)
}
</script>

<template>
  <div class="users">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-button type="primary">添加用户</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '活跃' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created" label="创建时间" />
        <el-table-column label="操作" width="180">
          <template #default="{ $index }">
            <el-button size="small" @click="handleEdit($index)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.users {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>