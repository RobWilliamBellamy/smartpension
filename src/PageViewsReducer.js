import { initial_state } from './configs/store.js';
import { config } from './configs/config.js';

// PageViewsReducer, react to actions and modify state.
const pageViewsReducer = (state = initial_state , action) => {

    let new_state = { ...state };
    switch (action.type) {
        case 'PROCESS_WEB_SERVER_LOG':             
            return processWebServerLog(new_state, action.data);
        case 'SORT_BY_VIEWS':            
            return sortByViewCount(new_state, action.data);  
        default:
            return state;
    }
};

// Process the web server log.
const processWebServerLog = (new_state, data) => {
        
    // Parse the log file to seperate rows and columns.
    const record_rows = data.split('\n');
    const temp_data = [];
    const temp_users = [];

    record_rows.forEach((rr, i) => {
        
        // Record web log as JSON.
        if (rr && rr.length > 0) {
            
            const record_set = rr.split(' ');
            const page = record_set[0];
            const ip_address = record_set[1];

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

    // Short-hand references.
    const page_views = new_state[0];
    const unique_views = new_state[1];

    // Populate page view and unique view data.
    Object.keys(temp_data).forEach((d) => {
        page_views.key_values[d] = temp_data[d].views;
        unique_views.key_values[d] = temp_data[d].unique.length;        
    });
    
    // Perform initial data sort.
    page_views.key_values = sortViewData(page_views.key_values, page_views.sort_desc);
    unique_views.key_values = sortViewData(unique_views.key_values, page_views.sort_desc);
    
    // Calculate view totals.
    page_views.views_total = calculateTotalViews(page_views.key_values);    
    unique_views.views_total = calculateTotalViews(unique_views.key_values);

    // Add stats.
    page_views.stats.page_views.val = page_views.views_total;
    page_views.stats.total_pages.val = Object.keys(temp_data).length;                          
    unique_views.stats.unique_views.val = unique_views.views_total;
    unique_views.stats.unique_users.val = temp_users.length;

    return new_state;
};

// Update unique page view count.
const updateUniqueCount = (unique, ip_address) => {
    
    if (unique.indexOf(ip_address) === -1) unique.push(ip_address);    
    return unique;
};

// Sort view data.
const sortViewData = (data, desc) => {

    let tuples = [];
    for (var key in data) tuples.push([key, data[key]]);

    tuples.sort((a, b) => {
        a = a[1];
        b = b[1];
        return a < b ? -1 : (a > b ? 1 : 0);
    });

    // Reverse order if necessary.
    if (desc) {
        tuples.reverse();
    }

    let sorted_data = [];
    for (var i = 0; i < tuples.length; i++) {    
        sorted_data[tuples[i][0]] = tuples[i][1];
    }

    return sorted_data;
};

// Calculate the views total.
const calculateTotalViews = (data) => {

    return Object.values(data).reduce((total, num) => {
        return total + num;
    }, 0);
};

// Update sort by view count.
const sortByViewCount = (new_state, index) => {
    
    let page = new_state[index];
    let sort_desc = !page.sort_desc;

    page.sort_desc = sort_desc;
    page.key_values = sortViewData(page.key_values, sort_desc);
    
    return new_state;
};

export {
    pageViewsReducer, 
    processWebServerLog,  
};