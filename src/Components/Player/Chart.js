import React, { useState, useEffect } from 'react'

//Chart JS
import { Line } from 'react-chartjs-2';



function Chart(props) {

	const [ chartData, setChartData ] = useState({});

	let seasons = []
	let goals = []
	let assists = []
	Object.values(props).map(season => {

		if(season.league.name === "National Hockey League"){	
			seasons.push(season.season.replace(/(\d{4})/, ""))
			goals.push(season.stat.goals)
			assists.push(season.stat.assists);
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
						backgroundColor: 'rgba(0, 255, 0, 0.8)'
					},
					{
						label: 'Assists',
						data: [...assists],
						backgroundColor: 'rgba(255, 0, 0, 0.8)'
					}
				]
			}
		)
	},[])

	

	return (
		<div>
				<Line 
					data={chartData}
					width={100}
					height={50}
					options={{}}
				/>
		</div>
	)
}

export default Chart
