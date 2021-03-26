import React, { useEffect, useReducer, createContext } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Tab, Segment, Header, Image } from 'semantic-ui-react';

import { loadFile } from './FileLoader';
import { webStatsReducer }  from './WebStatsReducer';
import WebPageViews from './WebPageViews';
import WebPageUniqueViews from './WebPageUniqueViews';


import { config } from './configs/config';
import { initial_state } from './configs/store.js';

import './css/App.css';
import 'semantic-ui-css/semantic.min.css';

// Create context to share state.
export const WebStatsContext = createContext();

function App() {
    
    const [state, dispatch] = useReducer( webStatsReducer, initial_state );

    // Load the web server log file from disk.
    useEffect(() => {

        loadFile(config.web_server_log_file_path)
        .then((file) => {
            dispatch({ type: 'PROCESS_WEB_SERVER_LOG', data: file });
        })
        .catch(err => {
            console.log('Error loading data');
        });

    }, []);
    
    // Define tab panes.    
    const panes = [
    {
        menuItem: {
            as: NavLink,
            id: "pageviews",
            content: "Views",
            to: "/pageviews",
            exact: true,
            key: "pageviews"
        },
        pane: (
            <Route path="/pageviews"
                   key='pageviews'
                   exact                   
                   render={() => (
                        <Tab.Pane>
                            <WebPageViews />
                        </Tab.Pane>
                   )}
            />)
    },
    {
        menuItem: {
            as: NavLink,
            id: "unique",
            content: "Unique Page Views",
            to: "/uniquepageviews",
            exact: true,
            key: "uniquepageviews"
        },
        pane: (
            <Route path="/uniquepageviews"
                   key='uniquepageviews'
                   exact                   
                   render={() => (
                        <Tab.Pane>                        
                            <WebPageUniqueViews />
                        </Tab.Pane>
                    )}
            />)
    }];

    return (
        <Segment>
            <Segment>
                <Header>
                    <Image src='logo.png' size='large' floated='left'/>
                    Smart Pensions                   
                    <Header.Subheader><b>Title:</b> FE Engineer Test</Header.Subheader>
                    <Header.Subheader><b>Author:</b> R.Bellamy</Header.Subheader>
                </Header>
            </Segment>
            <WebStatsContext.Provider value={ [ state, dispatch ] }>
                <BrowserRouter>
                    <Switch>
                        <Tab key='menu' menu={ { tabular: true, className: 'topmenu' } }                             
                             renderActiveOnly={ false } panes={ panes } />                                  
                    </Switch>            
                </BrowserRouter>
            </WebStatsContext.Provider>
        </Segment>
    );
}

export default App;