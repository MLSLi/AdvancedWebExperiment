<template>
  <div class="home-page">
    <!-- 顶部横幅区域 -->
    <div class="container background-top">
      <div class="row mx-5">
        <div class="col mt-2">
          <img src="/assets/logo_white.svg" alt="SVG Image" />
        </div>
        <div class="col d-flex justify-content-end">
          <button
            class="btn btn-transparent mx-3 mt-2"
            type="button"
            @click="openLogin"
          >
            登录
          </button>
          <button
            class="btn btn-transparent mt-2"
            type="button"
            @click="openRegister"
          >
            注册
          </button>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col text-center">
          <h2 class="white-text">云端编程，浏览器里边学边练</h2>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col text-center">
          <h5 class="white-text">
            软件定义一切，网络连接时空，学习软件技术，创造未来世界。
          </h5>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col text-center">
          <button
            type="button"
            class="btn btn-lg btn-learn-right-now"
            @click="jumpReact"
          >
            马上学习
          </button>
        </div>
      </div>
    </div>

    <!-- 云端编程实验室 -->
    <div class="container background-grey">
      <div class="row pt-5">
        <div class="col text-center">
          <img src="/assets/img_lab.png" />
        </div>
      </div>
      <div class="mt-2 ms-5">
        <h2><b>云端编程实验室</b></h2>
      </div>
      <div class="my-4 ms-5">
        <h5>
          每人拥有自己完全独立的编程实验室，内置所有基础软件及学习素材。打开浏览器，即刻开始编程！
        </h5>
      </div>
      <div class="ms-5 pb-5">
        <button type="button" class="btn btn-grey" @click="jumpReact">
          了解详情
        </button>
      </div>
    </div>

    <!-- 双屏学习 -->
    <div class="container">
      <div class="row mt-5">
        <div class="col text-center">
          <img src="/assets/img_screens.png" />
        </div>
      </div>
      <div class="ms-5 mt-5">
        <h2><b>双屏学习</b></h2>
      </div>
      <div class="my-4 ms-5">
        <h5>
          双屏学习，小屏视频互动，大屏实际操作，学习无障碍。打开浏览器，即刻开始编程！
        </h5>
      </div>
      <div class="ms-5 pb-5">
        <button type="button" class="btn btn-grey" @click="jumpReact">
          了解详情
        </button>
      </div>
    </div>

    <!-- 课程特色 -->
    <div class="container">
      <div class="ms-5 mt-3">
        <h3><b>课程特色</b></h3>
      </div>
      <hr class="ms-5" />
    </div>

    <div class="container">
      <div class="row pt-5">
        <FeatureCard
          wrapperClass="mx-5"
          icon="/assets/icon_show_window.png"
          title="丰富的教学服务"
          description="特色教学服务功能，各种配套教学服务，在线学习从未如此轻松。"
        />
        <FeatureCard
          icon="/assets/icon_user.png"
          title="多元的学习方式"
          description="知识提炼、答疑解惑、实时互动、开发有特色的教学服务方式。"
        />
        <FeatureCard
          icon="/assets/icon_setting.png"
          title="高品质的学习体验"
          description="多屏合一，随时学习，随时在线，学习记录一目了然，知识充电不再受限。"
        />
      </div>
    </div>

    <!-- 页脚 -->
    <div class="container background-grey">
      <div class="mx-5 mt-5 py-4 text-center">
        ©2024 云端科技 Artech All rights reserved
      </div>
    </div>

    <!-- 注册弹窗 -->
    <ModalDialog :show="showRegister" title="注册" @close="closeRegisterWindow">
      <div class="container">
        <FormField label="用户名" v-model="username" />
        <FormField label="密码" type="password" v-model="password" />
        <div class="row mt-3">
          <div class="col">
            <button
              class="btn btn-primary"
              @click="submitRegister"
              :disabled="isLoading"
            >
              {{ isLoading ? "注册中..." : "注册" }}
            </button>
            <button class="btn btn-secondary ms-4" @click="reset">重置</button>
          </div>
        </div>
        <div class="row mt-3" v-if="message">
          <div class="col text-center">
            <div
              class="alert"
              :class="
                messageType === 'success' ? 'alert-success' : 'alert-danger'
              "
              role="alert"
            >
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </ModalDialog>

    <!-- 登录弹窗 -->
    <ModalDialog :show="showLogin" title="登录" @close="closeLoginWindow">
      <div class="container">
        <FormField label="用户名" v-model="username" />
        <FormField label="密码" type="password" v-model="password" />
        <div class="row mt-3">
          <div class="col">
            <button
              class="btn btn-primary"
              @click="submitLogin"
              :disabled="isLoading"
            >
              {{ isLoading ? "登录中..." : "登录" }}
            </button>
            <button class="btn btn-secondary ms-4" @click="reset">重置</button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <u @click="jumpToRegisterWindow" class="blue-text"
              >没有账号？立即注册！</u
            >
          </div>
        </div>
        <div class="row mt-3" v-if="message">
          <div class="col text-center">
            <div
              class="alert"
              :class="
                messageType === 'success' ? 'alert-success' : 'alert-danger'
              "
              role="alert"
            >
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </ModalDialog>
  </div>
</template>

<script setup>
import ModalDialog from "./components/ModalDialog.vue";
import FormField from "./components/FormField.vue";
import FeatureCard from "./components/FeatureCard.vue";

import useHomePage from "./js/homePageSetup.js";

const {
  showLogin,
  showRegister,
  username,
  password,
  openLogin,
  openRegister,
  submitRegister,
  reset,
  message,
  messageType,
  submitLogin,
  closeLoginWindow,
  closeRegisterWindow,
  jumpToRegisterWindow,
  jumpReact,
  isLoading,
} = useHomePage();
</script>

<style scoped>
.background-top {
  width: 100%;
  height: 400px;
  background-image: url("/assets/home_banner.jpg");
  background-size: cover;
  background-position: center;
}

.background-grey {
  background-color: #efefef;
}

.btn-transparent {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  transition: all 0.3s ease;
}

.btn-grey {
  color: #757575;
  border: 2px solid #757575;
}

.btn-learn-right-now {
  background-color: white;
  color: blue;
}

.btn-transparent:hover {
  background-color: white;
  color: #333;
}

.white-text {
  color: white;
}

.blue-text {
  color: blue;
  cursor: pointer;
}
</style>
