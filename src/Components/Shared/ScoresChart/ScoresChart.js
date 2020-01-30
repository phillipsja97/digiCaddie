import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from '../../../Helpers/data/authData';
import scoresData from '../../../Helpers/data/scoresData';
import './ScoresChart.scss';

am4core.useTheme(am4themes_animated);

class ScoresChart extends React.Component {
  state = {
    userScores: [],
  }

  componentDidMount() {
    scoresData.getScoresByUid(authData.getUid())
      .then((userScores) => {
        console.log(userScores, 'userScores');
        const sortedScores = userScores.sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log(sortedScores, 'sorted');
        const scoreId = sortedScores.map((y) => new Object({ date: y.date, value: y.score, id: y.id.split('score')[1] }));
        console.log(scoreId, 'scoreId');
        scoreId.sort((a, b) => a.id - b.id);
        // const theData = scoreId.map((x) => new Object({ date: x.date, value: x.score }));
        const slicedData = scoreId.slice(-5);
        console.log(slicedData, 'sliced');
        am4core.useTheme(am4themes_animated);
        const chart = am4core.create('theScoreChart', am4charts.XYChart);
        // chart.data = slicedData;
        chart.data = slicedData;
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.dateFormatter.dateFormat = 'dd-ww';
        dateAxis.title.text = 'Dates';
        const valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis1.title.text = 'Scores';
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.columns.template.width = am4core.percent(30);
        series.dataFields.valueY = 'value';
        series.dataFields.dateX = 'date';
        series.name = 'Scores';
        series.columns.template.fill = am4core.color('#00ff00');
        series.connect = false;
      })
      .catch((errorFromScoresData) => console.error(errorFromScoresData));
  }

  render() {
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    return (
      <div className="graph">
        <h1>{name}'s Last 5 Scores</h1>
        <div className="buttons">
          <button className="btn btn-outline-primary">Add A New Score</button>
          <button className="btn btn-outline-primary">Edit A Score</button>
        </div>
        <div id="theScoreChart"></div>
      </div>
    );
  }
}

export default ScoresChart;
