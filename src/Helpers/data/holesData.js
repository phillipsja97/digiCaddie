import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getHolesByCourseId = (courseId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="courseId"&equalTo="${courseId}"`)
    .then((result) => {
      const holesObj = result.data;
      const holes = [];
      if (holesObj != null) {
        Object.keys(holesObj).forEach((holeId) => {
          const newHole = holesObj[holeId];
          newHole.id = holeId;
          holes.push(newHole);
        });
      }
      resolve(holes);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getHolesByCourseId };