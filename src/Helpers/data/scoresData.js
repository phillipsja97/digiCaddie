import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getScoresByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userScores.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const scoresObj = result.data;
      const userScores = [];
      if (scoresObj != null) {
        Object.keys(scoresObj).forEach((scoreId) => {
          const newScores = scoresObj[scoreId];
          newScores.id = scoreId;
          userScores.push(newScores);
        });
      }
      resolve(userScores);
      console.log('data', userScores);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleScore = (scoreId) => axios.get(`${baseUrl}/scoreId/${scoreId}.json`);

const saveScores = (newScore) => axios.post(`${baseUrl}/userScores.json`, newScore);

const deleteAScore = (scoreId) => axios.delete(`${baseUrl}/userScores/${scoreId}.json`);

const updateScore = (scoreId, updatedScore) => axios.put(`${baseUrl}/userScores/${scoreId}.json`, updatedScore);

export default {
  getScoresByUid,
  saveScores,
  deleteAScore,
  getSingleScore,
  updateScore,
};
