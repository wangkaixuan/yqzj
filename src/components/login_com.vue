<template>
  <div class="login_wrap">
    <p class="sm_tswary" the-id="sm_tswary">扫码登录在这里 <i></i></p>
    <i class="ewm_but" the-id="ewm_but"></i>
    <div the-id="pc_login" class="user_loginwrap">
      <p><img src="../assets/image/login/logintitle.png" alt=""></p>
      <p class="error" the-id="error_hint"></p>
      <form action="" onsubmit="">
        <input type="hidden" name="loginflag" value="1">
        <div class="loginuser_wrap">
          <ul>
            <li>
              <input type="text" class="input_text" name="userid" value="" placeholder="手机号"/>
              <p class="ts"></p>
            </li>
            <li>
              <input type="password" name="password" class="input_text" placeholder="密码"/>
            </li>
            <li class="codewary" the-id="code">
              <input type="" name="code" class="input_text" placeholder="验证码"/>
              <span class="sendsms" the-id="sendsms">发送短信验证码</span>
            </li>
            <li class='forgotP-wrapper'>
              <span class='forgotP' the-id='forgotP'>忘记密码？</span>
            </li>
            <li style="margin-bottom: 15px;margin-top:14px;">
              <input type="submit" class="input_sub" the-id="yqzj_input_subs" value="登 录"/>
            </li>
            <li class="appdown">
              <div the-id="ewm"></div>
              <span the-id="appdown"><img src="../assets/image/login/app.png" > 舆情专家APP</span>
            </li>
          </ul>
        </div>
      </form>
    </div>
    <div the-id="ewm_login" class="ewm_wary">
      <p class="p1">扫码登录</p>
      <p class="error" the-id="ewm_error"></p>
      <div></div>
      <p class="p2">打开舆情专家APP 扫码登录</p>
      <i the-id="past_ewm"></i>
    </div>
  </div>
</template>
<script>
  export default{

  }
</script>
<style lang="css" scoped>
  .login_wrap{width: 492px;height: 450px;float: right;background: url("../assets/image/login/qwe.png")no-repeat;background-size:cover; position: relative;}
  .login_wrap .ewm_but{width: 56px;height: 57px;position: absolute;background: url("../assets/image/login/ewm_but.png") no-repeat;top:48px;right: 44px;cursor: pointer;}
  .login_wrap .ewm_but_pc{background: url("../assets/image/login/pc_login.png") no-repeat;}
  .login_wrap .sm_tswary{display: block;background:rgba(000,000,000,0.3);padding:6px;position: absolute;top:52px;right: 100px;color:#999;font-family: 黑体;}
  .login_wrap .sm_tswary i{display: block;position:absolute;top:8px;right: -6px;width: 0px;height: 0px;border-top:6px solid transparent;
    border-bottom: 6px solid transparent; border-left: 6px solid rgba(000,000,000,0.3);}
  .user_loginwrap{text-align: center;}
  .user_loginwrap p img{text-align: center;}
  .user_loginwrap{margin-top: 80px;}
  .loginuser_wrap ul{margin-top: -10px;}
  .loginuser_wrap ul li{margin-top: 18px;}
  .loginuser_wrap ul .forgotP-wrapper{text-align: right;margin-top:14px;}
  .loginuser_wrap ul .forgotP-wrapper .forgotP{color:#fff;margin-right: 90px;cursor: pointer;}
  .loginuser_wrap ul li input{border-radius: 5px;color:#c5e9fe;}
  .loginuser_wrap ul li .input_text{width: 290px;height: 35px;background: none;border: 1px solid #0ba4ff;color: #ffffff;padding-left: 10px;}
  .loginuser_wrap ul li .input_sub{width: 303px;height: 35px;background: none;border: 1px solid #0ba4ff;color: #ffffff;padding-left: 10px;background: #0ba4ff;cursor: pointer}
  .codewary{display: none;position:relative;}
  .codewary .sendsms{display:inline-block;background-color:#fff;border-radius: 5px;height: 25px;padding: 0 3px;line-height:26px;position: absolute;top:6px; right: 100px;cursor: pointer;color:#0ba4ff;font-family: 黑体;}
  .codewary .disabled{color:#666;}
  /*二维码*/
  .ewm_wary{width:400px;margin: 100px auto 0;display:none;position: relative;}
  .ewm_wary .p1{font-size: 28px;font-family:黑体;color:#fff;font-weight: bold;width: 100%;text-align: center;}
  .ewm_wary .p2{font-size: 14px;color:#fff;width: 100%;text-align: center;margin-top: 10px;font-family:黑体;}
  .ewm_wary .error{text-align: center;visibility:hidden;}
  .ewm_wary div{width:180px;height:180px;margin: 10px auto 0;background-color: #fff;padding: 5px;}
  .ewm_wary i{display: none;width: 45px;height: 14px;position: absolute;top:245px;right: 50px;background: url("../assets/image/login/refresh_but.png") no-repeat;cursor:pointer;}
  .appdown{color:#fff;cursor: pointer;font-family: 黑体;font-size: 14px;position: relative;}
  .appdown > div{width: 195px;height: 220px;position: absolute;top:-220px;left:50%;background: url("../assets/image/login/erwm.png") no-repeat;margin-left: -97px;display: none;}
  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .error{color:#fc4343;font-size: 12px;height: 24px;line-height: 24px;margin: 5px 0;}
</style>
