import { Statistic, Grid, Segment, Table, Divider } from 'semantic-ui-react';

import { VictoryPie, VictoryTheme } from 'victory';

/**
 * renderTable.
 * @param {*} props
 * @returns table
 */
const renderTable = (props) => {
    
    return (
        <Table sortable celled striped key={ `table_${ props.name }` }>
            <Table.Header>
                <Table.Row>
                    { renderTableHeaders(props.name, props.cols) }
                </Table.Row>
            </Table.Header>
        <Table.Body>
            { renderTableRows(props.name, props.cols, props.data) }            
        </Table.Body>
        <Table.Footer>
        <Table.Row>
            { renderFooter(props.name, props.footer) }
        </Table.Row>
        </Table.Footer>
    </Table>);
};

/**
 * renderTableHeaders.
 * @param {*} cols 
 * @returns headers
 */
const renderTableHeaders = (name, cols) => {

    let headers = [];
    for (const col of cols) {

        if (col.sort) {
            headers.push(  
                <Table.HeaderCell
                    key={ `header_${name}_${col.text}` }
                    sorted={ (col.asc) ? 'ascending' : 'descending' }
                    onClick={() => col.sort() } 
                >
                    { col.text }</Table.HeaderCell>
            );
        } 
        else {
            headers.push(<Table.HeaderCell>{ col.text }</Table.HeaderCell>);
        }
    }

    return headers;
}

/**
 * renderTableContent.
 * @param {*} props 
 * @returns rows
 */
const renderTableRows = (name, cols, data) => {
    
    let content = [];
    for (const i in data) { 
              
        content.push(
            <Table.Row key={ `row_${name}_${i}` }>{ 
                renderTableCols(name, cols, data[i]) }</Table.Row>
        );
    }

    return content;
};

/**
 * renderTableCols.
 * @param {8} cols 
 * @param {*} row 
 * @returns cols
 */
const renderTableCols = (name, cols, data) => {

    let content = [];
    for (const i in cols) { 
        
        content.push(            
            <Table.Cell key={ `col_${name}_${i}` }>
                { data[cols[i].text] }</Table.Cell>
        );
    }

    return content;
}

/**
 * renderFooter.
 * @param {*} cols 
 * @returns 
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
}

/**
 * renderChart
 * @returns chart
 */
const renderChart = (props) => {

    return (<Segment>
                <Grid columns={2} centred>
                    <Grid.Row centred textAlign='center'>            
                        <Grid.Column width={4}>
                            <VictoryPie theme={ VictoryTheme.material }                  
                                        data={ props.data } /> 
                        </Grid.Column>
                        <Grid.Column width={12} verticalAlign='middle'>
                            <Statistic>
                                <Statistic.Value>{ props.total }</Statistic.Value>
                                <Statistic.Label>{ props.title }</Statistic.Label>
                            </Statistic>  
                        </Grid.Column>
                    </Grid.Row>
                </Grid> 
                <Divider vertical />
            </Segment>);  
}

export {
    renderTable,  
    renderChart
}