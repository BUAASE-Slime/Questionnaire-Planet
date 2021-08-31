<template>
  <div>
    <div class="locationHeader">
      <el-button icon="el-icon-map-location"
                 plain class="locateButton"
                 @click="getLocationProcess"
      >{{ locationDescription }}</el-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Location',
  data() {
    return {
      isLocated:false,
      locationInfo: {
        // ip: '',
        // country: '中国',
        // province: '北京市',
        // city: '北京市',
        // district: '海淀区',
        // location: '116.310316,39.956074',
        ip: '',
        country: '',
        province: '',
        city: '',
        district: '',
        location: '',
      },
      locationDescription: '点击获取地理位置',
    };
  },
  methods: {
    getLocationDiscription () {
      if (this.isLocated===false) return "点击获取地理位置";
      if (this.locationInfo.country === '中国') {
        if (this.locationInfo.province === this.locationInfo.city) {
          return this.locationInfo.city +" "+ this.locationInfo.district
        } else {
          return this.locationInfo.province +" "+ this.locationInfo.city +" "+ this.locationInfo.district
        }
      } else {
        return this.locationInfo.country
      }
    },
    getLocationProcess() {
      this.$confirm('将获取您的位置信息用于定位，是否同意？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '同意',
        cancelButtonText: '拒绝'
      })
      .then(() => {
        this.getLocation();
      })
      .catch(action => {
        if (action === 'cancel') {
          this.$message.warning("无法获取您的位置");
        }
      });
    },
    getLocation () {
      // -------------------------------loading
      const loading = this.$loading({
        lock: true,
        text: '正在获取您的位置信息',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // -------------------------------获取后端的ip
      this.$axios.get(this.GLOBAL.publicBackUrl+"sm/get/ip")
        .then( res => {
          this.locationInfo.ip = res.data.ip;

          // -------------------------------等待后端的ip
          var _this = this
          this.$axios.get("https://restapi.amap.com/v5/ip?key=348534b5ccaf5972b7b62bf8177e977a&type=4&ip="+this.locationInfo.ip)
              .then( response => {
                _this.locationInfo.country = response.data.country
                _this.locationInfo.province = response.data.province
                _this.locationInfo.city = response.data.city
                _this.locationInfo.district = response.data.district
                _this.locationInfo.location = response.data.location

                this.isLocated=true;
                this.locationDescription = this.getLocationDiscription();
                this.$emit('loadLoc', this.locationDescription);
                loading.close();
              })
          .catch(err => {
            console.log(err);
            this.$message.error("获取地址失败");
          })
        })
      .catch(err => {
        console.log(err);
        this.$message.error("获取IP地址失败");
      })
    }
  }
}
</script>

<style scoped>
.locateButton{
  text-align: center;
  /*border: solid 1px black;*/
  font-size: 14px;
  padding: 12px 20px;
  height: 40px;
  width: 300px;
  line-height: 1;
}
</style>