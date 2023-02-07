import Navbar from "@/components/Navbar";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
const Graph = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
        maintainAspectRatio: false
      };
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const dataSet = {
        labels,
        datasets: [
            {   labels: 'hi',
                data: data.map(row => row.count),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };
    return (<>
        <div className="">
            <Navbar />
            <div className="mx-auto w-1/2 h-5/6 mt-20">
                <Line options={options} className="mx-auto" width={500} height={500} data={dataSet} />
            </div>
        </div>
    </>);
}

export default Graph;