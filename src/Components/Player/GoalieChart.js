import React, { useState, useEffect } from 'react'

//Chart JS
import { Bar } from 'react-chartjs-2';



function Chart(props) {

	const [ chartData, setChartData ] = useState({});

	const { playerStats } = props;

	let seasons = [];
	let saves = [];
	let shotsAgainst = [];
	let shutouts = [];
	let games = [];

	
	Object.values(playerStats).map(season => {

		if(season.league.name === "National Hockey League"){	
			seasons.push(season.season.replace(/(\d{4})/, ""))
			saves.push(season.stat.saves)
			shotsAgainst.push(season.stat.shotsAgainst);
			shutouts.push(season.stat.shutouts)
			games.push(season.stat.games);
		}

	});

	seasons.forEach(season => season.replace(/(\d{4})/, "$1-"))

	useEffect(() => {
		setChartData({
				labels: [...seasons],
				datasets: [
					{
						label: 'saves',
						data: [...saves],
						backgroundColor: 'rgba(0, 255, 0, 0.6)'
					},
					{
						label: 'shotsAgainst',
						data: [...shotsAgainst],
						backgroundColor: 'rgba(255, 0, 0, 0.6)'
					},
					{
						label: 'Games',
						data: [...games],
						backgroundColor: 'rgba(0,0, 255, 0.1'
					}
				]
			})
	},[])


	return (
		<div>
				<Bar 
					data={chartData}
					width={100}
					height={50}
					options={{
						title:{
							display: true,
							text: "Saves, Shots Against, and Total games Average for NHL Career",
							fontSize: 25
						}
					}}
				/>
		</div>
	)
}

export default Chart
