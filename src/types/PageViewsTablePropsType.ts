export type PageViewsTablePropsType = {
    name:string,
    cols:Array<PageViewsTableColType>,
    data:Array<Array<string|number>>,
    footer:Array<string|number>,
};

export type PageViewsTableColType = {
    text:string,
    desc?:boolean,
    sort?: () => void
};