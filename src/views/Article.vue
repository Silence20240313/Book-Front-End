<template>
  <div>
    <div class="card" style="margin-bottom: 5px">
      <el-input style="width: 240px;margin-right: 10px" v-model="data.title" placeholder="タイトルを入力して検索してください"
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
        <el-table-column label="タイトル" prop="title" />
        <el-table-column label="表紙">
          <template #default="scope">
            <el-image v-if="scope.row.img" :src="scope.row.img" :preview-src-list=[scope.row.img] preview-teleported
              style="display: block;width: 40px;height: 40px" />
          </template>
        </el-table-column>
        <el-table-column label="概要" prop="description" show-overflow-tooltip />
        <el-table-column label="内容">
          <template #default="scope">
            <el-button type="primary" @click="view(scope.row.content)">内容を見る</el-button>
          </template>
        </el-table-column>
        <el-table-column label="公開日時" prop="time" />
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
    <el-dialog title="記事情報" v-model="data.formVisible" width="50%" destroy-on-close>
      <el-form ref="formRef" :model="data.form" label-width="80px" style="padding-right: 40px;padding-top: 20px">
        <el-form-item label="タイトル" prop="title">
          <el-input v-model="data.form.title" autocomplete="off" placeholder="タイトルを入力してください" />
        </el-form-item>
        <el-form-item label="表紙">
          <el-upload action="http://localhost:8080/files/upload" list-type="picture"
            :on-success="handleImgAvatarSuccess">
            <el-button type="primary">カバーをアップロードしてください</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="概要" prop="description">
          <el-input type="textarea" :rows="3" v-model="data.form.description" autocomplete="off" placeholder="概要を入力してください" />
        </el-form-item>
        <el-form-item label="内容">
          <div style="border: 1px solid #ccc; width: 100%">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="data.form.content" :mode="mode"
              :defaultConfig="editorConfig" @onCreated="handleCreated" />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formVisible = false">キャンセル</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog title="内容" v-model="data.viewVisible" width="50%" :close-on-click-modal="false">
      <div class="editor-content-view" style="padding: 20px" v-html="data.content"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.viewVisible = false">閉じる</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Delete, Edit, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '@/utils/request';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef } from "vue";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'


const data = reactive({
  title: null,
  tableData: [],
  pageNum: 1,
  pageSize: 10,
  total: 0,
  formVisible: false,
  form: {},
  ids: [],
  viewVisible: false,
  content: null
})

/* wangEditor5 初始化开始 */
const baseUrl = 'http://localhost:8080'
const editorRef = shallowRef() // 编辑器实例，必须用 shallowRef
const mode = 'default'
const editorConfig = { MENU_CONF: {} }
// 图片上传配置
editorConfig.MENU_CONF['uploadImage'] = {
  server: baseUrl + '/files/wang/upload', // 服务端图片上传接口
  fieldName: 'file' // 服务端接收图片的字段名
}
// 组件销毁时，也及时销毁编辑器，否则可能会造成内存泄漏
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
// 记录 editor 实例，重要！
const handleCreated = (editor) => {
  editorRef.value = editor
}
/* wangEditor5 初始化结束 */

const view = (content) => {
  data.content = content
  data.viewVisible = true
}

const load = () => {
  request.get('/article/selectPage', {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      title: data.title
    }
  }).then(res => {
    data.tableData = res.data.list
    data.total = res.data.total
  })
}
load()

const handleImgAvatarSuccess = (res) => {
  data.form.img = res.data
}

const reset = () => {
  data.title = null
  load()
}

const handleAdd = () => {
  data.formVisible = true
  data.form = {}
}

const save = () => { // 在一个保存方法里面做两个操作，一个是新增，一个是编辑
  data.form.id ? update() : add()
}

const add = () => {
  request.post('/article/add', data.form).then(res => { // 新增的对象里面没有Id
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
  request.put('/article/update', data.form).then(res => { // 编辑的对象里面包含Id
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
    request.delete('article/deleteById/' + id).then(res => {
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
    request.delete('/article/deleteBatch', { data: data.ids }).then(res => {
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