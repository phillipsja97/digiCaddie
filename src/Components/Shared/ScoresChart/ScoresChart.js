import React from 'react';
import { Victory } from 'victory';
import ScoresChart from '../../Shared/ScoresChart/ScoresChart';
import authData from '../../../Helpers/data/authData';
import scoresData from '../../../Helpers/data/scoresData';
import './ScoresChart.scss';


class ScoresChart extends React.Component {
  state = {
    userScores: [],
  }

  getUserScores = (uid) => {
    scoresData.getScoresByUid(uid)
      .then((userScores) => {
        this.setState({ userScores });
        console.log(userScores);
      })
      .catch((errorFromScoresData) => console.error(errorFromScoresData));
  }

  componentDidMount() {
    this.getUserScores((authData.getUid()));
  }

  setDates = () => {
    const { finalDates } = this.state;
    const { userScores } = this.props;
    console.log(userScores, 'important');
    // const theDates = [];
    // const datesObj = {};
    // this.state.userScores.forEach((x) => {
    //   datesObj.date = x.date;
    //   theDates.push(datesObj);
    //   return theDates;
    // });
    // console.log(theDates, 'theDates');
    // this.setState({ finalDates: theDates });
    // console.log(finalDates);
  }

  setScores = () => {
    const { onlyScoresData } = this.state;
    const theScores = [];
    // const scores = this.state.userScores.map((x) => x.score);
    // theScores.push(scores);
    // this.setState({ onlyScoresData: theScores });
    // console.log(onlyScoresData);
  }

  componentDidMount() {
    this.setDates();
    this.setScores();
  }


  render() {
    const mydata = {
      labels: [this.state.finalDates],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [this.state.onlyScoresData],
        }
      ],
    };
    return (
      <article className="canvas-container">
        <Bar
        data={this.myData}
        />
      </article>
    );
  }
}

export default ScoresChart;
