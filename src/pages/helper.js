const cred = {
    "companyName": "Train Central",
    "clientID": "df9d6e32-ddf7-4ac5-96f5-13400e5c26aa",
    "clientSecret": "vzLXqzRrrUIYvaIu",
    "ownerName": "Sai Charan",
    "ownerEmail": "204G1A0584@srit.ac.in",
    "rollNo":"204G1A0584"
}


export async function getToken() {
	const res = await fetch("20.244.56.144/train/auth",{
		method: "POST",
		body: JSON.stringify(cred)
	})

	return res.json();
}