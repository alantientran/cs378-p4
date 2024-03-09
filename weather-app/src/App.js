import { useState } from "react";
import "./App.css";

const api = {
  key: "83d374be2452e1f5d1e2f2400baf0f42",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchRequest = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Hello World</h1>
        {/* {Search Box} */}
        <div>
          <input
            type="text"
            placeholder="Search for city"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchRequest}>Search</button>
        </div>
        {/* {Location} */}
        {/* {Temperature F/C} */}
        {/* {Condition} */}
      </div>
    </div>
  );
}

export default App;
