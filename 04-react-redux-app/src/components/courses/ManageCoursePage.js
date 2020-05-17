import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

/*
Now this file contains 2 exports:
1. Unconnected component
2. Connected component
*/
export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed' + error);
      });
    } else {
      // this will copy the course passed in on props to state anytime a new course is passed in
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed' + error);
      });
    }
  }, [props.course]);
  // The empty array as a second arg to effect means the effect will run once when the component mounts

  function handleChange(event) {
    // Destructure avoid the event getting garbage collected so that it's available within the nested setCourse callback
    const { name, value } = event.target;

    setCourse((prevCourse) => ({
      ...prevCourse,
      // VVV JS computed property syntax. Reference a property via a variable
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required.';
    if (!authorId) errors.author = 'Author is required.';
    if (!category) errors.category = 'Category is required.';

    setErrors(errors);

    // Form is valid if the erros object still have no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();

    if (!formIsValid()) return;

    setSaving(true);

    // Any component loaded via <Route> gets history passed in on props from React Router
    saveCourse(course)
      .then(() => {
        toast.success('Course saved.');
        history.push('/courses');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// refer as selector, selects data from Redux store
// For performance, we could memoize using reselect library
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  // ownProps lets us access the component's props

  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

// option 4 of binding dispatch
const mapDispatchToProps = {
  loadCourses,
  saveCourse,
  loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

/*
Alternatively, if the mapDispatchToProps is too confusing, we can instead: 

import * as courseActions from '../../redux/actions/courseActions';

const mapDispatchToProps = {
  loadCourses: courseAction.loadCourses
};

*/
