import { Statistic } from 'semantic-ui-react';

/**
 * PageViewsStatistics
 * @param {*} props 
 * @returns statistics
 */
 const PageViewsStatistics = (props) => {

    return (<Statistic.Group>
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
    stats.forEach((stat, i) => {
        stat_entries.push(<Statistic key={ `stat_${i}`}>
                            <Statistic.Value>{ stat.val }</Statistic.Value>
                            <Statistic.Label>{ stat.label }</Statistic.Label>
                         </Statistic>);
    });

    return stat_entries;
};

export default PageViewsStatistics;