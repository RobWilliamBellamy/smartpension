import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Header, Image } from 'semantic-ui-react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import FileLoader from './FileLoader';
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
    const [ showFileLoader, setShowFileLoader ] = useState(true);

    let history = useHistory();

    // Handle file loaded, force first tab to display.
    const onFileLoaded = (file) => {
        
        store.dispatch({ type: 'PROCESS_WEB_SERVER_LOG', data: file });
        history.push(config.default_page);
        setShowFileLoader(false);
    };
    
    return (<Segment>            
                <Segment>
                    <FileLoader open={ showFileLoader }
                                default={ config.file_loader.default }
                                image={ config.file_loader.image }
                                handleFile={ onFileLoaded } 
                                accept={ config.file_loader.accept }
                                placeHolder={ config.file_loader.placeHolder }
                                title={ config.file_loader.title }
                                content={ config.file_loader.content } />
                    <Header>
                        <Image src={ config.logo } size='large' floated='left'/>
                        Smart Pension                   
                        <Header.Subheader><b>Title:</b> FE Engineer Test</Header.Subheader>
                        <Header.Subheader><b>Author:</b> R.Bellamy</Header.Subheader>
                    </Header>
                </Segment>
                <Provider store={ store }>    
                    <AppContent />
                </Provider>
            </Segment>);
}

export default App;