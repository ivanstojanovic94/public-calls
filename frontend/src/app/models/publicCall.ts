import { DataConfig } from "./dataConfig";

export class PublicCall{
    id: number;
    name: string;
    publishDate: string;
    deadline: string;
    basicInfo: string;
    userGroup: string;
    scienceField: string;
    institution: string;
    applicationDataConfig: Array<DataConfig<any>>;


}