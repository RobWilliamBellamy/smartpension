import { PageType } from './PageType';
import { PageViewsReducerActionType } from './PageViewsReducerActionType';

export type PageViewsPropType = {
    index: string,
    pages: Array<PageType>,     
    dispatch: (event:PageViewsReducerActionType) => void    
};