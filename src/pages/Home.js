import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const cred = {
    "companyName": "Train Central",
    "clientID": "df9d6e32-ddf7-4ac5-96f5-13400e5c26aa",
    "clientSecret": "vzLXqzRrrUIYvaIu",
    "ownerName": "Sai Charan",
    "ownerEmail": "204G1A0584@srit.ac.in",
    "rollNo":"204G1A0584"
}


function Home() {

	const [trainData, setTrainData] = useState([]);

	useEffect(() => {
		fetch("http://20.244.56.144/train/auth",{
		method: "POST",
		body: JSON.stringify(cred)
		})
		.then(res => res.json())
		.then(data => {
			let access = data['access_token']
			console.log(access)
			let head = "Bearer"

			fetch(`http://20.244.56.144/train/trains`,{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${access}`
				}
			}).then(res =>res.json())
			.then(data => {
				console.log(data)
				setTrainData(data)
			})
		})

	}, [])

	return <div className="container-md">
		<h1> Train Central dashboard </h1>
		{trainData.map(item => <TrainInfoBox trainData={item} />) }

		</div>;
}

function TrainInfoBox({ trainData }) {
	const navigate = useNavigate()

	const handleClick = (e) => {
		console.log(e.target)
		navigate(`/train/trains/${e.target.value}`)
	}


  return (
    <div className="card mt-4 border-0 shadow-lg">
      <div className="card-body">
        <h5 className="card-title">Train Information</h5>
        <p className="card-text">
          <strong>Train Name:</strong> {trainData.trainName}<br />
          <strong>Train Number:</strong> {trainData.trainNumber}<br />
          <strong>Departure Time:</strong> {trainData.departureTime.Hours}:{trainData.departureTime.Minutes}:{trainData.departureTime.Seconds}<br />
          <strong>Seats Available:</strong> Sleeper: {trainData.seatsAvailable.sleeper}, AC: {trainData.seatsAvailable.AC}<br />
          <strong>Price:</strong> Sleeper: ${trainData.price.sleeper}, AC: ${trainData.price.AC}<br />
          <strong>Delayed By:</strong> {trainData.delayedBy} minutes
        </p>
        <button value={trainData.trainNumber} onClick={handleClick} className="btn btn-primary">Book Now</button>
      </div>
    </div>
  );
}



export default Home