
export default class GlobalInfo {
    //---------------------------------域名服务器配置--------------------------------//
    static baseUrl = 'http://localhost:8080';               //前端网址路径，若部署服务器，需做相应修改
    static backUrl = 'http://localhost:8080/api/api/qs/';   //后端网址路径，若部署服务器，需做相应修改
    static email = 'zewancc@126.com';                       //编辑或管理员邮箱地址
    static domain = 'qn.zewan.cc';                          //底边栏显示的域名
    static publicBackUrl = 'https://qn.zewan.cc/api/qs/';   //公开后端网址路径，主要用于获取用户IP地址

    //---------------------------------项目内部参数--------------------------------//
    static previewUrl = [
        'preview',
        'preview_test',
        'preview_vote',
        'preview_form',
        'preview_hate'
    ];
    static fillUrl = [
        'fill',
        'fill_test',
        'fill_vote',
        'fill_form',
        'fill_hate'
    ];
}