import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Tab, Segment, Header, Image } from 'semantic-ui-react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { loadFile } from './FileLoader';
import { pageViewsReducer }  from './PageViewsReducer';
import PageViews from './PageViews';

import { config } from './configs/config';

import './css/App.css';
import 'semantic-ui-css/semantic.min.css';

/**
 * defineTabs
 * @param {*} state 
 * @returns tabs
 */
 const defineTabs = (state) => {
    
    let panes = [];    
    state.forEach((page, i) => {
        
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
    });

    return panes;
};

/**
 * App.
 * @returns app
 */
const App =() => {
        
    // Create Redux store.
    const store = createStore(pageViewsReducer);

    // Load the web server log file from disk.
    useEffect(() => {

        loadFile(config.web_server_log_file_path)
        .then((file) => {
            store.dispatch({ type: 'PROCESS_WEB_SERVER_LOG', data: file });
        })
        .catch(err => {
            console.log('Error loading data', err);
        });

    }, []);

    return (
        <Segment>
            <Segment>
                <Header>
                    <Image src='logo.png' size='large' floated='left'/>
                    Smart Pension                   
                    <Header.Subheader><b>Title:</b> FE Engineer Test</Header.Subheader>
                    <Header.Subheader><b>Author:</b> R.Bellamy</Header.Subheader>
                </Header>
            </Segment>
            <Provider store={ store }>
                <BrowserRouter>
                    <Switch>
                        <Tab key='menu' menu={ { tabular: true, className: 'topmenu' } }                             
                             renderActiveOnly={ false } panes={ defineTabs(store.getState()) } />                                  
                    </Switch>            
                </BrowserRouter>
            </Provider>
        </Segment>
    );
};

export default App;