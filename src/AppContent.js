import React, { useState } from 'react';
import { Route, NavLink, useHistory } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';

import PageViews from './PageViews';
import FileLoader from './FileLoader';

import { config } from './configs/config';

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
            key: 'pane_' + i,
            menuItem: {
                as: NavLink,
                id: tab.id,
                content: tab.content,
                to: tab.path,
                exact: true,
                key: `menu_item_${ i }`
            },
            pane: (
                <Route key={ `route_${i}` }
                       path={ tab.path }                                         
                       render={() => (
                            <Tab.Pane key={ `tab_pane_${i}` }>
                                <PageViews key={ `page_view_${i}` } index={ i }/>
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
    const [ showFileLoader, setShowFileLoader ] = useState(true);
    let history = useHistory();
    
    // Handle tab changes.
    const handleTabChange = (e, data) => {
        setTabIndex(data.activeIndex);
    }; 

    // Handle file loaded, force first tab to display.
    const onFileLoaded = (file) => {
        
        props.dispatch({ type: 'PROCESS_WEB_SERVER_LOG', data: file });
        history.push(config.default_page);
        setShowFileLoader(false);
    };    

    return (<div> 
                <FileLoader open={ showFileLoader }
                    default={ config.file_loader.default }
                    image={ config.file_loader.image }
                    handleFile={ onFileLoaded } 
                    accept={ config.file_loader.accept }
                    placeHolder={ config.file_loader.placeHolder }
                    title={ config.file_loader.title }
                    content={ config.file_loader.content } />
                <Tab key={ `tab_${tabIndex}` }
                     menu={ { tabular: true, 
                              className: 'topmenu' } }                             
                     renderActiveOnly={ false }    
                     activeIndex={ tabIndex }  
                     onTabChange={ handleTabChange }                       
                     panes={ defineTabs(props.pages) } /> 
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

export default connect(mapStateToProps)(AppContent);