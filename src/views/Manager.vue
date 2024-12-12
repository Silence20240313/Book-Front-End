<template>
    <div>
        <!-- 头部区域 -->
       <div style="height: 60px;background-color: #3c7fff;display: flex;align-items: center">
          <div style="width:200px;display: flex;align-items: center;padding-left: 15px">
            <img style="width: 40px" src="@/assets/coffee.png" alt="">
            <span style="font-size:24px;color: white;margin-left: 5px">后台管理系统</span>
          </div>
          <div style="flex: 1"></div>
          <div style="width: fit-content;display: flex;align-items: center;padding-right: 10px">
             <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" style="width: 40px;height: 40px">
             <span style="color: white;margin-left:5px">丽丽猫</span>
          </div>

       </div>


        <!-- 下面区域 -->
        <div style="display: flex">
            <!-- 左侧导航菜单栏 -->
          <div style="width: 200px; border-right: 1px solid #ddd; min-height: calc(100vh-60px)">
            <el-menu router :default-active="currentPath" :default-openeds="['1']" style="border: 0">
              <el-menu-item index="/manager/home">
                <el-icon><House /></el-icon>
                系统首页
              </el-menu-item>
              <el-menu-item index="/manager/data">
                  <el-icon><DataAnalysis/></el-icon>
                  数据统计
                </el-menu-item>
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><User /></el-icon>
                  <span>用户管理</span>
                </template>
                <el-menu-item>管理员信息</el-menu-item>
                <el-menu-item index = "/manager/employee">员工信息</el-menu-item>
               </el-sub-menu> 
               <el-menu-item index="/manager/person">
                <el-icon><UserFilled /></el-icon>
                个人信息
              </el-menu-item>
               <el-menu-item index="/Login">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-menu-item>

            </el-menu>
          </div>
           <!-- 右侧主体区域 -->
            <div style="flex: 1;width: 0;background-color: #f5f7ff;padding: 10px">
               <RouterView/>
            </div>
        </div>



    </div>
</template>

<script setup>
import { DataAnalysis, InfoFilled, SwitchButton, User } from '@element-plus/icons-vue';
</script>

<style scoped>
.el-menu .is-active{
  background-color: #e6ecf7 !important;
}
</style>
