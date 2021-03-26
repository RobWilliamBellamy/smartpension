// WebStats reducer, react to actions and modify state.
const webStatsReducer = (state, action) => {

    let new_state = Object.assign({}, state);    
    switch (action.type) {
        case 'PROCESS_WEB_SERVER_LOG':             
            return processWebServerLog(new_state, action.data);
        case 'SORT_BY_VIEW_COUNT':            
            return sortByViewCount(new_state);   
        case 'SORT_BY_UNIQUE_COUNT':            
            return sortByUniqueCount(new_state);
        default:
            return state;
    }
};

// Process the web server log.
const processWebServerLog = (new_state, data) => {
        
    // Parse the log file to seperate rows and columns.
    const record_rows = data.split('\n');
    record_rows.forEach((rr, i) => {
        
        // Record web log as JSON.
        if (rr && rr.length > 0) {
            
            const record_set = rr.split(' ');
            const page = record_set[0];
            const ip_address = record_set[1];
            new_state.web_server_log.push({ page, ip_address });

            // Record page views.
            let existing_page = new_state.page_views[page];  
            new_state.page_views[page] = (existing_page) ?                 
            { 
                views: ++existing_page.views, 
                unique: updateUniqueCount(existing_page.unique, ip_address)
            } : 
            { 
                views: 1, 
                unique: updateUniqueCount([], ip_address)
            }; 
        }
    });   

    // Sort page view records.    
    const page_views = new_state.page_views;
    const page_keys = Object.keys(page_views);    
    
    new_state.page_views_sorted_keys = page_keys.sort((a, b) => {               
        return (page_views[a].views > page_views[b].views) ? -1 : 1;        
    });

    // Determine unique page views.
    for (const page of Object.keys(page_views)) {

        const unique = new_state.page_views[page].unique;
        new_state.unique_views[page] = Object.keys(unique).length;        
    }

    const unique_views = new_state.unique_views;
    new_state.unique_views_sorted_keys = page_keys.sort((a, b) => {               
        
        const au = unique_views[a];
        const bu = unique_views[b];

        if (au > bu) { return -1 }
        else if (au < bu) { return 1 }
        else { 
            return (a > b) ? 1 : -1;
        }      
    });

    return new_state;
};

// Update unique page view count.
const updateUniqueCount = (current, ip) => {
    
    let existing_unique = current[ip];
    current[ip] = (existing_unique) ? 
        { views: ++existing_unique.views } : { views: 1 };
    
    return current;
};

// Update sort by view count order.
const sortByViewCount = (new_state) => {
        
    new_state.page_views_count_desc = !new_state.page_views_count_desc;  
    let keys = Object.values(new_state.page_views_sorted_keys).reverse();        
    new_state.page_views_sorted_keys = keys;    

    return new_state;
};

// Update sort by view count order.
const sortByUniqueCount = (new_state) => {
        
    new_state.unique_views_count_desc = !new_state.unique_views_count_desc;  
    let keys = Object.values(new_state.unique_views_sorted_keys).reverse();        
    new_state.unique_views_sorted_keys = keys;    

    return new_state;
};

export {
    webStatsReducer, 
    processWebServerLog,
    sortByViewCount,
    sortByUniqueCount,   
};