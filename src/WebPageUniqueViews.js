import { useContext } from 'react';
import { Icon } from 'semantic-ui-react';

import { WebStatsContext } from './App';
import { renderChart, renderTable } from './WebStatsContentHelper';

import './css/WebPageUniqueViews.css';

/**
 * WebPageViews.
 * @returns view
 */
const WebPageUniqueViews = () => {

    // Use context to access state.
    const [ state, dispatch ] = useContext(WebStatsContext);    
    
    const data = state.unique_views_sorted_keys.map((k) => {
        return { Page: k, Views: state.unique_views[k] };
    });

    const chart_data = state.unique_views_sorted_keys.map((k, i) => {        
        return { x: i, y: state.unique_views[k], label: k };
    });        
        
    const total = Object.values(data).reduce((total, { Views }) => {
        return total + Views;
    }, 0);

    return (<div>  
                <h1><Icon name='file outline' />Unique Page Views</h1>
                <p>Displays unique page views, change sort order by clicking on the column header</p>
                { renderTable({ name: 'unique_views',
                                cols: [ { text: 'Page' },
                                        { text: 'Views', asc: state.unique_views_count_sort_desc, 
                                          sort: () => dispatch({ type: 'SORT_BY_UNIQUE_COUNT' }) }],                                 
                                footer: [ 'Total:', total ],
                                data: data }) }
                { renderChart({ title: 'Unique Page Views',
                                data: chart_data,
                                total: total }) }  
            </div>);
};

export default WebPageUniqueViews;