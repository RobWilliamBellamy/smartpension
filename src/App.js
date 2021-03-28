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
const App = (props) => {
    
    // Create Redux store.
    const store = createStore(pageViewsReducer);    
    const [ showFileLoader, setShowFileLoader ] = useState(true);

    let history = useHistory();

    // Handle file loaded, force first tab to display.
    const onFileLoaded = (file) => {
        
        store.dispatch({ type: 'PROCESS_WEB_SERVER_LOG', data: file });
        history.push('/pageviews');
        setShowFileLoader(false);
    };
    
    return (<Segment>            
                <Segment>
                    <FileLoader open={ showFileLoader }
                                default={ config.web_server_log_file_path }
                                image={ '/logo.png' }
                                handleFile={ onFileLoaded } 
                                accept={ [".log"] }
                                placeHolder='Please select a web log file...'
                                title='Upload Web Log'
                                content='Please select a web log file to upload 
                                    or use the default file from this project.' />
                    <Header>
                        <Image src='logo.png' size='large' floated='left'/>
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