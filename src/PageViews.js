import { Icon, Segment, Grid, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';

import PageViewsTable from './PageViewsTable';
import PageViewsChart from './PageViewsChart';
import PageViewsStatistics from './PageViewsStatistics';

import './css/WebPageViews.css';

/**
 * PageViews.
 * @returns view
 */
const PageViews = (props) => {
    
    const page = props.pages[props.index];

    return (<div>  
                <h1><Icon name='file outline' />{ page.tab.content }</h1>
                <p>{ page.tab.sub_title }</p>
                 
                <PageViewsTable name={ page.tab.id }
                                cols={[ { text: 'Page' },
                                        { text: 'Views', 
                                          desc: page.sort_desc, 
                                          sort: () => props.dispatch({ type: 'SORT_BY_VIEWS', data: props.index }) }]}  
                                data={[ Object.keys(page.key_values),
                                        Object.values(page.key_values) ]} 
                                footer={[ 'Total:', page.views_total ]} />

                <Segment>
                        <Grid columns={2} centred>
                                <Grid.Row centred>                                            
                                        <Grid.Column width={4}>
                                                <PageViewsChart data={ page.key_values } />
                                        </Grid.Column>
                                        <Grid.Column width={12} verticalAlign='middle'>
                                                <PageViewsStatistics data={ page.stats } />
                                        </Grid.Column>
                                </Grid.Row>
                        </Grid> 
                        <Divider vertical />
                </Segment>               
            </div>);
};

/**
 * mapStateToProps
 * @param {*} state 
 * @returns 
 */
const mapStateToProps = state => ({
        pages: state
});

export default connect(mapStateToProps)(PageViews);