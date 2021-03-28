import { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Tab, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import PageViews from './PageViews';

import './css/App.css';
import 'semantic-ui-css/semantic.min.css';

/**
 * defineTabs
 * @param {*} pages
 * @returns tabs
 */
 const defineTabs = (pages) => {
        
    let panes = [];    
    for (const i in pages) {
        
        const page = pages[i];
        const tab = page.tab;
        panes.push({
            menuItem: {
                as: NavLink,
                id: tab.id,
                content: tab.content,
                to: tab.path,
                exact: true,
                key: page.id
            },
            pane: (
                <Route path={ tab.path }
                       key={ tab.id }
                       exact                   
                       render={() => (
                            <Tab.Pane>
                                <PageViews index={ i }/>
                            </Tab.Pane>
                       )}
                />)
        });
    };

    return panes;
};

/**
 * AppContent.
 * @returns app content
 */
 const AppContent = (props) => {

    const [ tabIndex, setTabIndex ] = useState(0);
    const handleTabChange = (e, data) => {
        setTabIndex(data.activeIndex);
    };

    return (<Segment> 
                <Tab key='menu' 
                    menu={ { tabular: true, 
                            className: 'topmenu' } }                             
                    renderActiveOnly={ false }    
                    activeIndex={ tabIndex }  
                    onTabChange={ handleTabChange }                       
                    panes={ defineTabs(props.pages) } />   
            </Segment>);
};

/**
 * mapStateToProps
 * @param {*} state 
 * @returns 
 */
 const mapStateToProps = state => ({
    pages: state
});

export default connect(mapStateToProps)(AppContent);