import Layout from "../../components/Layout";

function SensorHistory() {

  const history = [
    {
      time: "08:00 AM",
      moisture: "60%",
      temperature: "26°C",
      humidity: "68%"
    },
    {
      time: "10:00 AM",
      moisture: "63%",
      temperature: "27°C",
      humidity: "70%"
    },
    {
      time: "12:00 PM",
      moisture: "65%",
      temperature: "28°C",
      humidity: "72%"
    },
    {
      time: "02:00 PM",
      moisture: "61%",
      temperature: "29°C",
      humidity: "74%"
    }
  ];

  return (
    <Layout>

      <div className="sensor-content">

        <h1>Sensor History 📊</h1>

        <p>
          Previous sensor readings
        </p>

        <div className="history-table">

          <table>

            <thead>
              <tr>
                <th>Time</th>
                <th>Soil Moisture</th>
                <th>Temperature</th>
                <th>Humidity</th>
              </tr>
            </thead>

            <tbody>

              {history.map((data, index) => (

                <tr key={index}>

                  <td>{data.time}</td>
                  <td>{data.moisture}</td>
                  <td>{data.temperature}</td>
                  <td>{data.humidity}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
}

export default SensorHistory;