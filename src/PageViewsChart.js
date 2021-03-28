import { VictoryPie, VictoryTheme } from 'victory';

/**
 * PageViewsChart
 * @param {*} props 
 * @returns chart
 */
 const PageViewsChart = (props) => {

    // Map page views data to chart data format.
    const chart_data = Object.keys(props.data).map((k, i) => {   
       return { x: i, y: props.data[k], label: k };
    });

    return (<VictoryPie key={ `chart_${ props.name}` }
                        theme={ VictoryTheme.material }                  
                        data={ chart_data } />);  
}

export default PageViewsChart;