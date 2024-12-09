<template>
  <div>
    
    <div style="margin-bottom: 100px">
       <router-link to="/test">通过router-link跳转到测试页面</router-link>         
       <a href="/test">通过a标签跳转到测试页面</a>
    </div>

    <div style="margin-bottom: 40px">
      <el-button type="primary" @click="router.push('/test')">通过push跳转到新页面</el-button>
      <el-button type="primary" @click="router.replace('/test')">通过replace跳转到新页面</el-button>
    </div>

    <div style="margin-bottom: 40px">
      <el-button type="primary" @click="router.push('/test?id=1')">路由传参id=1</el-button>
    </div>

    <div style="margin-bottom: 20px">
      <el-input v-model="data.input" style="width: 240px" placeholder="请输入" :prefix-icon="Search" />{{ data.input }}
      <el-input style="width: 200px" :suffix-icon="Calendar"></el-input>
      <el-input type="textarea" v-model="data.descr" style="width: 300px" placeholder="请输入一段描述"></el-input>
    </div>

    <div style="margin: 20px 0">
      <el-select clearable multiple v-model="data.value" placeholder="请选择水果的种类" size="large" style="width: 240px">
        <el-option v-for="item in data.options" :key="item" :label="item" :value="item" />
      </el-select>
    </div>

    <div style="margin: 20px 0">
      <el-radio-group v-model="data.sex">
        <el-radio value="男">男</el-radio>
        <el-radio value="女">女</el-radio>
      </el-radio-group>

      <el-radio-group style="margin-left: 100px" v-model="data.tag" size="large">
        <el-radio-button label="发布" value="发布" />
        <el-radio-button label="点赞" value="点赞" />
        <el-radio-button label="收藏" value="收藏" />
      </el-radio-group>
    </div>

    <div style="margin: 20px 0">
        <el-checkbox v-for="item in data.options" :key="item" :label="item" :value="item">
          {{ item }}
        </el-checkbox>
    </div>

    <div style="margin: 20px 0"> 
      <el-image :src="img" style="width: 100px;margin-left: 100px"  :preview-src-list="[img,'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg']"/>
    </div>

    <div style="margin: 20px 0">
      <el-carousel height="400px" style="width: 550px">
         <el-carousel-item v-for="item in data.imgs" :key="item">
           <img style="width: 100%" :src="item" alt="">
         </el-carousel-item>
      </el-carousel>
    </div>

    <div style="margin: 20px 0">
      <el-date-picker
        v-model="data.date"
        type="date"
        placeholder="请选择日期"
        format="YYYY/MM/DD"
        value-format="YYYY/MM/DD"
      /> {{ data.date }}

      <el-date-picker style="margin-left: 50px "
        v-model="data.date1"
        type="datetime"
        placeholder="请选择日期时间"
        format="YYYY/MM/DD HH:mm:ss"
        value-format="YYYY/MM/DD HH:mm:ss"
      />{{ data.date1 }}

      <el-date-picker style="margin-left: 50px "
        v-model="data.time"
        type="datetime"
        placeholder="请选择时间"
        format="HH:mm:ss"
        value-format="HH:mm:ss"
      />{{ data.time }}

      <el-date-picker style="margin-left: 50px"
        v-model="data.daterange"
        type="daterange"
        range-separator="到"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </div>

    <div style="margin: 20px 0"> 
      <el-table :data="data.tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column label="操作栏">
          <template #default="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0">
        <el-pagination
          v-model:current-page="data.currentPage"
          v-model:page-size="data.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.tableData.length"
    />
      </div>
    </div>
    <el-dialog v-model="data.dialogVisible" title="编辑行对象" width="500">
      <div style="padding: 20px">
         <div style="margin-bottom: 10px">日期：{{ data.row.date }}</div>
         <div style="margin-bottom: 10px">名称：{{ data.row.name }}</div>
         <div>地址：{{ data.row.address }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Search, Calendar } from '@element-plus/icons-vue'
import img from '@/assets/logo.svg'
import L1 from '@/assets/L1.jpeg'
import L2 from '@/assets/L2.jpeg'
import L3 from '@/assets/L3.jpeg'
import L4 from '@/assets/L4.jpeg'
import router from '@/router';

const data = reactive({
  input: null,
  descr: ' #汪苏泷十万伏特音乐计划# 每一次见面时埋下的伏笔，都成为了《十万伏特》的能量来源，充电进行时，能量百分百。@汪苏泷 2024原创专辑《十万伏特》同名先导充电曲已上线。今日暂停思考，一起摇摆。',
  value: '',
  options: ['苹果', '香蕉', '梨'],
  sex: '男',
  tag: '收藏',
  imgs:[L1,L2,L3,L4],
  date:'',
  date1:'',
  daterange:null,
  currentPage:2,
  pageSize:5,
  tableData:[
    { id:1,date:'2024-12-11',name:'汪苏泷',address:'北京'},
    { id:2,date:'2020-12-11',name:'李宇春',address:'成都'},
    { id:3,date:'1995-12-11',name:'魏大勋',address:'沈阳'},
    { id:4,date:'2024-12-11',name:'汪苏泷',address:'北京'},
    { id:5,date:'2020-12-11',name:'李宇春',address:'成都'},
  ],
  dialogVisible:false,
  row:null
})

const del = (id)=>{
  alert("删除ID="+id+"的数据")
}

const edit = (row)=>{
  data.row=row
  data.dialogVisible=true
}
</script>
