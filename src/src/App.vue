<template>
  <div id="page-box">
    <!-- 标题 -->
    <h3 class="shortnet-title" ref="shortnettitle">{{maintitle}}</h3>
    <h4 class="small-title" @click="changeCode">{{smalltitle}}</h4>
    <!-- 输入表单组件 -->
    <inputbox v-show="shorten==true"></inputbox>
    <createcode v-show="shorten==false"></createcode>
    <!-- 短链接展示盒子组件 -->
    <resultbox v-show="resultshow"></resultbox>
  </div>
</template>
<script>
import inputbox from "./components/input-box.vue";
import resultbox from "./components/result-box.vue";
import createcode from "./components/create-code.vue";
export default {
  name: "app",
  data() {
    return {
      maintitle: "短链接生成平台",
      smalltitle: "直接生成二维码",
      shorten: true,
      resultshow: true
    };
  },
  components: {
    inputbox,
    resultbox,
    createcode
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const otitle = this.$refs.shortnettitle;
      let texts = "";

      //定义颜色
      let pmdfontColors = [
        { fontColor2: "#333333", shadowColor: "pink" },
        { fontColor2: "#444444", shadowColor: "pink" },
        { fontColor2: "#555555", shadowColor: "pink" },
        { fontColor2: "#666666", shadowColor: "pink" },
        { fontColor2: "#777777", shadowColor: "pink" },
        { fontColor2: "#888888", shadowColor: "pink" },
        { fontColor2: "#999999", shadowColor: "pink" }
      ];

      function setcolor(pmdfontColors) {
        //通过array方法进行遍历 拆分输出标题
        texts = "";
        Array.from(otitle.innerText).forEach((text, index) => {
          texts += `<span style="color:${pmdfontColors[index].fontColor2};text-shadow: 0 0 3px ${pmdfontColors[index].shadowColor}, 0 0 6px ${pmdfontColors[index].shadowColor}, 0 0 9px ${pmdfontColors[index].shadowColor};">${text}</span>`;
        });
        otitle.innerHTML = texts;
        // console.log(otitle.innerHTML);
      }
      setcolor(pmdfontColors);

      // //循环 形成跑马灯定时器
      setInterval(() => {
        pmdfontColors.unshift(pmdfontColors.pop());
        setcolor(pmdfontColors);
      }, 100);
    },
    changeCode() {
      this.$bus.$on("isresultshow", isshow => {
        console.log(isshow);
        this.resultshow = true;
      });
      if (this.shorten) {
        (this.maintitle = "网址转为二维码"), (this.smalltitle = "生成短链接");
        const otitle = this.$refs.shortnettitle;
        otitle.innerHTML = this.maintitle;
        this.shorten = false;
        this.resultshow = false;
      } else {
        (this.maintitle = "短链接生成平台"),
          (this.smalltitle = "直接生成二维码");
        const otitle = this.$refs.shortnettitle;
        otitle.innerHTML = this.maintitle;
        this.shorten = true;
        this.resultshow = false;
      }
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
#page-box {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: antiquewhite;
}
.shortnet-title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 55px;
  position: relative;
  top: 10%;
  color: antiquewhite;
  letter-spacing: 5px;
}
.small-title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 25px;
  position: relative;
  top: 6%;
  color: gray;
  text-decoration: underline;
}
</style>
