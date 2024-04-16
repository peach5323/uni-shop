<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  import showMsg from '../../utils/showMsg';
  import {getTokenAPI} from '@/apis/login.js'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods:{
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
      getUserInfo(e){
        this.updateUserInfo(e.detail.userInfo)
        this.getToken(e.detail)
      },
      async getToken(info){
        const [err, res] = await uni.login().catch(err => err)
        // console.log(err,res);
        if(err || res.errMsg !=='login:ok') return showMsg({title:'登录失败！'})
        
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // const res1 = await getTokenAPI(query)
        // console.log(res1);
        this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
        this.navigateBack()
      },
      navigateBack(){
        if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    },
    computed: {
      ...mapState('m_user',['redirectInfo'])
    },
  }
</script>

<style lang="scss">
.login-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 750rpx;
  background-color: #f8f8f8;
  &::after{
    content: "  ";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
    width: 100%;
    height: 40px;
    background-color: white;
  }
  .btn-login{
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
  .tips-text{
    font-size: 12px;
    color:gray;
  }
}
</style>