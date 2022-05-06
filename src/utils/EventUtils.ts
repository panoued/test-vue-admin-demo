export class EventUtils {

    private eventMap = new Map<string, { action: Function; timeout: number; }>();

    listen(key: string, action: Function, timeout: number = 300) {
        this.eventMap.set(key, { action, timeout });
    };

    trigger(key: string, ...params: any[]) {
        const item = this.eventMap.get(key);
        if (item) {
            if (typeof item.timeout == 'number') {
                setTimeout(() => {
                    item.action(...params);
                }, item.timeout);
            } else {
                item.action(...params);
            };
        };
    };

}