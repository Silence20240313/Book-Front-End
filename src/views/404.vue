<template>
    <div>
        申し訳ございません、ページが見つかりませんでした！
    </div>
    <div>
        <el-button type="primary" @click="goHome">ホームページに戻る</el-button>
    </div>
</template>

<script setup>
const goHome = ()=>{
    location.href='/manager/home'
}
</script>



