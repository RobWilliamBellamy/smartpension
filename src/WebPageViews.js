import { useContext } from 'react';
import { Icon } from 'semantic-ui-react';

import { WebStatsContext } from './App';
import { renderTable } from './WebStatsContentHelper';

import './css/WebPageViews.css';

/**
 * WebPageViews.
 * @returns view
 */
const WebPageViews = () => {

    // Use context to access state.
    const [ state, dispatch ] = useContext(WebStatsContext);    
    
    const data = state.page_views_sorted_keys.map((k) => {
        return { Page: k, Views: state.page_views[k].views };
    });
        
    const total = Object.values(data).reduce((total, { Views }) => {
        return total + Views;
    }, 0);

    return (<div>  
                <h1><Icon name='file outline' />Page Views</h1>
                <p>Displays page views, change sort order by clicking on the column header</p>
                { renderTable({ name: 'page_views',
                                cols: [ { text: 'Page' },
                                        { text: 'Views', asc: state.page_views_count_desc, 
                                          sort: () => dispatch({ type: 'SORT_BY_VIEW_COUNT' })}],                                 
                                footer: [ 'Total:', total ],
                                data: data
                                }) }
            </div>);
};

export default WebPageViews;