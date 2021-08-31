import user from "@/store/user";

export default {
    methods: {
        submitAns(surveyType) {
            let url;
            switch (surveyType) {
                case '1': case '3':
                    url = '/qn/save_ans';
                    break;
                case '2':
                    url = '/sm/save/exam/paper/by/code';
                    break;
                case '4':
                    url = '/sp/save_answer_by_code';
                    break;
                case '5':
                    url = '/ep/save_ans_by_code';
                    break;
            }
            // 必选检查
            let answers = this.answers;
            let questions = this.questions;
            let bool = false;
            let num = '';

            for (let j=0; j<questions.length; j++) {
                if (questions[j].must && !(questions[j].is_shown && this.ahead(questions[j].last_question)))
                    questions[j].must = false;
            }

            for (let i=0; i<answers.length; i++) {
                if (answers[i].type === 'location') {
                    if (questions[i].must && this.locationInfo === '') {
                        num += (i+1).toString() + ' ';
                        bool = true;
                    }
                }
                else if (questions[i].must
                    && (answers[i].ans===null || answers[i].ans==='' || (answers[i].ans===0 && answers[i].type==='mark'))
                    && answers[i].ansList.length===0) {
                    num += (i+1).toString() + ' ';
                    bool = true;
                }
            }
            if (bool) {
                this.$message.warning('必填问题 ' + num + ' 尚未作答完毕，无法提交');
                return;
            }
            // 预览mode判断
            if (this.mode==='0' || this.mode===0) {
                this.$message({
                    type: 'warning',
                    message: '预览模式下无法提交问卷'
                });
                return;
            }
            // 数据转换
            for (var i=0; i<this.answers.length; i++) {
                this.answers[i].question_id = this.questions[i].question_id;
                switch (this.answers[i].type) {
                    case "radio": case "text": case "judge":
                        this.answers[i].answer = this.answers[i].ans;
                        break;
                    case "checkbox":
                        this.answers[i].answer = this.answers[i].ansList.join('-<^-^>-');
                        break;
                    case 'location':
                        this.answers[i].answer = this.locationInfo;
                        break;
                    case "mark": default:
                        this.answers[i].answer = this.answers[i].ans.toString();
                        break;
                }
            }
            // 提交确认
            this.$confirm('确认提交问卷？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
                var param = {
                    code: this.$route.query.code,
                    answers: this.answers,
                };
                var paramer = JSON.stringify(param, {answers: 'brackets'})
                this.$axios({
                    method: 'post',
                    url: url,
                    data: paramer,
                })
                    .then(res => {
                        loadingIns.close();
                        switch (res.data.status_code) {
                            case 1:
                                this.$message({
                                    type: 'success',
                                    message: '问卷提交成功'
                                });
                                this.success = true;
                                break;
                            case 2: case 3: case 4: case 666:
                                this.$message.warning("问卷已结束，感谢您的参与！");
                                this.close = true;
                                break;
                            case 11 :
                                this.$message.warning("报名人数已满，感谢您的参与！");
                                this.allfull = true;
                                break;
                            case 12:
                                this.$message.warning("您填报的选项报名人数已满，感谢您的参与！");
                                this.full = true;
                                break;
                            case 21:
                                this.$message.warning("您已报名成功，请勿重复填写！");
                                this.repeat = true;
                                break;
                            case 999:
                                this.$message.warning("今日已打卡，无需重复提交！");
                                this.repeat = true;
                                break;
                            default:
                                this.$message.error("操作失败！");
                                break;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }).catch(() => {

            });
        },
        saveQnInfo(tag, surveyType) {
            var new_questions = JSON.parse(JSON.stringify(this.questions));
            let url;
            switch (surveyType) {
                case "1":
                    url = '/sm/save/qn_keep/history';
                    break;
                case "2":
                    url = '/sm/save/qn_keep/history';
                    for (var i=0; i<new_questions.length; i++) {
                        if (new_questions[i].type === 'checkbox') {
                            new_questions[i].refer = new_questions[i].refer.join('-<^-^>-');
                        }
                    }
                    break;
                case "3":
                    url = '/sm/save/qn_keep/history';
                    break;
                case "4":
                    url = '/sm/save/qn_keep/history';
                    break;
                case "5":
                    url = '/sm/save/qn_keep/history';
                    break;
            }
            let loadingIns;
            if (tag !== 'autosave') {
                loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
            }
            const userInfo = user.getters.getUser(user.state());
            var param = {
                username: userInfo.user.username,
                title: this.title,
                finished_time: this.timeFrame,
                description: this.description,
                type: this.type,
                qn_id: this.$route.query.pid,
                questions: new_questions,
                max_recycling: this.max_recycling,
            }

            var paramer = JSON.stringify(param, {questions: 'brackets'})
            this.$axios({
                method: 'post',
                url: url,
                data: paramer,
            })
                .then(res => {
                    if (tag !== 'autosave')
                        loadingIns.close();
                    switch (res.data.status_code) {
                        case 0:
                            this.$message.warning("登录信息失效，请重新登录！");
                            setTimeout(() => {
                                this.$store.dispatch('clear');
                                location.reload();
                            }, 500);
                            break;
                        case 1:
                            switch (tag) {
                                case 'save':
                                    this.$confirm('问卷信息保存成功，请选择继续编辑或返回个人问卷中心？', '提示信息', {
                                        distinguishCancelAndClose: true,
                                        confirmButtonText: '返回问卷中心',
                                        cancelButtonText: '继续编辑'
                                    })
                                    .then(() => {
                                        this.$router.push('/index');
                                    })
                                        .catch(action => {
                                            console.log(action);
                                        })
                                    break;
                                case 'preview':
                                    this.$message.success("保存成功");
                                    setTimeout(() => {
                                        location.href = this.GLOBAL.previewUrl[parseInt(surveyType)-1] + '?mode=0&pid=' + this.$route.query.pid;
                                    }, 700);
                                    break;
                                case 'publish':
                                    this.$message.success("保存成功");
                                    break;
                                case 'autosave':
                                    this.$notify({
                                        title: '保存成功',
                                        message: '每隔1分钟将自动为您保存编辑信息',
                                        type: 'success',
                                        duration: 2500
                                    });
                                    break;
                            }
                            break;
                        default:
                            this.$message.error("保存失败！");
                            break;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        ahead(qid){
            if(qid===0) return true;
            for(let i=0;i<this.questions.length;i++){
                if(this.questions[i].id===qid){
                    if(this.questions[i].is_shown===true) return this.ahead(this.questions[i].last_question);
                    else return false;
                }
            }
            return false;
        },
    }
}