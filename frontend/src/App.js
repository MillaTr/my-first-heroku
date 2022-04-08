import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    console.log("in effect");
    async function getLocations() {
      const locationsA = await axios.get("/locations"); //http://localhost:8080
      console.log(locationsA);
      setLocations(locationsA.data);
    }
    getLocations();
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default App;
/*
class App extends React.Component {
  state = { locations: [] };

  async componentDidMount() {
    /**
    let hr = await axios.get("http://localhost:8080/locations"); //fetch("http://localhost:8080/locations");
    let json = await hr.json();
    this.setState({ locations: json });
     
    let res = await axios.get("http://localhost:8080/locations"); //fetch("http://localhost:8080/locations");
    let { data } = await res.data;
    this.setState({ locations: data });
  }
  render() {
    let markers = this.state.locations.map((loc) => (
      <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      // <li key={loc.id}>
      //   {loc.id} - {loc.latitude} - {loc.longitude}
      // </li>
      /**
       <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
       
    ));

    return (
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <span>{markers}</span>
      </MapContainer>
    );
  }
}
export default App;

/*
class App extends React.Component {
  state = { locations: [] };
  async componentDidMount() {
    let hr = await fetch("http://localhost:8080/locations");
    let json = await hr.json();
    this.setState({ locations: json });
  }
  render() {
    if (this.state.locations.length === 0) {
      return <p>loading...</p>;
    } else {
      let ui = this.state.locations.map((loc) => (
        <li key={loc.id}>
          {loc.id} - {loc.latitude} - {loc.longitude}
        </li>
      ));
      return <ul>{ui}</ul>;
    }
  }
}
export default App;

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
