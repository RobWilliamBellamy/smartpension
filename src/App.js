import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Tab, Segment, Header, Image } from 'semantic-ui-react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import FileLoader from './FileLoader';
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
const App = () => {
        
    // Create Redux store.
    const store = createStore(pageViewsReducer);

    // Handle file loaded.
    const onFileLoaded = (file) => {
        
        store.dispatch({ type: 'PROCESS_WEB_SERVER_LOG', data: file });
    }

    return (<Segment>            
                <Segment>
                    <Header>
                        <Image src='logo.png' size='large' floated='left'/>
                        Smart Pension                   
                        <Header.Subheader><b>Title:</b> FE Engineer Test</Header.Subheader>
                        <Header.Subheader><b>Author:</b> R.Bellamy</Header.Subheader>
                    </Header>
                </Segment>
                <Provider store={ store }>    
                    <FileLoader default={ config.web_server_log_file_path }
                                image={ '/logo.png' }
                                handleFile={ onFileLoaded } 
                                accept={ [".log"] }
                                placeHolder='Please select a web log file...'
                                title='Upload Web Log'
                                content='Please select a web log file to upload 
                                    or use the default file from this project.'
                     />                  
                    <BrowserRouter>
                        <Switch>
                            <Tab key='menu' 
                                menu={ { tabular: true, 
                                        className: 'topmenu' } }                             
                                renderActiveOnly={ false } 
                                panes={ defineTabs(store.getState()) } />                                  
                        </Switch>            
                    </BrowserRouter>
                </Provider>
            </Segment>);
};

export default App;