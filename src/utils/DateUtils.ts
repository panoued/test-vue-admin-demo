export class DateUtils {

    static fullnum(s: string | number) {
        const c = Number(s);
        return c < 10 ? '0' + s : '' + s;
    };

    static getDay(d: Date) {
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        return days[d.getDay()];
    };

    static formatTime(date: Date | string | number, format: string = 'YYYY-MM-DD') {
        const fn = DateUtils.fullnum;
        const d = new Date(date);
        const years = fn(d.getFullYear()),
            months = fn(d.getMonth() + 1),
            dates = fn(d.getDate()),
            hours = fn(d.getHours()),
            minutes = fn(d.getMinutes()),
            seconds = fn(d.getSeconds());
        return format.replace('YYYY', years).replace('MM', months).replace('DD', dates)
            .replace('hh', hours).replace('mm', minutes).replace('ss', seconds);
    };

    static storeDayTime(dt: string) {
        dt = dt || '';
        const ar = dt.split('-').map(s => s.split(':').slice(0, 2).join(':'));
        return ar.join(' - ');
    };

}