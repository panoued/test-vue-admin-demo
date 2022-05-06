import { StandardDataSource, Mod } from 'pont-engine';

export default function (data: StandardDataSource): StandardDataSource {
    const firstToUpperCase = (str: string) => {
        str = str || '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const repName = (str: string) => {
        str = str || '';
        return str.replace(/-(\w)/g, (_a, b) => {
            return b.toUpperCase();
        });
    };
    const joinNames = (array: string[]) => {
        let arr = array.slice(0);
        arr.forEach((s, i) => {
            if (i == 0) {
                arr[i] = s.charAt(0).toLowerCase() + s.slice(1);
            } else {
                arr[i] = firstToUpperCase(s);
            };
            arr[i] = repName(arr[i]);
        });
        return arr.join('');
    };
    const getNamesArr = (path: string) => {
        return path.replace(/^\/(api\/)?/, '').replace(/\{.*\}/g, '').split('/');
    };
    const mods: Mod[] = [];
    data.mods.forEach(mod => {
        const names: string[] = [];
        mod.interfaces.forEach(int => {
            const arr = getNamesArr(int.path), api = repName(arr[0]) + 'Api';
            let name = joinNames(arr.slice(1));
            if (!name) {
                name = repName(int.method);
            };
            if (name == 'delete') {
                name = 'remove';
            };
            if (names.includes(name)) {
                name += firstToUpperCase(int.method);
            };
            if (names.includes(name)) {
                name = api.replace('Api', '') + firstToUpperCase(name);
            };
            names.push(name);
            int.name = name;
            const cmod = mods.find(m => m.name == api);
            if (cmod) {
                cmod.interfaces.push(int);
            } else {
                const nmod = new Mod({ name: api, description: mod.description, interfaces: [] });
                nmod.interfaces.push(int);
                mods.push(nmod);
            };
        });
    });
    const excludes = [
        'errorApi',
    ];
    data.mods = mods.filter(mod => { return !excludes.includes(mod.name) });
    return data;
}
