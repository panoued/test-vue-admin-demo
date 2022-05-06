type AppConfig = {
    apiBasicUrl: string;
    requestPayload: boolean,
    useVerificationCode: boolean,
    useBatteryCount: boolean,
    controlOrderByBatteryCount: boolean
};

type ApiMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

type ApiParams = {
    url: string;
    params: any;
    method: string;
};

type LangId = 'zh-HK' | 'zh-CN';

type VuexState = {
    config: AppConfig;
    token: string;
    lang: LangId;
    langMap: { [key: string]: string },
    mapKey: string
};

type InputType = 'text' | 'number' | 'email' | 'tel' | 'url' | 'textarea' | 'select' | 'password';

type AutoLog = { success?: boolean; fail?: boolean; loading?: boolean };
