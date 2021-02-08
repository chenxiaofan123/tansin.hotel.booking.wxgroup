<template>
  <div class="checkInContent">
      <div class="orderForm">
         <van-cell-group class="wightbg">
                <div class="tab clearfix">
                  <div class="fl title">发票类型</div>
                   <div class="fr button" >
                     <div class="fr">普通发票</div>
                     <div class="active fr">增值税专用发票</div>
                   </div>
                </div>
                 <van-field
                    v-model="revUser"
                    label="发票抬头"
                    placeholder="输入公司名称"
                />
          </van-cell-group>
         <van-cell-group class="shuihao wightbg" >
                <van-field
                    v-model="revUser"
                    label="税号"
                    placeholder="必填，请输入公税号"
                    required
                />
          </van-cell-group>
          <van-cell-group class="wightbg">
                <van-field
                    v-model="revUser"
                    label="公司地址"
                    placeholder="必填，请输入公司地址"
                    required
                />
                <van-field
                    v-model="mobile"
                    label="公司电话"
                    placeholder="必填，请输入公司电话"
                    maxlength='11'
                    required
                />
                 <van-field
                    v-model="mobile"
                    label="开户银行"
                    placeholder="必填，请输入开户银行"
                    maxlength='11'
                    required
                />
                 <van-field
                    v-model="mobile"
                    label="银行账号"
                    placeholder="必填，请输入银行账号"
                    maxlength='11'
                    required
                />
            </van-cell-group>
            
      </div>
      <div class="footerBtn">保存</div>    
     
  </div>
</template>

<script>
import Vue from 'vue'
import axiosurlService from '../../../resource/axiosurlService'
export default {
  name: 'index',
   data () {
    return {
      number:null,
      mobile:null,
      remark:null,
      revUser:null

        
    }
  },
  components: {  
    
  },
  watch:{

  },
  methods: {
     
    
  },
  mounted() {
    
  }
}
</script>

<style lang='less' src='./less/checkIn2.less'>

</style>

