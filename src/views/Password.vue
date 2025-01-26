<template>
    <div class="card" style="width: 50%;padding: 40px 20px">
        <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="200px"
            style="padding-right: 40px;padding-top: 20px">
            <el-form-item label="旧パスワード" prop="password">
                <el-input show-password v-model="data.form.password" autocomplete="off" placeholder="旧パスワードを入力してください" />
            </el-form-item>
            <el-form-item label="新しいパスワード" prop="newPassword">
                <el-input show-password v-model="data.form.newPassword" autocomplete="off" placeholder="新しいパスワードを入力してください" />
            </el-form-item>
            <el-form-item label="新しいパスワードの確認" prop="confirmPassword" required>
                <el-input show-password v-model="data.form.confirmPassword" autocomplete="off" placeholder="もう一度新しいパスワードを確認してください" />
            </el-form-item>
            <div style="text-align: center">
                <el-button @click="updatePassword" type="primary" style="padding: 20px 30px">すぐに修正する</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup>
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const validatePass = (rule, value, callback) => {
    if (!value) {
        callback(new Error('もう一度新しいパスワードを確認してください'))
    } else if (value !== data.form.newPassword) {
        callback(new Error("入力した2回のパスワードが一致しません"))
    } else {
        callback()
    }
}
const formRef = ref()
const data = reactive({
    user: JSON.parse(localStorage.getItem('xm-pro-user')),
    form: {},
    rules: {
        password: [
            { required: true, message: '旧パスワードを入力してください', trigger: 'blur' }
        ],
        newPassword: [
            { required: true, message: '新しいパスワードを入力してください', trigger: 'blur' }
        ],
        confirmPassword: [
            { validator: validatePass, trigger: 'blur' }
        ],
    }
})

const updatePassword = () => {
    data.form.id = data.user.id
    data.form.role = data.user.role
    formRef.value.validate((valid) => {
        if (valid) {
            request.put('/updatePassword', data.form).then(res => {
                if (res.code === '200') {
                    ElMessage.success('変更が成功しました')
                    localStorage.removeItem('xm-pro-user')
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
