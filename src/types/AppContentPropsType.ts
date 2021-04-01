import { PageType } from './PageType';

export type AppContentPropsType = {
    pages: Array<PageType>,     
    dispatch: (event:any)=> void
};