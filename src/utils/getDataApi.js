import user from "@/store/user";

export default {
    methods: {
        getQnDataSelf() {
            let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
            const formData = new FormData();
            formData.append("qn_id", this.$route.query.pid);
            this.$axios({
                method: 'post',
                url: '/sm/get/qn_detail',
                data: formData,
            })
                .then(res => {
                    loadingIns.close();
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
                            this.isLogic = res.data.is_logic;
                            this.timeFrame = res.data.finished_time;
                            this.max_recycling = res.data.max_recycling;

                            if (this.max_recycling >= 1000) {
                                this.hasRecycleLimit = false;
                                this.max_recycling = 10000;
                            } else
                                this.hasRecycleLimit = true;

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
            let loadingIns;
            if (_autoSave === false)
                loadingIns = this.$loading({fullscreen: true});
            this.$axios({
                method: 'post',
                url: '/sm/get/qn_detail',
                data: formData,
            })
                .then(res => {
                    if (_autoSave === false)
                        loadingIns.close();
                    switch (res.data.status_code) {
                        case 0:
                            this.$message.error("您无权访问！");
                            this.$router.push('/');
                            break;
                        case 1:
                            this.title = res.data.title;
                            this.description = res.data.description;
                            this.type = res.data.type;

                            if (_autoSave === true) {
                                var new_ques =  res.data.questions;
                                for (var k=0; k<new_ques.length; k++) {
                                    this.questions[k].options = new_ques[k].options;
                                }
                            } else {
                                this.questions = res.data.questions;
                            }


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
        getQnDataForFill(_autoSave=false, _requireAuth=true, _outOfOrder=false) {
            const userInfo = user.getters.getUser(user.state());
            if (_requireAuth && !userInfo) {
                this.$message.warning("请先登录");
                this.$router.push('/login');
                return;
            }

            const formData = new FormData();
            formData.append("code", this.$route.query.code);
            let loadingIns;
            if (_autoSave === false)
                loadingIns = this.$loading({fullscreen: true});
            this.$axios({
                method: 'post',
                url: '/sm/get/qn_for_fill',
                data: formData,
            })
                .then(res => {
                    if (_autoSave === false)
                        loadingIns.close();
                    switch (res.data.status_code) {
                        case 1:
                            this.title = res.data.title;
                            this.description = res.data.description;
                            this.type = res.data.type;
                            if (_autoSave === true) {
                                var new_ques =  res.data.questions;
                                for (var jj=0; jj<new_ques.length; jj++) {
                                    this.questions[jj].options = new_ques[jj].options;
                                }
                            } else {
                                this.questions = res.data.questions;
                            }
                            if (res.data.finished_time !== undefined && res.data.finished_time !== '') {
                                this.finished_time = res.data.finished_time;
                            }


                            if (_outOfOrder) {
                                this.quesStorage = JSON.parse(JSON.stringify(this.questions));

                                var info_ques = [];
                                var real_ques = [];
                                for (var k=0; k<this.quesStorage.length; k++) {
                                    if (this.quesStorage[k].type === 'name' || this.quesStorage[k].type==='stuId' || this.quesStorage[k].type==='class' || this.quesStorage[k].type === 'school')
                                        info_ques.push(this.quesStorage[k]);
                                    else
                                        real_ques.push(this.quesStorage[k]);
                                }
                                const userInfo = user.getters.getUser(user.state());
                                var new_questions = JSON.parse(JSON.stringify(real_ques));
                                var new_order = this.str2Array(userInfo.user.username, new_questions.length);
                                for (var j=0; j<new_questions.length; j++)
                                    real_ques[j] = new_questions[new_order[j]];
                                this.questions = info_ques.concat(real_ques);

                                //-----------------------调整id
                                for (var ii=0; ii<this.questions.length; ii++) {
                                    this.questions[ii].id = ii+1;
                                }
                            }

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
        },
    }
}