import { ref } from "vue";
import axios from "axios";
import { userLogin, userRegister } from "@/api/user";

export default function useHomePage() {
  // 注册弹窗逻辑
  const showRegister = ref(false);
  const showLogin = ref(false);

  const username = ref("");
  const password = ref("");

  const isLoading = ref(false);
  const message = ref("");
  const messageType = ref("");

  function hideSlideBar() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollbarWidth + "px";
  }

  function showSlideBar() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    message.value = "";
  }

  function checkFormat() {
    if (!username.value.trim() || !password.value.trim()) {
      message.value = "用户名和密码不能为空";
      messageType.value = "error";
      return false;
    }

    if (username.value.length < 3) {
      message.value = "用户名长度不能少于3";
      messageType.value = "error";
      return false;
    }

    if (password.value.length < 6) {
      message.value = "密码长度不能少于6";
      messageType.value = "error";
      return false;
    }

    return true;
  }

  const openRegister = () => {
    showRegister.value = true;
    hideSlideBar();
  };

  const closeRegisterWindow = () => {
    reset();
    showRegister.value = false;
    showSlideBar();
  };

  const closeLoginWindow = () => {
    reset();
    showLogin.value = false;
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    message.value = "";
  };

  const openLogin = () => {
    showLogin.value = true;
    hideSlideBar();
  };

  const submitRegister = async () => {
    const isValid = checkFormat();

    if (!isValid) {
      return;
    }

    isLoading.value = true;
    message.value = "";

    try {
      const payload = {
        username: username.value,
        password: password.value,
      };

      const response = await userRegister(payload);
      const resData = response.data;

      if (resData.code === 200) {
        message.value = "注册成功！";
        messageType.value = "success";

        setTimeout(() => {
          reset();
          showRegister.value = false;
          showLogin.value = true;
        }, 1500);
      } else {
        message.value = "注册失败！用户名已存在";
        messageType.value = "error";
      }
    } catch (error) {
      message.value = "注册失败，请重试";
      messageType.value = "error";
      console.error("注册错误:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const submitLogin = async () => {
    const isValid = checkFormat();

    if (!isValid) {
      return;
    }

    isLoading.value = true;
    message.value = "";

    try {
      const payload = {
        username: username.value,
        password: password.value,
      };

      const response = await userLogin(payload);
      const resData = response.data;

      if (resData.code === 200) {
        message.value = "登录成功！";
        messageType.value = "success";

        setTimeout(() => {
          reset();
          closeLoginWindow();
        }, 1500);
      } else {
        message.value = "登录失败！用户名已存在";
        messageType.value = "error";
      }
    } catch (error) {
      message.value = "登录失败，请重试";
      messageType.value = "error";
      console.error("登录错误:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    username.value = "";
    password.value = "";
    message.value = "";
  };

  const jumpToRegisterWindow = () => {
    reset();
    showLogin.value = false;
    showRegister.value = true;
  };

  const jumpReact = () => {
    alert("登录立即体验！");
  };

  return {
    showRegister,
    showLogin,
    username,
    password,
    isLoading,
    message,
    messageType,
    openLogin,
    submitLogin,
    openRegister,
    closeRegisterWindow,
    closeLoginWindow,
    jumpToRegisterWindow,
    submitRegister,
    reset,
    jumpReact,
  };
}
