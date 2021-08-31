import QRCode from "qrcodejs2";

export default {
    methods: {
        makeCodeAgain(surveyType) {
            const formData = new FormData();
            formData.append("qn_id", this.$route.query.pid);
            this.$axios({
                method: 'post',
                url: '/qn/change/code',
                data: formData,
            })
                .then(res => {
                    if (res.data.status_code === 1) {
                        this.linkShare = this.GLOBAL.baseUrl + "/" + this.GLOBAL.fillUrl[parseInt(surveyType)-1] +"?mode=1&code=" + res.data.code;

                        if (this.qrcode == null) {
                            this.qrcode = new QRCode(document.getElementById("qrcode_2"), {
                                width: 200, //生成的二维码的宽度
                                height: 200, //生成的二维码的高度
                                colorDark : "#000000", // 生成的二维码的深色部分
                                colorLight : "#ffffff", //生成二维码的浅色部分
                                correctLevel : QRCode.CorrectLevel.H
                            });
                        }
                        this.qrcode.clear();
                        this.qrcode.makeCode(this.linkShare);
                    } else {
                        this.$message.error("请求失败！");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        downloadQrcode() {
            // 获取base64的图片节点
            var img = document.getElementById('qrcode_2').getElementsByTagName('img')[0];
            // 构建画布
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            // 构造url
            var url = canvas.toDataURL('image/png');
            // 构造a标签并模拟点击
            var downloadLink = document.createElement('a');
            downloadLink.download = '二维码.png';
            downloadLink.href = url;
            downloadLink.click();
            downloadLink.remove();
        }
    }
}