import React, { useState, useEffect } from "react";
import LoadingMask from "./components/LoadingMask";
import Hotel from "./components/Hotel";
import Subscription from "./components/Subscription";
import "./App.css";

const App = () => {

  const[isLoadingHotel, setIsLoadingHotel] = useState(false)
  const[hotels, setHotels] = useState([])
  const[formShown, setFormShown] = useState(false)

  useEffect(() => {
    setIsLoadingHotel(true)
    fetch("api/hotels")
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => setHotels(null))
      .finally(() => setIsLoadingHotel(false))
  }, [])

  useEffect(() => {
    setTimeout(() => setFormShown(true), 10000)
  }, [])

  return (
    <div className="App">
      {
        isLoadingHotel && <LoadingMask />
      }
      {
        hotels ?
        hotels.map(hotels => <Hotel key={hotels.name} name={hotels.name} city={hotels.city} stars={hotels.stars}/>) : 
        <p>Error</p>
      }
      {
        formShown && <Subscription close={() => setFormShown(false)}/>
      }
    </div>
  )
};

export default App