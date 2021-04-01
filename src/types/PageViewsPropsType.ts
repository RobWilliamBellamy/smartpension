import { PageType } from './PageType';

export type PageViewsPropType = {
    index: string,
    pages: Array<PageType>,     
    dispatch: (event:any)=> void    
};