<script setup lang="ts">
import { ref } from 'vue'

const statistics = ref([
  { title: '总用户数', value: '1,234', type: 'primary' },
  { title: '今日活跃', value: '423', type: 'success' },
  { title: '订单总数', value: '5,678', type: 'warning' },
  { title: '总收入', value: '¥123,456', type: 'danger' }
])
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in statistics" :key="item.title">
        <el-card shadow="hover">
          <h3>{{ item.title }}</h3>
          <p :class="item.type">{{ item.value }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

.el-card {
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  font-size: 16px;
  color: #909399;
}

p {
  margin: 10px 0 0;
  font-size: 24px;
  font-weight: bold;
}

.primary { color: #409EFF; }
.success { color: #67C23A; }
.warning { color: #E6A23C; }
.danger { color: #F56C6C; }
</style>