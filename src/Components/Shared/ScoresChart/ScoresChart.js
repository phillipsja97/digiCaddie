import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
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
        this.setState({ userScores });
        console.log(userScores, 'userScores');
        const theData = userScores.map((x) => new Object({ date: x.date, value: x.score }));
        console.log(theData, 'theData');
        am4core.useTheme(am4themes_animated);
        const chart = am4core.create('theScoreChart', am4charts.XYChart);
        chart.data = theData;
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.dateFormatter.dateFormat = 'MM-dd';
        dateAxis.title.text = 'Dates';
        const valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis1.title.text = 'Scores';
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'value';
        series.dataFields.dateX = 'date';
        series.name = 'Scores';
      })
      .catch((errorFromScoresData) => console.error(errorFromScoresData));
  }

  render() {
    return (
      <div className="graph">
        <div id="theScoreChart"></div>
      </div>
    );
  }
}

export default ScoresChart;
