import { SemanticICONS } from 'semantic-ui-react';

export type KeyValues = {
    [id:string]:string|number
};

export type PageType = {
    tab:TabType,
    stats: Array<StatType>,
    sort_desc: boolean,
    key_values: KeyValues, 
    views_total: number
};

export type TabType = {
    id:string,
    path:string,
    content:string,
    sub_title:string
};

export type StatType = {    
    label:string,
    icon:SemanticICONS,
    val:number
};