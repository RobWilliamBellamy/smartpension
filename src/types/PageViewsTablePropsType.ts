export type PageViewsTablePropsType = {
    name:string,
    cols:Array<PageViewsTableColType>,
    data:Array<any[]>,
    footer:Array<any>,
};

export type PageViewsTableColType = {
    text:string,
    desc?:boolean,
    sort?: ()=> void
};