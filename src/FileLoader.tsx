import { useState } from 'react';
import { Modal, Image, Button, Form } from 'semantic-ui-react';

import { useFilePicker } from 'use-file-picker';

import { FileLoaderPropsType } from './types/FileLoaderPropsType';

/**
 * Load a file from the given path as a promise.
 * @param {*} path 
 * @returns 
 */
export const loadFile = (path:string) => {

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
const FileLoader = (props:FileLoaderPropsType) => {

    const [ open, setOpen ] = useState(props.open);
    const [ filesContent, errors, openFileSelector ] = useFilePicker({
        multiple: true, accept: props.accept
    });

    // Check for file load errors.
    if (errors.length > 0) {

        throw new Error(errors.toString());
    }

    // Load selected file.
    const loadSelected = () => {
        
        if (filesContent.length > 0) {
           
            props.handleFile(filesContent[0].content);
            setOpen(false);
        }        
    };

    // Load the default local file.
    const loadDefault = () => {
        
        loadFile(props.default)
        .then((file) => {
            
            props.handleFile(file as string);
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
            <Modal.Header>{ props.title }</Modal.Header>            
            <Modal.Content image>                                        
                <Image size='medium' src={ props.image } wrapped />
                <Modal.Description>                
                    <p>{ props.content }</p>
                    <Form>                          
                        <Form.Group>
                              <Form.Input label=''
                                          spellCheck={false}
                                          id="file"
                                          placeholder={ props.placeHolder }
                                          value={ (filesContent.length > 0) ? 
                                                filesContent[0].name : ''}
                                          width={16}
                              />
                         </Form.Group>
                        <Form.Button color='blue' onClick={() => openFileSelector() }>Select File</Form.Button>
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

export default FileLoader;