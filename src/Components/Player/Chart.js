import React, { useState, useEffect } from 'react'

//Chart JS
import { Bar } from 'react-chartjs-2';



function Chart(props) {

	const [ chartData, setChartData ] = useState({});

	let seasons = [];
	let goals = [];
	let assists = [];
	let games = [];
	Object.values(props).map(season => {

		if(season.league.name === "National Hockey League"){	
			seasons.push(season.season.replace(/(\d{4})/, ""))
			goals.push(season.stat.goals)
			assists.push(season.stat.assists);
			games.push(season.stat.games);
		}

	});

	seasons.forEach(season => season.replace(/(\d{4})/, "$1-"))
	
	console.log(Object.values(props));
	
	useEffect(() => {
		setChartData({
				labels: [...seasons],
				datasets: [
					{
						label: 'Goals',
						data: [...goals],
						backgroundColor: 'rgba(0, 255, 0, 0.6)'
					},
					{
						label: 'Assists',
						data: [...assists],
						backgroundColor: 'rgba(255, 0, 0, 0.6)'
					},
					{
						label: 'Games',
						data: [...games],
						backgroundColor: 'rgba(0,0, 255, 0.1'
					}
				]
			}
		)
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
							text: "Goals and Assists for NHL Career",
							fontSize: 25
						}
					}}
				/>
		</div>
	)
}

export default Chart
