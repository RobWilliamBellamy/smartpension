export const initial_state = [
    {
        tab: {
            id: 'page_views',
            path: '/pageviews',
            content: 'Page Views',
            sub_title: `Displays page views, change sort order by 
                clicking on the column header`
        },
        stats: {
            page_views: { label: 'Total Page Views', icon: 'eye', val: 0 },
            total_pages: { label: 'Total Pages', icon: 'sitemap', val: 0 }
        },
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
        stats: {
            unique_views: { label: 'Total Unique Views', icon: 'eye', val: 0 },
            unique_users: { label: 'Total Unique Users', icon: 'user', val: 0 }
        },
        sort_desc: true,             
        key_values: [],
        views_total: 0
    }
];