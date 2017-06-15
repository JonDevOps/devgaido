import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import BreadCrumbs from '../shared/BreadCrumbs';
/* import Card from '../shared/Card';

const lessonTypeIcons = {
  Reading: 'fa fa-book',
  Project: 'fa fa-tasks',
  'Supplemental Course': '',
};

const lessonTypeColors = {
  Reading: '#ffea7e',
  Project: 'deepskyblue',
  'Supplemental Course': '',
};

const getAllCourseLessons = (course, curriculum) => {
  const lessons = [];
  course.lessonIds.forEach((lessonId) => {
    lessons.push(curriculum.lessons[lessonId]);
  });
  return lessons;
};

const LessonCard = ({ name, description, id, type }) => (
  <Card
    caption={name}
    subcaption="LESSON"
    text={description}
    to={`/lessons/${id}`}
    content={null}
    icons={[lessonTypeIcons[type], 'fa fa-graduation-cap']}
    color={lessonTypeColors[type]}
  />
);
*/
const CourseCard = ({ curriculum, pathId, courseId }) => (
  <Link className="courseCard" to={`/paths/${pathId}/${courseId}`}>
    <div className="courseCardHeader">
      <span className="courseCardCaption">COURSE</span>
      <h1>{curriculum.courses[courseId].name}</h1>
    </div>
    <p className="courseDescription">{curriculum.courses[courseId].description}</p>
    <div className="lessonList">
      {/* getAllCourseLessons(curriculum.courses[id], curriculum).map(lesson => (
        <LessonCard
          name={lesson.name}
          description={lesson.description}
          id={lesson.id}
          type={lesson.type}
          key={lesson.id}
        />
      ))*/}
    </div>
  </Link>
);

const Path = ({ match, curriculum }) => {
  const path = curriculum.paths[match.params.id];
  const courses = path.courseIds.map(courseId => (
    <CourseCard
      curriculum={curriculum}
      pathId={match.params.id}
      courseId={courseId}
      key={courseId}
    />
  ));
  return (
    <div className="lostContainer">
      <BreadCrumbs curriculum={curriculum} pathId={match.params.id} />
      <div className="card card--image colFull">
        <div className="cardHeader cardHeader--image" />
        <div className="cardHeader cardHeader--image--color">
          <h1 className="cardHeader--pathName">{path.name}</h1>
        </div>
        <span className="cardBigCaption">About this Path:</span>
        <p className="cardText">{path.description}</p>
        <p className="cardText">Courses in this path: {courses.length}</p>
        {courses}
      </div>
    </div>
  );
};
/*
LessonCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};*/
CourseCard.propTypes = {
  pathId: PropTypes.objectOf(PropTypes.shape).isRequired,
  courseId: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Path;