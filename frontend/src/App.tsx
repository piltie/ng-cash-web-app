import { useEffect, useState } from "react";
import "./App.css";
import api from "./services/api";

function App() {
  const [data, setData] = useState(null);

  // testando proxy
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/test");

      const data = response.data;
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
