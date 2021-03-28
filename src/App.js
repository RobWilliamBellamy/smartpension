import { BrowserRouter, Switch } from 'react-router-dom';
import { Segment, Header, Image } from 'semantic-ui-react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppContent from './AppContent';
import { pageViewsReducer }  from './PageViewsReducer';

import { config } from './configs/config';

import './css/App.css';
import 'semantic-ui-css/semantic.min.css';

/**
 * App
 * @returns app
 */
const App = () => {
    
    // Create Redux store.
    const store = createStore(pageViewsReducer);    
    
    return (<Segment>            
                <Segment>
                    <Header>
                        <Image src={ config.logo } size='large' floated='left'/>
                        Smart Pension                   
                        <Header.Subheader><b>Title:</b> FE Engineer Test</Header.Subheader>
                        <Header.Subheader><b>Author:</b> R.Bellamy</Header.Subheader>
                    </Header>
                </Segment>
                <Provider store={ store }>  
                    <BrowserRouter>
                        <Switch>  
                            <AppContent />
                        </Switch>
                    </BrowserRouter> 
                </Provider>
            </Segment>);
}

export default App;