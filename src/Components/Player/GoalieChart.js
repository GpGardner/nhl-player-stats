import React, { useState, useEffect } from "react";
import { chooseBackgroundColor } from "../../helper";

//Chart JS
import { Bar } from "react-chartjs-2";

function Chart(props) {
  const [chartData, setChartData] = useState({});

  const { playerStats } = props;

  let seasonsArray = [];
  let savesArray = [];
  let shotsAgainstArray = [];
  let shutoutsArray = [];
  let gamesArray = [];
  let lossesArray = [];
  let evenSavesArray = [];
  let evenShotsArray = [];
  let evenStrengthSavePercentageArray = [];
  let gamesStartedArray = [];
  let goalAgainstAverageArray = [];
  let goalsAgainstArray = [];
  let powerPlaySavePercentageArray = [];
  let powerPlaySavesArray = [];
  let powerPlayShotsArray = [];
  let savePercentageArray = [];
  let shortHandedSavePercentageArray = [];
  let shortHandedSavesArray = [];
  let shortHandedShotsArray = [];
  let tiesArray = [];
  let timeOnIceArray = [];
  let winsArray = [];

  Object.values(playerStats).map((season) => {
    let {
      saves,
      shotsAgainst,
      shutouts,
      losses,
      games,
      evenSaves,
      evenShots,
      evenStrengthSavePercentage,
      gamesStarted,
      goalAgainstAverage,
      goalsAgainst,
      powerPlaySavePercentage,
      powerPlaySaves,
      powerPlayShots,
      savePercentage,
      shortHandedSavePercentage,
      shortHandedSaves,
      shortHandedShots,
      ties,
      timeOnIce,
      wins,
    } = season.stat;

    if (season.league.name === "National Hockey League") {
      seasonsArray.push(season.season.replace(/(\d{4})/, ""));
      savesArray.push(saves);
      shotsAgainstArray.push(shotsAgainst);
      shutoutsArray.push(shutouts);
      gamesArray.push(games);
      lossesArray.push(losses);
      evenSavesArray.push(evenSaves);
      evenShotsArray.push(evenShots);
      evenStrengthSavePercentageArray.push(evenStrengthSavePercentage);
      gamesStartedArray.push(gamesStarted);
      goalAgainstAverageArray.push(goalAgainstAverage);
      goalsAgainstArray.push(goalsAgainst);
      powerPlaySavePercentageArray.push(powerPlaySavePercentage);
      powerPlaySavesArray.push(powerPlaySaves);
      powerPlayShotsArray.push(powerPlayShots);
      savePercentageArray.push(savePercentage);
      shortHandedSavePercentageArray.push(shortHandedSavePercentage);
      shortHandedSavesArray.push(shortHandedSaves);
      shortHandedShotsArray.push(shortHandedShots);
      tiesArray.push(ties);
      timeOnIceArray.push(timeOnIce);
      winsArray.push(wins);
    }
  });

  useEffect(() => {
    if (statsType === "basic") {
      setChartData({
        labels: [...seasonsArray],
        datasets: [
          {
            label: "Saves",
            data: [...savesArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Shots Against",
            data: [...shotsAgainstArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Even Saves",
            data: [...evenSavesArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Even Shots",
            data: [...evenShotsArray],
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
            label: "Power Play Save Percentage",
            data: [...powerPlaySavePercentageArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Power Play Saves",
            data: [...powerPlaySavesArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Power Play Shots",
            data: [...powerPlayShotsArray],
            backgroundColor: chooseBackgroundColor(),
          },
        ],
      });
    }

    if (statsType === "even") {
      setChartData({
        labels: [...seasonsArray],
        datasets: [
          {
            label: "Games",
            data: [...gamesArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Games Started",
            data: [...gamesStartedArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Goals Against Average",
            data: [...goalAgainstAverageArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Goals Against",
            data: [...goalsAgainstArray],
            backgroundColor: chooseBackgroundColor(),
          },
          {
            label: "Even Strength Save Percentage",
            data: [...evenStrengthSavePercentageArray],
            backgroundColor: chooseBackgroundColor(),
          },
        ],
      });
    }
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
            text: "NHL Career",
            fontSize: 25,
          },
        }}
      />
    </div>
  );
}

export default Chart;


// {

// {
//   label: "Losses",
//   data: [...lossesArray],
//   backgroundColor: chooseBackgroundColor(),
// },

// ],
