import axios from 'axios';

import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react-router/node_modules/@types/react';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/request';

type ChartData = {
    labels: string[];
    series: number[];
}


const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {

        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then((responce) => {
                const data = responce.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);

                setChartData({ labels: myLabels, series: mySeries });
                console.log(responce.data);
            });
    })

    

    const options = {
        legend: {
            show: true
        }
    }



    return (
        <Chart
            options={{ ...options, series: chartData.series }}
            series={chartData.series}
            type="donut"
            height="240"



        />
    );
}

export default DonutChart;