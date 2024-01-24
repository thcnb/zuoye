<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="data" default-expand-all :expand-on-click-node="false">
        <template v-slot="{ data }">
          <div class="custom-tree-node">
            <span> {{ data.name }}</span>
            <div>
              <span style="margin-right: 10px">{{ data.managerName }}</span>
              <el-dropdown @command="dropdown($event, data.pid)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="emit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
    <!-- 添加框 -->
    <el-dialog title="部门名称" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="部门名称" prop="name" label-width="120px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code" label-width="120px">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="managerId" label-width="120px">
          <el-select v-model="form.managerId" placeholder="请选择负责人">
            <el-option
              v-for="item in simpleList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" label-width="120px">
          <el-input type="textarea" v-model="form.introduce"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="add" type="primary">确 定</el-button>
        <el-button size="mini">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { departmentApi, simpleApi, addDepartmentApi } from "@/api/user";
import { transListToTreeData } from "@/utils";
import A from "./compuntend.vue";
export default {
  name: "Department",
  components: {
    A,
  },
  data() {
    return {
      data: [],
      id: "",
      dialogFormVisible: false,
      form: {
        name: "",
        code: "",
        managerId: "",
        introduce: "",
      },
      simpleList: [],
      rules: {
        // 部门名称
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
          {
            validator: async (rule, value, callback) => {
              // 1. 获取当前部门的列表
              const departmentList = this.data;
              // 2. 判断当前输入的部门名称是否存在于部门列表中
              if (departmentList.some((item) => item.name === value)) {
                callback(new Error("部门中已经有该名称了"));
              } else {
                callback();
              }
              // 3. 如果存在，提示用户部门名称已存在
              // 4. 如果不存在，表单校验通过
            },
            trigger: "blur",
          },
        ],
        // 部门编码
        code: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
          {
            validator: async (rule, value, callback) => {
              // 1. 获取当前部门的列表
              const departmentList = this.data;
              // 2. 判断当前输入的部门名称是否存在于部门列表中
              // 3. 如果存在，提示用户部门名称已存在
              // 4. 如果不存在，表单校验通过
              if (departmentList.some((item) => item.code == value)) {
                callback(new Error("部门中已经有该编码了"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        // 部门负责人
        managerId: [
          { required: true, message: "请选择负责人", trigger: "change" },
        ],
        // 部门介绍
        introduce: [
          { required: true, message: "请输入部门介绍", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //部门列表
    async departList() {
      const res = await departmentApi();
      this.data = transListToTreeData(res, 0);
    },
    //部门负责人列表
    async simple() {
      const res = await simpleApi();
      console.log(res);
      this.simpleList = res;
    },
    //
    dropdown(e, id) {
      if (e == "add") {
        this.dialogFormVisible = true;
        this.id = id;
      }
    },
    //添加
    add() {
      // 1. 校验整个表单
      // 2. 拿到父部门的id
      this.$refs.form.validate(async (valid) => {
        console.log("valid", valid);
        if (valid) {
          const res = await addDepartmentApi({
            code: this.form.code,
            introduce: this.form.introduce,
            managerId: this.form.managerId,
            name: this.form.name,
            pid: this.id,
          });
          console.log(res);
          this.dialogFormVisible = false;
          this.form = {};
          this.$message({
            message: "添加部门成功",
            type: "success",
          });
          this.departList();
        }
      });
    },
  },
  created() {
  console.log(this.id);
    this.departList();
    this.simple();
  },
};
</script>
<style scoped lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.app-container {
  margin: 10px;
  padding: 20px 140px;
}
</style>
