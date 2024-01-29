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
          >正在加载...........</span
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
            <el-button size="mini" @click="add" type="primary"
              >添加员工</el-button
            >
            <el-button size="mini" @click="showDialog = true"
              >excel导入</el-button
            >
            <el-button size="mini" @click="exportExcle">excel导出</el-button>
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
                row.username.charAt(0)
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
              <el-button type="text" @click="emit(row.id)">查看</el-button>
              <el-button type="text">角色</el-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="del(row)"
              >
                <el-button type="text" slot="reference">删除</el-button>
              </el-popconfirm>
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
    <ImportExcel
      :show-dialog.sync="showDialog"
      @uploadSuccess="employee"
    />
  </div>
</template>

<script>
import { departmentApi } from "@/api/user";
import ImportExcel from "./commpunent/import-excel.vue";
import {
  employeeListApi,
  exportExcleApi,
  delmployeeListApi,
} from "@/api/employee";
import { transListToTreeData } from "@/utils/index";
import FileSaver from "file-saver";
import _ from "lodash";
export default {
  name: "OAIndex",
  components: {
    ImportExcel,
  },
  data() {
    return {
      showDialog: false, // 控制excel的弹层显示和隐藏
      //tree结构
      data: [],
      //表格
      tableData: [],
      //表格参数
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
    //点击tree列表渲染右侧数据
    selectNode(event) {
      this.from.departmentId = event.id;
      this.from.page = 1;
      this.employee();
    },
    //获取tree列表
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

    change: _.debounce(function () {
      this.page = 1;
      this.employee();
    }, 300),
    changes() {
      if (this.from.keyword == "") {
        this.employee();
      } else {
        this.page = 1;
        this.employee();
      }
    },
    //删除
    async del(row) {
      console.log(row);
      await delmployeeListApi(row.id);
      this.employee();
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.employee();
    },

    //跳转到添加页面添加
    add() {
      this.$router.push("/detali");
    },
    //导出excel
    async exportExcle() {
      const res = await exportExcleApi();
      console.log(res);
      FileSaver.saveAs(res, "员工信息表.xlsx");
    },
    //跳转到添加页面 编辑
    emit(id) {
      this.$router.push(`/detali/${id}`);
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
