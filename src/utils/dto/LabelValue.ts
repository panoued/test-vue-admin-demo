export class LabelValue {
    label: string;
    value: any;
    constructor(label: string, value: any) {
        this.label = label;
        this.value = value;
    };
};

export class LabelValueOther extends LabelValue {
    other: any;
    constructor(label: string, value: any, other?: any) {
        super(label, value);
        this.other = other;
    };
};

export class LabelValueActive extends LabelValue {
    active: boolean;
    constructor(label: string, value: any, active?: boolean) {
        super(label, value);
        this.active = !!active;
    };
};