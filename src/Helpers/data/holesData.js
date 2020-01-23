import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getHolesByCourseId = (courseId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holes.json?orderBy="courseId"&equalTo="${courseId}"`)
    .then((result) => {
      const holesObj = result.data;
      const holes = [];
      if (holesObj != null) {
        Object.keys(holesObj).forEach((holeId) => {
          const newHole = holesObj[holeId];
          newHole.id = holeId;
          holes.push(newHole);
          return holes.sort((a, b) => a.holeNumber - b.holeNumber);
        });
      }
      resolve(holes);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleHole = (holeId) => axios.get(`${baseUrl}/holes/${holeId}.json`);

export default { getHolesByCourseId, getSingleHole };
