<template>
  <div>
    <el-cascader
      :props="props"
      :options="options"
      :value="value"
      size="mini"
      class="inputW"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
import { departmentApi } from "@/api/user";
import { transListToTreeData } from "@/utils/index";
export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
  },
  name: "OADetaliTree",
  data() {
    return {
      options: [],
      props: {
        label: "name",
        value: "id",
      },
    };
  },

  created() {
    this.List();
  },

  methods: {
    async List() {
      const res = await departmentApi();
      this.options = transListToTreeData(res, 0);
      // console.log(res);
    },
    handleChange(event) {
      console.log(event);
      if (event.length > 0) {
        this.$emit("input", event[event.length - 1]);
      } else {
        this.$emit("input", null);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
