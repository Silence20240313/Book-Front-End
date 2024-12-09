<template>
    <div>
        非常抱歉，找不到页面了！
    </div>
    <div>
        <el-button type="primary" @click="goHome">返回主页</el-button>
    </div>
</template>

<script setup>
const goHome = ()=>{
    location.href='/manager/home'
}
</script>



