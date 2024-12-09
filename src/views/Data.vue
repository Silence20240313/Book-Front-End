<template>
    <div>
        <div class="card" style="margin-bottom: 5px">
            <el-input style="width: 240px;margin-right: 10px" v-model="data.name" placeholder="请输入名称查询" prefix-icon="Search"></el-input>
            <el-button type="primary">查询</el-button>           
            <el-button type="warning">重置</el-button>           
        </div>
        <div class="card" style="margin-bottom: 5px">
            <el-button type="primary">新增</el-button>           
            <el-button type="warning">批量删除</el-button>     
            <el-button type="info">导入</el-button>     
            <el-button type="success">导出</el-button>     
        </div>
        <div class="card" style="margin-bottom: 5px">
            <el-table :data="data.tableData" stripe>
                <el-table-column label="日期" prop="date"/>
                <el-table-column label="名称" prop="name"/>
                <el-table-column label="地址" prop="address"/>
            </el-table>
            <div style="margin-top: 15px">
              <el-pagination
                  v-model:current-page="data.pageNum"
                  v-model:page-size="data.pageSize"
                  :page-sizes="[5, 10, 15, 20]"
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="data.total"
              />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Search } from '@element-plus/icons-vue';
const data = reactive({
    name:null,
    tableData:[
    { id:1,date:'2024-12-11',name:'樱桃小丸子',address:'大阪'},
    { id:2,date:'2020-11-23',name:'哆啦A梦',address:'东京'},
    { id:3,date:'1995-05-02',name:'海贼王',address:'北海道'},
    ],
    pageNum:1,
    pageSize:10,
    total:47

    
})
</script>

<style scoped>
.card{
    background-color:white;
    padding: 10px;
    border-radius: 5px;
    box-shadow:0 0 8px rgba(0,0,0,12) ;
}
</style>
