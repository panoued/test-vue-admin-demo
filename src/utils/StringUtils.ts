export class StringUtils {

    static cutNumber(value: string, hasPoint = false, hasMinusSign = false) {
        let inputValue = value;
        if (hasPoint) {
            if (value.startsWith('.')) {
                value = '0' + value;
            };
            value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
            value = value.replace(/\.{2,}/g, ".");  //只保留第一个. 清除多余的
            value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');  //只能输入两个小数
            if (value.indexOf(".") < 0 && value != "") { //如果没有小数点，首位不能为0
                value = parseFloat(value).toString();
            };
        } else {
            value = value.replace(/[^\d]/g, ""); //清除“数字”以外的字符
        };
        if (hasMinusSign && inputValue && inputValue.charAt(0) === '-') { //允许输入"—"号,则保留"-"号
            value = '-' + value;
        }
        return value;
    };

    /**
    * 把字符串转成可被new RegExp的字符串
    * @param str string
    * @returns string
    */
    static regArg(str: string) {
        str = typeof str == 'string' ? str : '';
        const arr = ['(', '[', '{', '\\', '^', '$', '|', ')', '?', '*', '+', '.', ']', '}'];
        arr.forEach(s => { str = str.replace(s, '\\' + s) });
        return str;
    };

    /**
     * 按关键字分割字符串，并用指定的标签包裹关键字
     * @description word = 'abcdefgCDEh', keyword = 'cde', tagName = 'span', className='s'; return `ab<span class="s">cde</span>fg<span class="s">CDE</span>h`
     * @param word 需要被分割的字符串
     * @param keyword 关键字
     * @param tagName 装关键字的标签名
     * @param className 标签class
     * @returns html string
     */
    static splitByKeyword(word: string, keyword: string, tagName: string, className?: string | string[]) {
        const kw = typeof keyword == 'string' ? keyword.trim() : '',
            w = typeof word == 'string' ? word : '',
            cn = typeof className == 'string' ? className : Array.isArray(className) ? className.join(' ') : '';
        if (kw && w) {
            const reg = new RegExp(StringUtils.regArg(kw), 'gi');
            const ns = w.split(reg), ks = [];
            let sa = null;
            if (ns.length > 1) {
                while ((sa = reg.exec(w)) != null) {
                    ks.push(sa[0]);
                };
                let res = '';
                ns.forEach((n, i) => {
                    const k = ks[i] ? cn ? `<${tagName} class="${cn}">${ks[i]}</${tagName}>` : `<${tagName}>${ks[i]}</${tagName}>` : '';
                    res += (n + k);
                });
                return res;
            };
            return w;
        };
        return w;
    };

}