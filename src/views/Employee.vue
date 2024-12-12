<template>
  <div>
    <div class="card" style="margin-bottom: 5px">
      <el-input style="width: 240px;margin-right: 10px" v-model="data.name" placeholder="请输入名称查询"
        prefix-icon="Search"></el-input>
      <el-button type="primary" @click="load">查询</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <div class="card" style="margin-bottom: 5px">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="danger" @click="delBatch">批量删除</el-button>
    </div>
    <div class="card" style="margin-bottom: 5px">
      <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="账号" prop="username" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="性别" prop="sex" />
        <el-table-column label="工号" prop="no" />
        <el-table-column label="年龄" prop="age" />
        <el-table-column label="个人简介" prop="description" show-overflow-tooltip />
        <el-table-column label="部门" prop="deptName" />
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
    <el-dialog title="员工信息" v-model="data.formVisible" width="500" destroy-on-close>
      <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="80px" style="padding-right: 40px;padding-top: 20px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="data.form.username" autocomplete="off" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="data.form.sex">
            <el-radio value="男" label="男"></el-radio>
            <el-radio value="女" label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工号" prop="no">
          <el-input v-model="data.form.no" autocomplete="off" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number style="width: 180px" :min="18" v-model="data.form.age" autocomplete="off"
            placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input :rows="3" type="textarea" style="width: 180px" :min="18" v-model="data.form.description"
            autocomplete="off" placeholder="请输入个人介绍" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formVisible = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { reactive,ref } from 'vue';
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
  rules:{
    username:[
      {required:true,message:'请输入账号',trigger:'blur'}
    ],
    name:[
      {required:true,message:'请输入名称',trigger:'blur'}
    ],
    no:[
      {required:true,message:'请输入工号',trigger:'blur'}
    ]
  }
})

const formRef = ref()

const load = () => {
  request.get('/employee/selectPage', {
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
    if(valid){
      data.form.id ? update() : add()
    }
  })
}

const add = () => {
  request.post('/employee/add', data.form).then(res => { // 新增的对象里面没有Id
    if (res.code === '200') {
      data.formVisible = false
      ElMessage.success('操作成功')
      load() // 新增后一定要重新加载最新的数据
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const update = () => {
  request.put('/employee/update', data.form).then(res => { // 编辑的对象里面包含Id
    if (res.code === '200') {
      data.formVisible = false
      ElMessage.success('操作成功')
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
  ElMessageBox.confirm('删除数据后无法恢复，确认要删除吗？', '删除确认', { type: 'warning' }).then(() => {
    request.delete('employee/deleteById/' + id).then(res => {
      if (res.code === '200') {
        ElMessage.success('操作成功')
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
    ElMessage.warning('请选择数据')
    return
  }
  ElMessageBox.confirm('删除数据后无法恢复，确认要删除吗？', '删除确认', { type: 'warning' }).then(() => {
    request.delete('/employee/deleteBatch', { data: data.ids }).then(res => {
      if (res.code === '200') {
        ElMessage.success('操作成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}
</script>