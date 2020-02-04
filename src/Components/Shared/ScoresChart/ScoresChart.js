/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import authData from '../../../Helpers/data/authData';
import scoreShape from '../../../Helpers/propz/scoreShape';
import scoresData from '../../../Helpers/data/scoresData';
import AddScoreModal from '../AddScoreModal/AddScoreModal';
import EditScoreModal from '../EditScoreModal/EditScoreModal';
import './ScoresChart.scss';

am4core.useTheme(am4themes_animated);

class ScoresChart extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    slicedUserScores: scoreShape.scoreShape,
    editShape: PropTypes.bool,
  }

  state = {
    userScores: [],
    show: false,
    editShow: false,
    slicedUserScores: [],
  }

  getScoresAndGraph = () => {
    scoresData.getScoresByUid(authData.getUid())
      .then((userScores) => {
        this.setState({ userScores });
        const sortedScores = userScores.sort((a, b) => new Date(a.date) - new Date(b.date));
        // eslint-disable-next-line no-new-object
        const scoreId = sortedScores.map((y) => new Object({ date: y.date, value: y.score, id: y.id }));
        scoreId.sort((a, b) => a.id - b.id);
        const slicedUserScores = scoreId.slice(-5);
        this.setState({ slicedUserScores });
        am4core.useTheme(am4themes_animated);
        const chart = am4core.create('theScoreChart', am4charts.XYChart);
        chart.data = this.state.slicedUserScores;
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.dateFormatter.dateFormat = 'dd-ww';
        dateAxis.title.text = 'Dates';
        const valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis1.title.text = 'Scores';
        const series = chart.series.push(new am4charts.LineSeries());
        // series.columns.template.width = am4core.percent(30);
        series.dataFields.valueY = 'value';
        series.dataFields.dateX = 'date';
        series.name = 'Scores';
        series.stroke = am4core.color('#70f869');
        series.tensionX = 0.8;
        series.strokeWidth = 3;
        series.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]';
        const bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.fill = am4core.color('#70f869');
        // series.columns.template.fill = am4core.color('#00ff00');
        series.connect = true;
      });
  }

  componentDidMount() {
    this.getScoresAndGraph();
  }

  handleClose = () => this.setState({ show: false });

  handleNewScoreShow = () => this.setState({ show: true });

  handleEditClose = () => this.setState({ editShow: false });

  handleEditScoreShow = () => this.setState({ editShow: true });

  deleteScore = (scoreId) => {
    const { getUserScoresForAvg } = this.props;
    scoresData.deleteAScore(scoreId)
      .then(() => {
        this.getScoresAndGraph();
        this.handleEditClose();
      }).then(() => {
        getUserScoresForAvg(authData.getUid());
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { average, getUserScoresForAvg } = this.props;
    return (
      <div className="graph">
        <h1>Last 5 Scores</h1>
        <div className="d-inline-flex buttons">
            <div className="addButton">
              <button className="btn btn-dark" onClick={this.handleNewScoreShow}>Add A New Score</button>
            </div>
            <div className="editButton">
               <button className="btn btn-dark" onClick={this.handleEditScoreShow}>Edit A Score</button>
            </div>
        </div>
        <div className="container-fluid scoreChart">
          <div id="theScoreChart">
            <AddScoreModal show={this.state.show} handleClose={this.handleClose} slicedUserScores={this.state.slicedUserScores} getScoresAndGraph={this.getScoresAndGraph} getUserScoresForAvg={getUserScoresForAvg} average={average} />
            <EditScoreModal editShow={this.state.editShow} handleEditClose={this.handleEditClose} getScoresAndGraph={this.getScoresAndGraph} slicedUserScores={this.state.slicedUserScores} deleteScore={this.deleteScore} getUserScoresForAvg={getUserScoresForAvg} average={average} />
          </div>
        </div>
      </div>
    );
  }
}

export default ScoresChart;
