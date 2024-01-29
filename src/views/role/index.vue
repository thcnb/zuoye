<template>
  <div class="container">
    <div class="app-container">
      <el-button
        type="primary"
        @click="dialogFormVisible = true"
        style="margin-bottom: 10px"
        size="mini"
      >
        添加角色
      </el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="80px" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="角色">
          <template v-slot="{ row }">
            <el-input
              v-if="row.fake"
              size="mini"
              v-model="row.eitRow.name"
            ></el-input>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="启用">
          <template v-slot="{ row }">
            <el-switch
              v-if="row.fake"
              v-model="row.eitRow.state"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
            <span v-else>{{
              row.state == 1 ? "已启用" : row.state == 0 ? "未启用" : "无"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
          <template v-slot="{ row }">
            <el-input
              v-if="row.fake"
              type="textarea"
              size="mini"
              v-model="row.eitRow.description"
            ></el-input>
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="{ row }">
            <template v-if="row.fake">
              <el-button size="mini" type="primary" @click="emitList(row)"
                >确定</el-button
              >
              <el-button size="mini" @click="row.fake = false">取消</el-button>
            </template>
            <div v-else>
              <a href="#">分配权限</a>
              <a @click="emit(row)" style="margin: 5px" href="#">编辑</a>
              <!-- <el-button type="text" @click="del(row)">删除</el-button> -->
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="del(row)"
              >
                <el-button type="text" slot="reference">删除</el-button>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="pagesize"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="5"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form label-positio="right" :model="from" ref="form" :rules="rules">
        <el-form-item label="角色名称" prop="name" label-width="120px">
          <el-input v-model="from.name"></el-input>
        </el-form-item>
        <el-form-item label="启用" label-width="120px">
          <el-switch :active-value="1" :inactive-value="0" v-model="from.state">
          </el-switch>
        </el-form-item>
        <el-form-item label="角色描述" prop="description" label-width="120px">
          <el-input type="textarea" v-model="from.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="add" type="primary">确 定</el-button>
        <el-button size="mini" @click="dialogFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { roleApi, AddroleApi, editApi, deleteApi } from "@/api/role";
export default {
  name: "Role",
  data() {
    return {
      total: 0,
      tableData: [],
      page: 1,
      pagesize: 5,
      dialogFormVisible: false,
      from: {
        name: "",
        description: "",
        state: 1,
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //获取角色
    async roleList() {
      const res = await roleApi({
        page: this.page,
        pagesize: this.pagesize,
      });
      res.rows.forEach((item) => {
        this.$set(item, "fake", false);
        this.$set(item, "eitRow", {
          name: item.name,
          state: item.state,
          description: item.description,
        });
      });
      this.tableData = res.rows;
      this.total = res.total;
      console.log(res);
    },
    //添加角色
    async add() {
      const res = await AddroleApi(this.from);
      console.log(res);
      this.roleList();
      this.page = 1;
      this.dialogFormVisible = false;
      this.$message({
        message: "添加角色成功",
        type: "success",
      });
    },
    //分页
    handleCurrentChange(e) {
      this.page = e;
      this.roleList();
    },
    //编辑回显
    emit(row) {
      this.$set(row, "fake", true);
      row.eitRow.name = row.name;
      row.eitRow.state = row.state;
      row.eitRow.description = row.description;
    },
    //编辑
    async emitList(row) {
      await editApi(row.id, { ...row.eitRow, id: row.id });
      this.$set(row, "fake", false);
      this.roleList();
      this.$message({
        message: "角色更新成功",
        type: "success",
      });
    },
    //删除角色
    async del(row) {
      if (row.length == 1) this.page - 1;
      await deleteApi(row.id);
      this.roleList();
    },
  },
  created() {
    this.roleList();
  },
};
</script>
<style scoped lang="scss">
.app-container {
  padding: 20px;
  a {
    color: #579de9;
  }
}
</style>
