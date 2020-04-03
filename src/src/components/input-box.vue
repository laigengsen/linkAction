<template>
  <section class="shortnet-input-box">
    <input type="text" class="input-box" placeholder="请输入长链接" v-model="longUrl" />
    <span class="input-btn" @click="getLink">click</span>
  </section>
</template>

<script>
const validUrl = require("valid-url");
export default {
  data() {
    return {
      longUrl: "",
      isshow: true,
      config: {
        status: false,
        link: "",
        message: ""
      }
    };
  },
  methods: {
    getLink() {
      //构造
      this.config.status = true;
      this.config.link = this.longUrl;
      this.config.message = "";

      // 1.验证格式是否合法
      //验证是否为空
      if (!this.longUrl.replace(/\s*/g) && this.config.status) {
        this.config.message = "长连接不能为空";
        this.config.status = false;
      }
      // 验证是否符合规范 isUri为安装的validUrl包的方法 验证是否是合法地址
      if (!validUrl.isUri(this.longUrl) && this.config.status) {
        this.config.message = "长连接格式错误";
        this.config.status = false;
      }
      // 2.把配置信息发送给resultbox处理
      //已在main.js中对挂载$bus 通过事件方法向兄弟组件传值
      // $emit为发送 result页面用$on进行接收
      this.$bus.$emit("sendLongUrl", this.config);
      this.$bus.$emit("isresultshow", this.isshow);
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.shortnet-input-box {
  width: 100%;
  height: 40px;
  position: absolute;
  top: 23%;
  text-align: center;
  vertical-align: middle;
  margin-top: 10px;
  margin-bottom: 10px;
}
.input-box {
  width: 400px;
  height: 40px;
  border-radius: 50px;
  border: none;
}
.input-btn {
  display: inline-block;
  padding: 5px;
  color: black;
  height: 100%;
  font-size: 20px;
  line-height: 35px;
  border-radius: 50px;
  background-color: darksalmon;
  border: none;
  text-align: center;
  vertical-align: middle;
}
</style>