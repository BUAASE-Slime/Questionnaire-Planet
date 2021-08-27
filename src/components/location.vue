<template>
  <div>
    <div class="locationHeader">
      <el-button plain class="locateButton" @click="getLocation">{{locationDescription}}</el-button>
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
        ip: '',
        country: '中国',
        province: '北京市',
        city: '北京市',
        district: '海淀区',
        location: '116.310316,39.956074',
      }
    };
  },
  computed: {
    locationDescription () {
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
  },
  methods: {
    getLocation () {
      //-------------------------------等待后端的ip
      // var _this = this
      // this.$axios.get("https://restapi.amap.com/v5/ip?key=abc18eb572a76868ef82e48e6bde5e8c&type=4&ip="+this.locationInfo.ip)
      //     .then( response => {
      //       _this.locationInfo.country = response.data.country
      //       _this.locationInfo.province = response.data.province
      //       _this.locationInfo.city = response.data.city
      //       _this.locationInfo.district = response.data.district
      //       _this.locationInfo.location = response.data.location
      //       console.log(_this.locationInfo)
      //     })
      this.isLocated=true;
    }
  }
}
</script>

<style scoped>
.locateButton{
  height: 40px;
  width: 400px;
  font-size: 14px;
  line-height: 18px;
  text-align: left;
}
</style>