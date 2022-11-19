import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  // testando proxy
/*  useEffect(() => {
    const fetchData = async () => {
      fetch("/api/test")
        .then((response) => response.json())
        .then((data) => setData(data.message));
    };

    fetchData();
  }, []);*/

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
