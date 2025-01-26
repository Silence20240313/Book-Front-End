<template>
  <div>
    <!-- 头部区域 -->
    <div style="height: 60px;background-color: #3c7fff;display: flex;align-items: center">
      <div style="width:400px;display: flex;align-items: center;padding-left: 15px">
        <img style="width: 40px" src="@/assets/logo111.png" alt="">
        <span style="font-size:24px;color: white;margin-left: 5px">社員管理システム</span>
      </div>
      <div style="flex: 1"></div>

     


      <div style="width: fit-content;display: flex;align-items: center;padding-right: 10px">
        <img :src="data.user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt=""
          style="width: 40px;height: 40px;border-radius: 50%">
        <span style="color: white;margin-left:5px">{{ data.user.name }}</span>
      </div>


    </div>


    <!-- 下面区域 -->
    <div style="display: flex">
      <!-- 左侧导航菜单栏 -->
      <div style="width: 200px; border-right: 1px solid #ddd; min-height: calc(100vh-60px)">
        <el-menu router :default-active="currentPath" :default-openeds="['1']" style="border: 0">
          <el-menu-item index="/manager/home">
            <el-icon>
              <House />
            </el-icon>
            システムホーム
          </el-menu-item>
          <el-menu-item index="/manager/data">
            <el-icon>
              <DataAnalysis />
            </el-icon>
            データ統計
          </el-menu-item>

          <el-menu-item index="/manager/article" v-if="data.user.role === 'ADMIN'">
            <el-icon>
              <OfficeBuilding />
            </el-icon>
            通知管理
          </el-menu-item>

          <el-menu-item index="/manager/dept" v-if="data.user.role === 'ADMIN'">
            <el-icon>
              <Document />
            </el-icon>
            部門管理
          </el-menu-item>

          <el-sub-menu index="1" v-if="data.user.role === 'ADMIN'">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>ユーザー管理</span>
            </template>
            <el-menu-item index="/manager/admin">管理者情報</el-menu-item>
            <el-menu-item index="/manager/employee">従業員情報</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/manager/person">
            <el-icon>
              <UserFilled />
            </el-icon>
            個人情報
          </el-menu-item>
          <el-menu-item index="/manager/password">
            <el-icon>
              <Lock />
            </el-icon>
            パスワード変更
          </el-menu-item>
          <el-menu-item @click="logout">
            <el-icon>
              <SwitchButton />
            </el-icon>
            ログアウト
          </el-menu-item>

        </el-menu>
      </div>
      <!-- 右侧主体区域 -->
      <div style="flex: 1;width: 0;background-color: #f5f7ff;padding: 10px">
        <RouterView @updateUser='updateUser' />
      </div>
    </div>



  </div>
</template>

<script setup>
import { DataAnalysis, Document, InfoFilled, OfficeBuilding, SwitchButton, User } from '@element-plus/icons-vue';
import { reactive } from 'vue';


console.log(localStorage.getItem('xm-pro-user'))

const data = reactive({
  user: JSON.parse(localStorage.getItem('xm-pro-user'))
})

const logout = () => {
  localStorage.removeItem('xm-pro-user')  // 清除当前登录的用户缓存数据
  location.href = '/login'  // 退出到登录页面
}

const updateUser = () => {
  data.user = JSON.parse(localStorage.getItem('xm-pro-user'))
}
/* 新增功能 */

</script>

<style scoped>
.el-menu .is-active {
  background-color: #e6ecf7 !important;
}
</style>
