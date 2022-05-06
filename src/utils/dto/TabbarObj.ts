export class TabbarObj {
    icon: string;
    name: string;
    flag: number | string;
    prefix = 'yr-icon';
    dot?: boolean = false;
    badge?: string = undefined;
    to?: any = undefined;
    replace?: boolean = false;
    other?: string;
    constructor(icon: string, name: string, flag: string | number) {
        this.icon = icon;
        this.name = name;
        this.flag = flag;
    };
    set(obj: { [P in keyof TabbarObj]?: TabbarObj[P] }) {
        for (const key in obj) {
            this[key] = obj[key];
        };
        return this;
    };
}