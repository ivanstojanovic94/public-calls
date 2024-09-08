export class DataConfig<T>{
    value: T | undefined;
    name: string;
    label: string;
    inputType: string;
    type: string;
    required: boolean;
    options: {key: string, value: string}[];
    


constructor( dataConfigParameter: {
    value?: T;
    name?: string;
    label?: string;
    inputType?: string;
    type?: string;
    required?: boolean;
    options?: {key: string, value: string}[];

}={}){
    this.value=dataConfigParameter.value;
    this.name=dataConfigParameter.name || '';
    this.label=dataConfigParameter.label || '';
    this.inputType=dataConfigParameter.inputType || '';
    this.type=dataConfigParameter.type || '';
    this.required= !!dataConfigParameter.required;
    this.options=dataConfigParameter.options || [];

}

}