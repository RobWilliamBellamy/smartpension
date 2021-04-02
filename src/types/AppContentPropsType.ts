import { PageType } from './PageType';
import { PageViewsReducerActionType } from './PageViewsReducerActionType';

export type AppContentPropsType = {
    pages: Array<PageType>,     
    dispatch: (event:PageViewsReducerActionType) => void
};