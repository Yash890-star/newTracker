import Navbar from "@/components/Navbar";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import moment from "moment";
const Graph = () => {
  const [datesData, setDatesData] = useState([])
  const [dates, setDates] = useState([])
  const [currentDate, setCurrentDate] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/getGraphData', {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: moment().format("DoMMMYYYY")
      })
    }).then(response => response.json()).then(
      data => {
        if (data.message != 0) {
          setDatesData(data)
        }
      }
    )
    fetch('http://localhost:5000/getAllDates', {
      credentials: "include"
    }).then(res => res.json()).then(data => setDates(data))
  }, [])

  console.log(datesData)

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


  let labels;
  if (datesData !== undefined) {
    labels = datesData.names
  }

  const dataSet = {
    labels,
    datasets: [
      {
        label: 'No. of Students',
        data: datesData.numbers,
        borderColor: '#14b8a6',
        backgroundColor: 'white',
      }
    ],
  };

  const selectHandler = async (event) => {
    fetch('http://localhost:5000/getGraphData', {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: event.target.value
      })
    }).then(response => response.json()).then(
      data => {
        if (data.message != 0) {
          setDatesData(data)
        }
      }
    )
  }

  return (<>
    <div className="h-screen bg-white">
      <Navbar />
      <div className="text-center">
        <select name="dates" id="dates" className=" px-4 py-2 rounded-lg mt-10" onChange={selectHandler}>
          <option>select</option>
          {dates ? dates.map((val, i) => {
            return (
              <option>{val}</option>
            )
          }) : <>Loading</>}
        </select>
      </div>
      <div className="mx-auto w-1/2 h-1/2 mt-20">
        <Line options={options} className="mx-auto" width={500} height={500} data={dataSet} />
      </div>
    </div>
  </>);
}

export default Graph;