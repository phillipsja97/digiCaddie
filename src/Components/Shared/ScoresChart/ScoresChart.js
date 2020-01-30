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

  getUserScores = (uid) => {
    scoresData.getScoresByUid(uid)
      .then((userScores) => {
        this.setState({ userScores });
        console.log('getUserScores', userScores);
      })
      .catch((errorFromScoresData) => console.error(errorFromScoresData));
  }

  componentDidMount() {
    this.getUserScores((authData.getUid()));
    console.log(this.state.userScores);
    const theData = this.state.userScores.map((x) => { return [{ date: x.date, value: x.score }]; });
    console.log(theData);
    am4core.useTheme(am4themes_animated);
    const chart = am4core.create('theScoreChart', am4charts.XYChart);
    chart.data = [{
      date: new Date(2019, 3, 11),
      value: 81,
    }, {
      date: new Date(2019, 9, 11),
      value: 84,
    }];
    console.log(chart.data);
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.title.text = 'Dates';
    const valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.title.text = 'Scores';
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.name = 'Scores';
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
