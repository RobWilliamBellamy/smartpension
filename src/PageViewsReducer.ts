import { PageType, KeyValues } from './types/PageType';
import { PageViewsReducerActionType } from './types/PageViewsReducerActionType';

import initial_state  from './configs/store';
import { config } from './configs/config';

// PageViewsReducer, react to actions and modify state.
const pageViewsReducer = (state:Array<PageType> = initial_state , action:PageViewsReducerActionType) => {

    let new_state = Object.assign({}, state);
    switch (action.type) {
        case 'PROCESS_WEB_SERVER_LOG':             
            return parseLog(new_state, action.data);
        case 'SORT_BY_VIEWS':            
            return sortByViewCount(new_state, action.data);  
        default:
            return state;
    }
};

// Process the web server log.
const parseLog = (new_state:Array<PageType>, data:string) => {

    // Temp dictionary type.
    interface IDictionary {
        [key:string]: {
            views:number,
            unique:Array<string>
        }
    };

    const temp_data:IDictionary = {};
    const temp_users:Array<string> = [];

    try {
        // Parse the log file to seperate rows and columns.    
        const record_rows = data.split('\n');
        record_rows.forEach((rr, i) => {
        
            // Record web log as JSON.
            if (rr && rr.length > 0) {            
                
                const record_set = rr.split(' ');
                const page = record_set[0] as string;
                const ip_address = record_set[1] as string;
    
                // Record overall page views and unique views.
                let existing_page = temp_data[page];  
                temp_data[page] = (existing_page) ?                 
                { 
                    views: ++existing_page.views, 
                    unique: updateUniqueCount(existing_page.unique, ip_address)
                } : 
                { 
                    views: 1, 
                    unique: [ip_address]
                }; 
    
                // Record overall unique users.
                if (temp_users.indexOf(ip_address) === -1) {
                    temp_users.push(ip_address);
                }
            }
        }); 
    }
    catch (err) {
        throw new Error(config.errors.file_parse_error);
    }      

    // Short-hand references.
    const page_views = new_state[0];
    const unique_views = new_state[1];

    // Populate page view and unique view data.
    Object.keys(temp_data).forEach((d) => {       
        page_views.key_values[d] = temp_data[d].views;
        unique_views.key_values[d] = temp_data[d].unique.length;        
    });
    
    // Perform initial data sort.
    page_views.key_values = sortData(page_views.key_values, page_views.sort_desc);
    unique_views.key_values = sortData(unique_views.key_values, page_views.sort_desc);
    
    // Calculate view totals.
    page_views.views_total = calculateTotalViews(page_views.key_values);    
    unique_views.views_total = calculateTotalViews(unique_views.key_values);

    // Add stats.
    page_views.stats[0].val = page_views.views_total;
    page_views.stats[1].val = Object.keys(temp_data).length;                          
    unique_views.stats[0].val = unique_views.views_total;
    unique_views.stats[1].val = temp_users.length;

    return new_state;
};

// Update unique page view count.
const updateUniqueCount = (unique:Array<string>, ip_address:string):Array<string> => {
    
    if (unique.indexOf(ip_address) === -1) unique.push(ip_address);    
    return unique;
};

// Sort view data.
const sortData = (data:KeyValues, desc:boolean):KeyValues => {
    
    let tuples:Array<{key:string, val:string|number}> = [];
    for (const key in data) tuples.push({key, val: data[key]});

    tuples.sort((a, b) => {
        let av = a.val;
        let bv = b.val;
        return av < bv ? -1 : (av > bv ? 1 : 0);
    });

    // Reverse order if necessary.
    if (desc) {
        tuples.reverse();
    }

    let sorted_data:KeyValues = {};
    for (var i = 0; i < tuples.length; i++) {    
        sorted_data[tuples[i].key] = tuples[i].val;
    }
        
    return sorted_data;
};

// Calculate the views total.
const calculateTotalViews = (data:KeyValues):number => {

    const vals:Array<number> = Object.values(data)
                                     .map((i => parseInt(i as string)));    
    return vals.reduce((total:number, num:number) => {
        return total + num;
    }, 0);    
};

// Update sort by view count.
const sortByViewCount = (new_state:Array<PageType>, index:number) => {
    
    let page = new_state[index];
    let sort_desc = !page.sort_desc;

    page.sort_desc = sort_desc;
    page.key_values = sortData(page.key_values, sort_desc);
    
    return new_state;
};

export {
    pageViewsReducer, 
    parseLog,
    sortData
};