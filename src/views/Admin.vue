<template>
  <div>
    <div class="card" style="margin-bottom: 5px">
      <el-input style="width: 240px;margin-right: 10px" v-model="data.name" placeholder="名称を入力して検索してください"
        prefix-icon="Search"></el-input>
      <el-button type="primary" @click="load">検索</el-button>
      <el-button type="warning" @click="reset">リセット</el-button>
    </div>
    <div class="card" style="margin-bottom: 5px">
      <el-button type="primary" @click="handleAdd">新規追加</el-button>
      <el-button type="danger" @click="delBatch">一括削除</el-button>
    </div>
    <div class="card" style="margin-bottom: 5px">
      <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="アカウント" prop="username" />
        <el-table-column label="アバター">
          <template #default="scope">
            <img v-if="scope.row.avatar" :src="scope.row.avatar" alt=""
              style="display: block;width: 40px;height: 40px;border-radius: 50%" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button @click="handleUpdate(scope.row)" type="primary" :icon="Edit" circle></el-button>
            <el-button @click="del(scope.row.id)" type="danger" :icon="Delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px">
        <el-pagination @size-change="load" @current-change="load" v-model:current-page="data.pageNum"
          v-model:page-size="data.pageSize" :page-sizes="[5, 10, 15, 20]" background
          layout="total, sizes, prev, pager, next, jumper" :total="data.total" />
      </div>
    </div>
    <el-dialog title="管理者情報" v-model="data.formVisible" width="500" destroy-on-close>
      <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="120px"
        style="padding-right: 40px;padding-top: 20px">
        <el-form-item label="アカウント" prop="username">
          <el-input :disabled="data.form.id" v-model="data.form.username" autocomplete="off" placeholder="アカウントを入力してください" />
        </el-form-item>
        <el-form-item label="アバター">
          <el-upload action="http://localhost:8080/files/upload" list-type="picture" :on-success="handleAvatarSuccess">
            <el-button type="primary">アバターをアップロード</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="data.form.name" autocomplete="off" placeholder="名称を入力してください" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formVisible = false">キャンセル</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Delete, Edit, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '@/utils/request';

const data = reactive({
  name: null,
  tableData: [],
  pageNum: 1,
  pageSize: 10,
  total: 0,
  formVisible: false,
  form: {},
  ids: [],
  rules: {
    username: [
      { required: true, message: 'アカウントを入力してください', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '名称を入力してください', trigger: 'blur' }
    ]
  }
})

const formRef = ref()

const load = () => {
  request.get('/admin/selectPage', {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      name: data.name
    }
  }).then(res => {
    data.tableData = res.data.list
    data.total = res.data.total
  })
}
load()

const handleAvatarSuccess = (res) => {
  data.form.avatar = res.data
}

const reset = () => {
  data.name = null
  load()
}

const handleAdd = () => {
  data.formVisible = true
  data.form = {}
}

const save = () => { // 在一个保存方法里面做两个操作，一个是新增，一个是编辑
  formRef.value.validate((valid) => {
    if (valid) {
      data.form.id ? update() : add()
    }
  })
}

const add = () => {
  request.post('/admin/add', data.form).then(res => { // 新增的对象里面没有Id
    if (res.code === '200') {
      data.formVisible = false
      ElMessage.success('操作が成功しました')
      load() // 新增后一定要重新加载最新的数据
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const update = () => {
  request.put('/admin/update', data.form).then(res => { // 编辑的对象里面包含Id
    if (res.code === '200') {
      data.formVisible = false
      ElMessage.success('操作が成功しました')
      load() // 更新后一定要重新加载最新的数据
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const handleUpdate = (row) => {
  data.form = JSON.parse(JSON.stringify(row))  // 深拷贝一个新的对象 用于编辑 这样就不会影响行对象的数据了
  data.formVisible = true
}

const del = (id) => {
  ElMessageBox.confirm('データを削除すると復元できません。本当に削除しますか？', '削除の確認', { type: 'warning' }).then(() => {
    request.delete('admin/deleteById/' + id).then(res => {
      if (res.code === '200') {
        ElMessage.success('操作が成功しました')
        load() //删除后一定要重新加载最新的数据
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}

const handleSelectionChange = (rows) => { //返回所有选中的行对象数组 
  console.log(rows)
  // 从选中的行数组里面取出所有行的Id组成一个新的数组
  data.ids = rows.map(row => row.id)
  console.log(data.ids)
}
const delBatch = () => {
  if (data.ids.length === 0) {
    ElMessage.warning('データを選択してください')
    return
  }
  ElMessageBox.confirm('データを削除すると復元できません。本当に削除しますか？', '削除の確認', { type: 'warning' }).then(() => {
    request.delete('/admin/deleteBatch', { data: data.ids }).then(res => {
      if (res.code === '200') {
        ElMessage.success('操作が成功しました')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}
</script>