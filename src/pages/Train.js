import { Routes, Route, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const cred = {
    "companyName": "Train Central",
    "clientID": "df9d6e32-ddf7-4ac5-96f5-13400e5c26aa",	
    "clientSecret": "vzLXqzRrrUIYvaIu",
    "ownerName": "Sai Charan",
    "ownerEmail": "204G1A0584@srit.ac.in",
    "rollNo":"204G1A0584"
}


function Train() {

	const { tid } = useParams();
	const [trainData, setTrainData] = useState({
    "trainName": "--",
    "trainNumber": "--",
    "departureTime": {
        "Hours": 0,
        "Minutes": 0,
        "Seconds": 0
    },
    "seatsAvailable": {
        "sleeper": 0,
        "AC": 0
    },
    "price": {
        "sleeper": 0,
        "AC": 0
    },
    "delayedBy":0
});

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

			fetch(`http://20.244.56.144/train/trains/${tid}`,{
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


	return  <div className="container mt-4">
      <h1>Train Information</h1>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Train Name</th>
            <td>{trainData.trainName}</td>
          </tr>
          <tr>
            <th>Train Number</th>
            <td>{trainData.trainNumber}</td>
          </tr>
          <tr>
            <th>Departure Time</th>
            <td>{trainData.departureTime.Hours}:{trainData.departureTime.Minutes}:{trainData.departureTime.Seconds}</td>
          </tr>
          <tr>
            <th>Seats Available</th>
            <td>
              <strong>Sleeper:</strong> {trainData.seatsAvailable.sleeper}<br />
              <strong>AC:</strong> {trainData.seatsAvailable.AC}
            </td>
          </tr>
          <tr>
            <th>Price</th>
            <td>
              <strong>Sleeper:</strong> ${trainData.price.sleeper}<br />
              <strong>AC:</strong> ${trainData.price.AC}
            </td>
          </tr>
          <tr>
            <th>Delayed By</th>
            <td>{trainData.delayedBy} minutes</td>
          </tr>
        </tbody>
      </table>
    </div>
}


export default Train