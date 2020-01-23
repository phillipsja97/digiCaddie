import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getCommentsByHoleId = (holeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/comments.json?orderBy="holeId"&equalTo="${holeId}"`)
    .then((result) => {
      const allCommentsObj = result.data;
      const comments = [];
      if (allCommentsObj != null) {
        Object.keys(allCommentsObj).forEach((commentId) => {
          const newComment = allCommentsObj[commentId];
          newComment.id = commentId;
          comments.push(newComment);
        });
      }
      resolve(comments);
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteAComment = (commentId) => axios.delete(`${baseUrl}/comments/${commentId}.json`);

const saveComment = (newComment) => axios.post(`${baseUrl}/comments.json`, newComment);

export default { getCommentsByHoleId, deleteAComment, saveComment };
