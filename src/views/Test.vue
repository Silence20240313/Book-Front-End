<template>
    <div>
      <div style="font-size: 20px;font-weight: bold;color: red;text-decoration: underline;font-style: italic;margin-bottom: 20px;">
        从0搭建Vue3工程
      </div>
  
      <div style="font-size: 30px;margin-top: 20px;">
        {{ a }}
      </div>
  
      <div style="font-size: 30px;margin-top: 20px;">
        {{ data.a }}
      </div>
  
      <div style="font-size: 30px;margin-top: 20px;">
        <input v-model="data.a"/>
      </div>
  
      <div style="font-size: 30px;margin-top: 20px;">
        <span style="color: pink" v-if="data.name ==='樱桃小丸子'">樱桃小丸子</span>
        <span style="color: aqua" v-if="data.name ==='白熊咖啡厅'">白熊咖啡厅</span>
        <span style="color: red" v-else>火影忍者</span>
      </div>
  
      <div style="display: flex">
        <div style="width: 300px;height: 300px;text-align: center;line-height: 300px;font-size: 30px;margin-right: 10px;background-color: aqua" v-for="item in data.arr">{{item}}</div>
        <div>
          <select style="width:200px;">
            <option v-for="item in data.fruits">{{item}}</option>
          </select>
        </div>
      </div>
  
      <div style="margin-bottom: 20px">
        <button @click="click">点我加好运</button>
      </div>
  
      <div style="margin-bottom: 20px">
        <div :style="data.box"></div>
        <div>
          <img :src="data.img" alt=" ">
        </div>
      </div>
  
      <div style="margin: 30px">
      <el-button :style="{color:'blue'}" round>Round</el-button>
      <el-button type="primary" loading round>水果</el-button>
      <el-button type="success" plain round>动物</el-button>
      <el-button type="warning" size="large" round>人类</el-button>
      <el-button @click="clickData" type="danger" round>删除</el-button>
      <el-button type="danger" :icon="Delete" circle />
  
       <el-input
        v-model="data.a"
        style="width: 240px"
        placeholder="Type something"
        :prefix-icon="Search"
       />
  
      </div>
  
      <div style="margin: 30px">
        <el-icon :size="20">
           <Edit />
        </el-icon>
  
        <span style="margin-left: 30px;color: blueviolet;">
          <el-icon :size="20" color="red" style="top: 4px"><View/></el-icon> 100
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref,onMounted} from 'vue';
  import { Delete,Search } from '@element-plus/icons-vue';
import router from '@/router';
  const a = ref("汪苏泷")
  
  const data = reactive({
    id:router.currentRoute.value.query.id,
    a:"十万伏特",
    name:'',
    arr:[6,8,10],
    fruits:['草莓','芒果','樱桃'],
    box:{
      width:'100px',
      height:'100px',
      backgroundColor:'red'
    },
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png'
  })
  onMounted(() =>{
    alert("页面加载完成")
  })
  
  const clickData = () => {
    alert("确定要删除吗")
  }
  
  const click = () => {
    alert("好运+1")
  }
  </script>
  