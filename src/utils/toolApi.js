export default {
    methods: {
        /**
         * 取出小括号内的内容
         * @param text
         * @returns {string}
         */
        getParenthesesStr(text) {
            var re = /\((.+?)\)/g;
            text = text.match(re)[0];
            text = text.substring(1,text.length-1);  //ddsdd
            return text;
        },
        /**
         * 取出小括号%内的内容 ... 1(100%) -> 100
         * @param text
         * @returns {string}
         */
        getStrClear(text) {
            var t = this.getParenthesesStr(text);
            return t.substr(0, t.length - 1);
        }
    }
}