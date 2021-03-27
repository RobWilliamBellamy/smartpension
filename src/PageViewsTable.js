import { Table } from 'semantic-ui-react';

/**
 * PageViewsTable
 * @param {*} props 
 * @returns table
 */
const PageViewsTable = (props) => {
    
    return (
        <Table sortable celled striped key={ `table_${ props.name }` }>
            <Table.Header>
                <Table.Row>
                    { renderTableHeaders(props.name, props.cols) }
                </Table.Row>
            </Table.Header>
        <Table.Body>
            { renderTableRows(props.name, props.data) }            
        </Table.Body>
        <Table.Footer>
        <Table.Row>
            { renderFooter(props.name, props.footer) }
        </Table.Row>
        </Table.Footer>
    </Table>);
};

/**
 * renderTableHeaders
 * @param {*} name 
 * @param {*} cols 
 * @returns table headers
 */
const renderTableHeaders = (name, cols) => {

    let headers = [];
    for (const col of cols) {

        if (col.sort) {
                        
            headers.push(  
                <Table.HeaderCell
                    key={ `header_${name}_${col.text}` }
                    sorted={ (col.desc) ? 'descending' : 'ascending' }
                    onClick={() => col.sort() } >
                    { col.text }
                </Table.HeaderCell>
            );
        } 
        else {
            headers.push(<Table.HeaderCell>{ col.text }</Table.HeaderCell>);
        }
    }

    return headers;
};

/**
 * renderTableRows
 * @param {*} name 
 * @param {*} data 
 * @returns table rows
 */
const renderTableRows = (name, data) => {
    
    let content = [];
    for (const i in data[0]) { 
                
        content.push(
            <Table.Row key={ `row_${name}_${i}` }>{ 
                renderTableCols(name, data, i) }</Table.Row>
        );
    }

    return content;
};

/**
 * renderTableCols
 * @param {*} name 
 * @param {*} data 
 * @param {*} row 
 * @returns table columns
 */
const renderTableCols = (name, data, row) => {

    let content = [];
    for (const col in data) { 
                
        content.push(            
            <Table.Cell key={ `col_${name}_${col}` }>
                { data[col][row] }</Table.Cell>
        );
    }

    return content;
};

/**
 * renderFooter
 * @param {*} name 
 * @param {*} cols 
 * @returns table footer
 */
const renderFooter = (name, cols) => {
    
    let footer = [];
    for (const i in cols) { 
        
        footer.push(            
            <Table.HeaderCell key={ `footer_${name}_${i}` }>
                { cols[i] }</Table.HeaderCell>
        );
    }

    return footer;
};

export default PageViewsTable;