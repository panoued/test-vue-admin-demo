
import * as Pont from 'pont-engine';
import { CodeGenerator, Interface, Mod } from "pont-engine";

function splitPath(path: string) {
    const names = path.split('/').filter(s => /^\{\D+\}$/.test(s));
    const ids = names.map(s => s.replace(/\{|\}/g, ''))
    const types = ids.map(s => s + ': string | number, ');
    return { names, ids, types };
};

export class FileStructures extends Pont.FileStructures {

}

export default class MyGenerator extends CodeGenerator {

    getInterfaceContent(inter: Interface) { /* 获取接口实现内容的代码 */
        const { names, ids, types } = splitPath(inter.path);
        const paramsCode = inter.getParamsCode();
        const bodyParamsCode = inter.getBodyParamsCode();
        const requestParams = bodyParamsCode ? `bodyParams: any = {}` : `params: any = {}`;
        const replaces = [`let url = '${inter.path}';`];
        names.forEach((name, i) => {
            replaces.push(`url = url.replace('${name}', String(${ids[i]}));`);
        });
        return `
/**
 * @description ${inter.description}
 */

import Request from '@/service/Request';
import * as defs from '../../baseClass';

export ${paramsCode};

export const result = ${inter.response.initialValue};

export async function request(${types.join('')}${requestParams}, autoLog: any = undefined, file: any = undefined) {
    ${replaces.join('\n')}
    return Request.send({
        url,
        ${bodyParamsCode ? 'params: bodyParams' : 'params'},
        method: '${inter.method}',
    }, autoLog, file);
};

export const URL = '${inter.path}';
        `;
    };

    getInterfaceContentInDeclaration(inter: Interface) { /* 获取接口内容的类型定义代码 */
        const bodyParams = inter.getBodyParamsCode();
        const requestParams = bodyParams ? `bodyParams?: ${bodyParams}` : `params?: Params`;
        const { types } = splitPath(inter.path);
        return `
          export ${inter.getParamsCode()}
    
          export type Response = ${inter.responseType};
          export const init: Response;
          export function request(${types.join('')}${requestParams},autoLog?: AutoLog, file?: FormData): Promise<${inter.responseType}>;
          export const URL: '${inter.path}';
        `;
    };

    /** 获取单个模块的 index 入口文件 */
    // getModIndex(mod: Mod) {
    //     const inters = Array.from(new Set(mod.interfaces.map(inter => inter.name)))
    //     return `
    //     /**
    //      * @description ${mod.description}
    //      */
    //     ${inters.map(inter => {
    //         return `import * as ${inter} from './${inter}';`;
    //     }).join('\n')}

    //     export {
    //         ${inters.join(', \n')}
    //     }
    //     `;
    // };

    /** 获取所有模块的 index 入口文件 */
    // getModsIndex() {
    //     const mods = Array.from(new Set(this.dataSource.mods.map(mod => mod.name)));
    //     let conclusion = `
    //     export {
    //         ${mods.join(', \n')}
    //     };
    //     `;

    //     return `
    //     ${mods
    //             .map(mod => {
    //                 return `import * as ${mod} from './${mod}';`;
    //             })
    //             .join('\n')}

    //     ${conclusion}
    //     `;
    // };

    /** 获取接口类和基类的总的 index 入口文件代码 */
    // getIndex() {
    //     const res = `
    //     import * as APIT from './baseClass';
    //     import * as APIS from './mods';
    //     export const acs = (APIT as any) as typeof defs;
    //     export const api = (APIS as any) as typeof API;
    //     `;
    //     return res;
    // };

}
