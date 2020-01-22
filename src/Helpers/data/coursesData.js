import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllCourses = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/courses.json`)
    .then((result) => {
      const allCoursesObj = result.data;
      const courses = [];
      if (allCoursesObj != null) {
        Object.keys(allCoursesObj).forEach((courseId) => {
          const newCourse = allCoursesObj[courseId];
          newCourse.id = courseId;
          courses.push(newCourse);
        });
      }
      resolve(courses);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleCourse = (courseId) => axios.get(`${baseUrl}/courses/${courseId}.json`);

export default { getAllCourses, getSingleCourse };
