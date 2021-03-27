import { useState } from 'react';
import { Modal, Image, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { useFilePicker } from 'use-file-picker';

export const loadFile = (path) => {

    return new Promise((resolve, reject) => {
        
        fetch(path)
        .then(response => response.text())
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    });
};

/**
 * FileLoader
 * @param {*} props 
 * @returns 
 */
const FileLoader = (props) => {

    const [open, setOpen] = useState(true);
    const [filesContent, errors, openFileSelector, loading] = useFilePicker({
        multiple: true, accept: [".log"]
    });

    // Load selected file.
    const loadSelected = () => {
        
        if (filesContent.length > 0) {
            props.dispatch({ type: 'PROCESS_WEB_SERVER_LOG', data: filesContent[0].content }) 
            setOpen(false);
        }        
    };

    // Load the default local file.
    const loadDefault = () => {
        
        loadFile(props.default)
        .then((file) => {
            props.dispatch({ type: 'PROCESS_WEB_SERVER_LOG', data: file });
            setOpen(false);
        })
        .catch(err => {
            console.log('Error loading data', err);
        });
    };

    return (                  
        <Modal onClose={() => setOpen(false)}
               onOpen={() => setOpen(true)}
               open={ open }
               centered={ false } >
            <Modal.Header>Upload Web Log</Modal.Header>            
            <Modal.Content image>                                        
                <Image size='medium' src='/logo.png' wrapped />
                <Modal.Description>                
                    <p>Please select a web log file to upload or use the default
                        file from this project.
                    </p>
                    <Form>                          
                        <Form.Group>
                              <Form.Input label=''
                                          spellCheck={false}
                                          id="file"
                                          placeholder="File Path"
                                          value={ (filesContent.length > 0) ? 
                                                filesContent[0].name : ''}
                                          width={16}
                              />
                         </Form.Group>
                        <Form.Button onClick={() => openFileSelector() }>Select File</Form.Button>
                    </Form>                    
                </Modal.Description> 
            </Modal.Content>
            <Modal.Actions>
                <Button.Group>
                    <Button onClick={() => loadDefault() }>Use Default</Button>
                    <Button.Or/>
                    <Button onClick={() => { loadSelected() }} positive>
                        Load
                    </Button>
                </Button.Group>
            </Modal.Actions>
        </Modal>
    );
};

export default connect()(FileLoader);