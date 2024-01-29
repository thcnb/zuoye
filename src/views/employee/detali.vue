<template>
  <div class="container">
    <div class="app-container">
      <div class="edit-form">
        <el-form
          ref="form"
          :rules="rules"
          :model="detailForm"
          label-width="220px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="detailForm.username"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="工号">
                <el-input
                  v-model="detailForm.workNumber"
                  disabled
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号" prop="mobile">
                <el-input
                  v-model="detailForm.mobile"
                  :disabled="!!$route.params.id"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <!-- 级联选择器 -->
                <Tree v-model="detailForm.departmentId"></Tree>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select
                  v-model="detailForm.formOfEmployment"
                  size="mini"
                  class="inputW"
                >
                  <el-option label="正式" :value="1" />
                  <el-option label="非正式" :value="0" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  v-model="detailForm.timeOfEntry"
                  size="mini"
                  class="inputW"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker
                  v-model="detailForm.correctionTime"
                  size="mini"
                  class="inputW"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <!-- 图片上传组件 -->
                <Img v-model="detailForm.staffPhoto"></Img>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" style="margin-left: 220px">
              <el-button size="mini" type="primary" @click="handleSave"
                >保存</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from "./commpunent/detaliTree.vue";
import Img from "./commpunent/img.vue";
import {
  addemployeeListApi,
  detalimployeeListApi,
  emitmployeeListApi,
} from "@/api/employee";
export default {
  name: "OADetali",
  components: {
    Tree,
    Img,
  },
  data() {
    return {
      detailForm: {
        correctionTime: "",
        departmentId: null,
        formOfEmployment: "",
        mobile: "",
        staffPhoto: "",
        timeOfEntry: "",
        username: "",
        workNumber: "",
      },
      rules: {
        correctionTime: [
          { required: true, message: "请输入转正时间", trigger: "blur" },
          {
            validator: (rule, value, callBack) => {
              if (this.detailForm.timeOfEntry) {
                if (new Date(this.detailForm.timeOfEntry) > new Date(value)) {
                  return callBack(new Error("转正时间不能小于入职时间"));
                } else {
                  callBack();
                }
              }
            },
            trigger: "blur",
          },
        ],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "change" },
        ],
        formOfEmployment: [
          { required: true, message: "请选择聘用形式", trigger: "change" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        timeOfEntry: [
          { required: true, message: "请输入入职时间", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 4, message: "长度在1-4个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      this.detali();
    }
  },
  methods: {
    handleSave() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.$route.params.id) {
            // 编辑模式
            await emitmployeeListApi(this.$route.params.id, {...this.detailForm,id:this.$route.params.id});
            this.$message.success("更新员工成功");
          } else {
            // 新增模式
            await addemployeeListApi(this.detailForm);
            this.$message.success("新增员工成功");
          }
          this.$router.push("/employee");
        } else {
          return false;
        }
      });
    },
    async detali() {
      const res = await detalimployeeListApi(this.$route.params.id);
      this.detailForm = res;
    },
  },
};
</script>

<style lang="scss" scoped></style>
