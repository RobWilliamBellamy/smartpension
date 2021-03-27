export const initial_state = [
    {
        tab: {
            id: 'page_views',
            path: '/pageviews',
            content: 'Page Views',
            sub_title: `Displays page views, change sort order by 
                clicking on the column header`
        },
        stats: [],
        sort_desc: true,            
        key_values: [],
        views_total: 0
    },
    {
        tab: {
            id: 'unique_views',
            path: '/uniqueviews',
            content: 'Unique Views',
            sub_title: `Displays unique page views, change sort order by 
                clicking on the column header`            
        },
        stats: [],
        sort_desc: true,             
        key_values: [],
        views_total: 0
    }
];