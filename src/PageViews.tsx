import { Icon, Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import PageViewsTable from './PageViewsTable';
import PageViewsChart from './PageViewsChart';
import PageViewsStatistics from './PageViewsStatistics';

import { PageType } from './types/PageType';
import { PageViewsPropType } from './types/PageViewsPropsType';

import './css/WebPageViews.css';

/**
 * PageViews.
 * Consists of a table to view web log data with a pie chart and list of 
 * various statistics below.
 * @returns view
 */
const PageViews = (props:PageViewsPropType) => {
    
    const page = props.pages[parseInt(props.index)];
    return (<div>  
                <h1><Icon name='file outline' />{ page.tab.content }</h1>
                <p>{ page.tab.sub_title }</p>
                 
                <PageViewsTable name={ page.tab.id }
                                cols={[ { text: 'Page' },
                                        { text: 'Views', 
                                          desc: page.sort_desc, 
                                          sort: () => props.dispatch({ 
                                                  type: 'SORT_BY_VIEWS', 
                                                  data: props.index }) }]}  
                                data={[ Object.keys(page.key_values),
                                        Object.values(page.key_values) ]} 
                                footer={[ 'Total:', page.views_total ]} />

                <Segment>
                    <Grid columns={3}>
                        <Grid.Row>                                            
                            <Grid.Column width={4}>
                                <PageViewsChart name={ page.tab.id } 
												data={ page.key_values } />
                            </Grid.Column>  
                            <Grid.Column width={2}></Grid.Column>                                      
                            <Grid.Column width={10} verticalAlign='middle'>
                            	<PageViewsStatistics name={ page.tab.id } 
													 data={ page.stats } />                                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> 
                </Segment>               
            </div>);
};

/**
 * mapStateToProps
 * @param {*} state 
 * @returns 
 */
const mapStateToProps = (state:Array<PageType>) => ({
    pages: state
});

export default connect(mapStateToProps)(PageViews);