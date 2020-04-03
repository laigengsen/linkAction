<template>
  <section class="shortnet-content">
    <!-- 提示信息 -->
    <section class="message-text" v-show="status==='error'">{{message}}</section>
    <!-- 加载状态 -->
    <img src="favicon.ico" class="shortnet-loading" v-show="status==='loading'" />
    <!-- 显示短链接和二维码 -->
    <section class="shortnet-click" v-show="status==='successed'">
      <span class="dc-link">
        短链接:
        <a :href="shortUrl" class="dc-link-text" target="__blank">{{shortUrl}}</a>
      </span>
      <br />
      <span class="dc-qrcode" ref="qrcode">
        二维码：
        <i id="qrcode"></i>
      </span>
    </section>
  </section>
</template>

<script>
import QRCode from "QRCode";
export default {
  data() {
    return {
      message: "提示信息",
      status: "", //三个状态 错误error，加载中loading 加载成功successed 
      longUrl: "",
      shortUrl: "",
    };
  },
  methods: {
    init() {
      // console.log(QRCode);
      this.$bus.$on("sendLongUrl", config => {
        console.log(config);
        this.status = "";
        this.longUrl = config.link;
        if (config.status) {
          //请求接口 带上长链接
          this.requestShortUrl();
        } else {
          this.status = "error";
          this.message = config.message;
        }
      });

      this.$bus.$on("createqrcode", config => {
        console.log(config);
        this.status = "";
        this.longUrl = config.link;
        if (config.status) {
          //请求接口 带上长链接
          this.requestCreateqrcode();
        } else {
          this.status = "error";
          this.message = config.message;
        }
      });
    },
    requestShortUrl() {
      //进入加载状态
      this.status = "loading";
      //清除旧的二维码
      this.$refs.qrcode.innerHTML = "";
      //请求短链接
      fetch("http://127.0.0.1/api/url/shorten", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          longUrl: this.longUrl
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.status = "successed";
          this.shortUrl = res.shortUrl;

          //生成二维码
          this.creatQRCode();
        });
    },

        requestCreateqrcode() {
      //进入加载状态
      this.status = "loading";
      //清除旧的二维码
      this.$refs.qrcode.innerHTML = "";
      //请求短链接
      fetch("http://127.0.0.1/api/url/shorten", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          longUrl: this.longUrl
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.status = "successed";
          this.shortUrl = res.longUrl;

          //生成二维码
          this.creatQRCode();
        });
    },


    creatQRCode() {
      new QRCode(this.$refs.qrcode, this.shortUrl);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.shortnet-content {
  width: 100%;
  height: 40px;
  position: absolute;
  top: 30%;
  text-align: center;
  vertical-align: middle;
}
.dc-qrcode {
  width: 100%;
  height: 40px;
  text-align: center;
  vertical-align: middle;
}
.dc-qrcode img {
  margin: 0 auto;
}
.shortnet-click {
  width: 100%;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  color: darksalmon;
}
</style>