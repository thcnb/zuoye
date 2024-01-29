<template>
  <div class="container">
    <div class="app-container">
      <el-button
        type="primary"
        @click="add(0, 1)"
        style="margin-bottom: 10px"
        size="mini"
        >添加权限</el-button
      >
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="code" label="标识"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type == 1" type="text" @click="add(row)"
              >添加</el-button
            >
            <el-button type="text" @click="emit(row.id)">编辑</el-button>
            <el-button type="text" @click="remove(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加权限弹窗 -->
    <el-dialog
      :title="this.ruleForm.id ? '编辑权限' : '添加权限'"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="ruleForm.enVisible"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addpermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  permissionListApi,
  addpermissionApi,
  delpermissionApi,
  emitpermissiosApi,
  detalipermissisApi,
} from "@/api/permission";
import { transListToTreeData } from "@/utils";
export default {
  name: "Permission",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      ruleForm: {
        name: "",
        code: "",
        description: "",
        type: null,
        pid: "",
        enVisible: 0,
      },
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入权限标识", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取权限列表
    async permission() {
      const res = await permissionListApi();
      this.tableData = transListToTreeData(res, 0);
    },
    //新增权限列表
    add(row) {
      this.ruleForm.pid = row.id;
      this.ruleForm.type = 2;
      this.dialogVisible = true;
    },
    async addpermission() {
      this.$refs.ruleForm.validate(async (validate) => {
        if (validate) {
          if (this.ruleForm.id) {
            const res = await detalipermissisApi(
              this.ruleForm.id,
              this.ruleForm
            );
            console.log(res);
            this.$message({
              message: "修改权限成功",
              type: "success",
            });
          } else {
            await addpermissionApi(this.ruleForm);
            this.$message({
              message: "添加权限成功",
              type: "success",
            });
          }
        }
      });
      this.permission();
      this.dialogVisible = false;
    },
    //删除权限
    async remove(id) {
      await delpermissionApi(id);
      this.permission();
      this.$message({
        message: "删除权限成功",
        type: "success",
      });
    },
    //获取权限详情
    async emit(id) {
      const res = await emitpermissiosApi(id);
      console.log(res);
      this.ruleForm = res;
      this.ruleForm.enVisible = res.enVisible;
      this.dialogVisible = true;
    },
  },
  created() {
    this.permission();
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
</style>
