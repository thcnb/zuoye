<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          style="margin-bottom: 10px"
          prefix-icon="el-icon-search"
          placeholder="输入员工姓名全员搜索"
          size="small"
          v-model="from.keyword"
          @input="change"
          @blur="changes"
        ></el-input>
        <span v-if="data.length == 0" style="text-align: center; color: #ccc"
          >正在加载.</span
        >
        <el-tree
          v-else
          :data="data"
          :default-expand-all="true"
          @current-change="selectNode"
        >
          <template v-slot="{ data }">
            {{ data.name }}
          </template>
        </el-tree>
      </div>
      <div class="right">
        <div class="rightTop">
          <el-button size="mini">群发通知</el-button>
          <div style="margin-right: 165px">
            <el-button size="mini" type="primary">添加员工</el-button>
            <el-button size="mini">excel导入</el-button>
            <el-button size="mini">excel导出</el-button>
          </div>
        </div>
        <el-table ref="multipleTable" :data="tableData">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="staffPhoto" width="80px" label="头像">
            <template v-slot="{ row }">
              <img
                v-if="row.staffPhoto"
                :src="row.staffPhoto"
                class="user-avatar"
              />
              <span style="padding: 5px" class="user-avatar" v-else>{{
                row.username.charAt(2)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" width="100px" label="姓名">
          </el-table-column>
          <el-table-column prop="mobile" width="110px" label="手机号" sortable>
          </el-table-column>
          <el-table-column
            prop="workNumber"
            width="120px"
            label="工号"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="formOfEmployment"
            width="80px"
            label="聘用形式"
          >
            <template v-slot="{ row }">
              <span>{{
                row.formOfEmployment == 1
                  ? "正式"
                  : row.formOfEmployment == 0
                  ? "非正式"
                  : "无"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" width="120px" label="部门">
          </el-table-column>
          <el-table-column prop="timeOfEntry" label="入职时间" sortable>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button type="text">查看</el-button>
              <el-button type="text">角色</el-button>
              <el-button @click="del(row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="from.pagesize"
          @current-change="handleCurrentChange"
          :current-page.sync="from.page"
          :page-size="5"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { departmentApi } from "@/api/user";
import { employeeListApi } from "@/api/employee";
import { transListToTreeData } from "@/utils/index";
export default {
  name: "OAIndex",

  data() {
    return {
      data: [],
      tableData: [],
      from: {
        page: 1,
        pagesize: 8,
        keyword: "",
        departmentId: 1,
      },
      total: 0,
    };
  },

  created() {
    this.departList();
    this.employee();
  },
  methods: {
    //获取tree列表
    selectNode(event) {
      this.from.departmentId = event.id;
      this.from.page = 1;
      this.employee();
    },
    async departList() {
      const res = await departmentApi();
      this.data = transListToTreeData(res, 0);
    },
    //获取表格列表
    async employee() {
      const res = await employeeListApi(this.from);
      this.tableData = res.rows;
      this.total = res.total;
    },
    //模糊搜索
    change() {
      this.page = 1;
      this.employee();
    },
    changes() {
      if (this.from.keyword == "") {
        this.employee();
      } else {
        this.page = 1;
        this.employee();
      }
    },
    //删除
    del(row) {},
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.employee();
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  margin-top: 10px;
  display: flex;
  .left {
    width: 20%;
    overflow: hidden;
    height: 100%;
    padding: 10px;
    border-right: 1px solid #f5f5f5;
  }
  .right {
    width: 80%;
    padding: 15px;
    margin-right: 60px;
    .user-avatar {
      width: 30px;
      height: 30px;

      text-align: center;
      line-height: 30px;
      border-radius: 50%;
      background: #04c9be;
      color: #fff;
      margin-right: 4px;
    }

    .rightTop {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
