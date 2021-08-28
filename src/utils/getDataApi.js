import user from "@/store/user";

export default {
    methods: {
        getQnDataSelf() {
            const formData = new FormData();
            formData.append("qn_id", this.$route.query.pid);
            this.$axios({
                method: 'post',
                url: '/sm/get/qn_detail',
                data: formData,
            })
                .then(res => {
                    switch (res.data.status_code) {
                        case 0:
                            this.$message.error("您无权访问！");
                            this.$router.push('/');
                            break;
                        case 1:
                            this.title = res.data.title;
                            this.description = res.data.description;
                            this.type = res.data.type;
                            this.questions = res.data.questions;
                            this.isReleased = res.data.is_released;

                            // 多选题标准答案数据格式转换
                            if (this.type === '2') {
                                for (var i=0; i<this.questions.length; i++) {
                                    if (this.questions[i].type === 'checkbox') {
                                        this.questions[i].refer = this.questions[i].refer.split('-<^-^>-');
                                    }
                                }
                            }

                            this.InitOutline();
                            break;
                        default:
                            this.$message.error("访问失败！");
                            break;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getQnDataForPreview(_autoSave=false) {
            const formData = new FormData();
            formData.append("qn_id", this.$route.query.pid);
            this.$axios({
                method: 'post',
                url: '/sm/get/qn_detail',
                data: formData,
            })
                .then(res => {
                    switch (res.data.status_code) {
                        case 0:
                            this.$message.error("您无权访问！");
                            this.$router.push('/');
                            break;
                        case 1:
                            this.title = res.data.title;
                            this.description = res.data.description;
                            this.type = res.data.type;
                            this.questions = res.data.questions;

                            //建立答案框架
                            if (_autoSave === false) {
                                this.answers = []
                                for (var i=0; i<this.questions.length; i++) {
                                    this.answers.push({
                                        question_id: this.questions[i].question_id,
                                        type: this.questions[i].type,
                                        ans: null,
                                        ansList: [],
                                        answer: ''
                                    })
                                }
                            }

                            break;
                        default:
                            this.$message.error("访问失败！");
                            break;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getQnDataForFill(_autoSave=false, _requireAuth=true) {
            const userInfo = user.getters.getUser(user.state());
            if (_requireAuth && !userInfo) {
                this.$message.warning("请先登录");
                this.$router.push('/login');
                return;
            }

            const formData = new FormData();
            formData.append("code", this.$route.query.code);
            this.$axios({
                method: 'post',
                url: '/sm/get/qn_for_fill',
                data: formData,
            })
                .then(res => {
                    switch (res.data.status_code) {
                        case 1:
                            this.title = res.data.title;
                            this.description = res.data.description;
                            this.type = res.data.type;
                            this.questions = res.data.questions;

                            if (_autoSave === false) {
                                //建立答案框架
                                this.answers = [];
                                for (var i=0; i<this.questions.length; i++) {
                                    this.answers.push({
                                        question_id: this.questions[i].question_id,
                                        type: this.questions[i].type,
                                        ans: null,
                                        ansList: [],
                                        answer: ''
                                    })
                                }
                            }
                            break;
                        case 2:
                            this.$router.push('PageNotFound');
                            break;
                        case 3:
                            this.close = true;
                            break;
                        case 666:
                            this.close = true;
                            break;
                        case 888:
                            this.repeat = true;
                            break;
                        case 999:
                            this.repeat = true;
                            break;
                        default:
                            this.$message.error("访问失败！");
                            break;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}