import React, { useState, useEffect } from 'react'
import {chooseBackgroundColor} from '../../helper'

//Chart JS
import { Bar } from 'react-chartjs-2';



function Chart(props) {

	const [ chartData, setChartData ] = useState({});

	const { playerStats } = props;

	let seasons = [];
	let goals = [];
	let assists = [];
	let games = [];

	
	Object.values(playerStats).map(season => {

		if(season.league.name === "National Hockey League"){	
			seasons.push(season.season.replace(/(\d{4})/, ""))
			goals.push(season.stat.goals)
			assists.push(season.stat.assists);
			games.push(season.stat.games);
		}

	});

	seasons.forEach(season => season.replace(/(\d{4})/, "$1-"))

	useEffect(() => {
		setChartData({
				labels: [...seasons],
				datasets: [
					{
						label: 'Goals',
						data: [...goals],
						backgroundColor: chooseBackgroundColor()
					},
					{
						label: 'Assists',
						data: [...assists],
						backgroundColor: chooseBackgroundColor()
					},
					{
						label: 'Games',
						data: [...games],
						backgroundColor: chooseBackgroundColor()
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
							text: "Goals and Assists for NHL Career",
							fontSize: 25
						}
					}}
				/>
		</div>
	)
}

export default Chart
