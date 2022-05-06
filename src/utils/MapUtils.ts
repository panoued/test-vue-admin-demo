import { VuexUtils } from "./VuexUtils";

export class MapUtils {

    static setKey(mapKey: string) {
        mapKey = mapKey || '';
        VuexUtils.setMapKey(mapKey);
        localStorage.setItem('mapKey', mapKey);
    };

    static getKey() {
        return VuexUtils.getMapKey() || localStorage.getItem('mapKey') || '';
    };

}