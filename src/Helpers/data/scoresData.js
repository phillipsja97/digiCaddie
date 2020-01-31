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

const saveScores = (newScore) => axios.post(`${baseUrl}/userScores.json`, newScore);

const deleteAScore = (scoreId) => axios.delete(`${baseUrl}/userScores/${scoreId}.json`);

export default { getScoresByUid, saveScores, deleteAScore };
