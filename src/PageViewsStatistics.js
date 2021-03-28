import { Statistic, Icon } from 'semantic-ui-react';

/**
 * PageViewsStatistics
 * @param {*} props 
 * @returns statistics
 */
 const PageViewsStatistics = (props) => {

    return (<Statistic.Group name={ `statistics_${props.name}` }
                             widths='two'
                             size='small'>
                { renderStatistics(props.data) }
            </Statistic.Group>);  
};

/**
 * renderStatistics
 * @param {*} stats 
 * @returns statistics
 */
const renderStatistics = (stats) => {

    const stat_entries = [];
    for (const key in stats) {
        
        const stat = stats[key];
        stat_entries.push(<Statistic key={ `stat_${stat.label}`} 
                                     floated='left'
                                     horizontal>
                            <Statistic.Value>
                                <Icon name={ stat.icon }/>
                                    &nbsp;{ stat.val }</Statistic.Value>
                            <Statistic.Label>{ stat.label }</Statistic.Label>
                         </Statistic>);
    };

    return stat_entries;
};

export default PageViewsStatistics;