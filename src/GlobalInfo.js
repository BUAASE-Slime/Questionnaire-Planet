
export default class GlobalInfo {
    //-------------------------------------域名服务器配置
    static baseUrl = 'http://localhost:8080';    //前端网址路径，若部署服务器，需做相应修改
    // static baseUrl = 'https://zewan.cc';    //前端网址路径，若部署服务器，需做相应修改
    static email = 'zewancc@126.com';               //编辑或管理员邮箱地址
    // static backUrl = 'https://zewan.cc/api/qs/';  //填写您部署的后端网址
    // static backUrl = 'http://localhost:8000/api/qs';
    static backUrl = 'http://localhost:8080/api/api/qs/';
    static domain = 'zewan.cc';                     //底边栏显示的域名
    static publicDomain = 'https://zewan.cc/';
    static publicBackUrl = 'https://zewan.cc/api/qs/';

    //-------------------------------------项目内部参数
    static previewUrl = [
        'preview',
        'preview_test',
        'preview_vote',
        'preview_form',
        'preview_hate'
    ]
}