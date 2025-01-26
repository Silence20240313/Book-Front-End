<template>
  <div class="login-container">
    <div class="login-box">
      <div
        style="padding: 50px 30px;background-color: white;margin-left: 100px;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)">
        <el-form ref="formRef" :rules="data.rules" :model="data.form" style="width: 300px">
          <div style="margin-bottom: 30px;font-size: 24px;text-align: center; color:blue;font-weight:bold">社員管理システム
          </div>

          <!-- 请输入账号 -->
          <el-form-item prop="username">
            <el-input size="large" v-model="data.form.username" placeholder="アカウントを入力してください" prefix-icon="User"></el-input>
          </el-form-item>
          <!-- 请输入工号 -->
          <el-form-item prop="no">
            <el-input size="large" v-model="data.form.no" placeholder="社員番号を入力してください" prefix-icon="User"></el-input>
          </el-form-item>

          <!-- 请输入密码 -->
          <el-form-item prop="password">
            <el-input show-password size="large" v-model="data.form.password" placeholder="パスワードを入力してください"
              prefix-icon="Lock"></el-input>
          </el-form-item>

          <!-- 请确认密码  -->
          <el-form-item prop="confirmPassword">
            <el-input show-password size="large" v-model="data.form.confirmPassword" placeholder="パスワードを確認してください"
              prefix-icon="Lock"></el-input>
          </el-form-item>



          <div style="margin-bottom: 20px">
            <el-button @click="register" size="large" style="width: 100%;" type="primary">登録</el-button>
          </div>
          <div style="text-align: right">
            すでにアカウントをお持ちですか?
            <a style="color: #0742b1;text-decoration: none" href="/login">ログイン</a>
          </div>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import request from '@/utils/request';
import { ElMessage } from 'element-plus';

const validatePass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('もう一度パスワードを確認してください'))
  } else if (value !== data.form.password) {
    callback(new Error("入力した2回のパスワードが一致しません"))
  } else {
    callback()
  }
}

const data = reactive({
  form: {},
  rules: {
    username: [
      { Required: true, message: 'アカウントを入力してください', trigger: 'blur' }
    ],
    no: [
      { Required: true, message: '社員番号を入力してください', trigger: 'blur' }
    ],
    password: [
      { Required: true, message: 'パスワードを入力してください', trigger: 'blur' }
    ],
    confirmPassword: [
      { validator: validatePass, trigger: 'blur' }
    ]
  }
})

const formRef = ref()



const register = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      request.post('/register', data.form).then(res => {
        console.log(res)

        if (res.code === '200') { // 注册成功
          ElMessage.success('登録成功')
          setTimeout(() => {
            location.href = '/login'
          }, 500)
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/bj.jpg");
  background-size: cover;
  background-position: 0 -50px
}

.login-box {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  right: 0;
  position: absolute;

}
</style>