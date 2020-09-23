import React, { useState, useEffect } from "react";
import { chooseBackgroundColor } from "../../helper";

//Chart JS
import { Bar } from "react-chartjs-2";

function Chart(props) {
  const [chartData, setChartData] = useState({});
  const [statsType, setStatsType] = useState("basic");

  const { playerStats } = props;

  let seasonsArray = [];
  let assistsArray = [];
  let blockedArray = [];
  let evenTimeOnIceArray = [];
  let faceOffPctArray = [];
  let gameWinningGoalsArray = [];
  let gamesArray = [];
  let goalsArray = [];
  let hitsArray = [];
  let overTimeGoalsArray = [];
  let penaltyMinutesArray = [];
  let pimArray = [];
  let plusMinusArray = [];
  let pointsArray = [];
  let powerPlayGoalsArray = [];
  let powerPlayPointsArray = [];
  let powerPlayTimeOnIceArray = [];
  let shiftsArray = [];
  let shortHandedGoalsArray = [];
  let shortHandedPointsArray = [];
  let shortHandedTimeOnIceArray = [];
  let shotPctArray = [];
  let shotsArray = [];
  let timeOnIceArray = [];

  Object.values(playerStats).map((season) => {
    let {
      assists,
      blocked,
      evenTimeOnIce,
      faceOffPct,
      gameWinningGoals,
      games,
      goals,
      hits,
      overTimeGoals,
      penaltyMinutes,
      pim,
      plusMinus,
      points,
      powerPlayGoals,
      powerPlayPoints,
      powerPlayTimeOnIce,
      shifts,
      shortHandedGoals,
      shortHandedPoints,
      shortHandedTimeOnIce,
      shotPct,
      shots,
      timeOnIce,
    } = season.stat;

    if (season.league.name === "National Hockey League") {
      seasonsArray.push(season.season.replace(/(\d{4})/, ""));
      assistsArray.push(assists);
      blockedArray.push(blocked);
      evenTimeOnIceArray.push(evenTimeOnIce);
      faceOffPctArray.push(faceOffPct);
      gameWinningGoalsArray.push(gameWinningGoals);
      gamesArray.push(games);
      goalsArray.push(goals);
      hitsArray.push(hits);
      overTimeGoalsArray.push(overTimeGoals);
      penaltyMinutesArray.push(penaltyMinutes);
      pimArray.push(pim);
      plusMinusArray.push(plusMinus);
      pointsArray.push(points);
      powerPlayGoalsArray.push(powerPlayGoals);
      powerPlayPointsArray.push(powerPlayPoints);
      powerPlayTimeOnIceArray.push(powerPlayTimeOnIce);
      shiftsArray.push(shifts);
      shortHandedGoalsArray.push(shortHandedGoals);
      shortHandedPointsArray.push(shortHandedPoints);
      shortHandedTimeOnIceArray.push(shortHandedTimeOnIce);
      shotPctArray.push(shotPct);
      shotsArray.push(shots);
      timeOnIceArray.push(timeOnIce);
    }
  });

  useEffect(() => {
    if (statsType === "basic") {
      setChartData({
        labels: [...seasonsArray],
        datasets: [
          // {
          //   label: "Games Played",
          //   data: [...gamesArray],
          //   backgroundColor: chooseBackgroundColor(),
          // },
          {
            label: "Goals",
            data: [...goalsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Assists",
            data: [...assistsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Points",
            data: [...pointsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Plus/Minus",
            data: [...plusMinusArray],
            backgroundColor: chooseBackgroundColor(),
          },
        ]})}
    if (statsType === "even") {
      setChartData({
        labels: [...seasonsArray],
        datasets: [
          {
            label: "Goals",
            data: [...goalsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Assists",
            data: [...assistsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Games",
            data: [...gamesArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Blocked",
            data: [...blockedArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Even Time On Ice",
            data: [...evenTimeOnIceArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Face Off Percentage",
            data: [...faceOffPctArray],
            backgroundColor: chooseBackgroundColor(),
          },

          {
            label: "GWG",
            data: [...gameWinningGoalsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Hits",
            data: [...hitsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Over Time Goals",
            data: [...overTimeGoalsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Plus/Minus",
            data: [...plusMinusArray],
            backgroundColor: chooseBackgroundColor(),
          },
        ],
      });
    }
    if (statsType === "power") {
      setChartData({
        labels: [...seasonsArray],
        datasets: [
          {
            label: "PPG",
            data: [...powerPlayGoalsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "PPP",
            data: [...powerPlayPointsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "PP Time",
            data: [...powerPlayTimeOnIceArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "SHG",
            data: [...shortHandedGoalsArray],
            backgroundColor: chooseBackgroundColor(),
          },
        ],
      });
    }
    if (statsType === "short") {
      setChartData({
        labels: [...seasonsArray],
        datasets: [
          {
            label: "Short Handed Points",
            data: [...shortHandedPointsArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "SH Time",
            data: [...shortHandedTimeOnIceArray],
            backgroundColor: chooseBackgroundColor(),
          },
        ]
      })}
    console.log(chartData);
  }, []);

  return (
    <div>
      <Bar
        data={chartData}
        width={100}
        height={50}
        options={{
          title: {
            display: true,
            text: "Goals and Assists for NHL Career",
            fontSize: 25,
          },
        }}
      />
    </div>
  );
}

export default Chart;

// {
//   label: "Penalty Minutes",
//   data: [...penaltyMinutesArray],
//   backgroundColor: chooseBackgroundColor(),
// },

// {
//   label: "PIM",
//   data: [...pimArray],
//   backgroundColor: chooseBackgroundColor(),
// },




// {
//   label: "Shot %",
//   data: [...shotPctArray],
//   backgroundColor: chooseBackgroundColor(),
// },
// {
//   label: "Total Shots",
//   data: [...shotsArray],
//   backgroundColor: chooseBackgroundColor(),
// },
// {
//   label: "Time On Ice",
//   data: [...timeOnIceArray],
//   backgroundColor: chooseBackgroundColor(),
// },
