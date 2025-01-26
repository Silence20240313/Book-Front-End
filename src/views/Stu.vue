<template>
    <div>
        <el-button @click="select" type="primary">検索</el-button>
        <el-table :data="data.tableData" style="width: 100%">
            <el-table-column prop="name" label="名前" width="180" />
            <el-table-column prop="age" label="年齢" width="180" />
            <el-table-column prop="job" label="職業" />
        </el-table>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
const data = reactive({
  tableData: []
})
const select = async () => {
    const url = "http://localhost:8080/select";
    try {
        const response = await fetch(url);
    
        const json = await response.json();

        data.tableData = json.data;
    } catch (error) {
        console.error(error.message);
    }
}
</script>
