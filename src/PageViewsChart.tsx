import { VictoryPie, VictoryTheme } from 'victory';

import { PageViewsChartType } from './types/PageViewsChartType';

/**
 * PageViewsChart
 * @param {*} props 
 * @returns chart
 */
 const PageViewsChart = (props:PageViewsChartType) => {

    // Map page views data to chart data format.
    const chart_keys = Object.keys(props.data);
    const chart_data = Object.values(props.data).map((k, i) => {         
       return { x: i, y: k, label: chart_keys[i] };
    });

    return (<VictoryPie key={ `chart_${ props.name}` }
                        theme={ VictoryTheme.material }                  
                        data={ chart_data } />);  
}

export default PageViewsChart;