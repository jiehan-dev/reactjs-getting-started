import React from 'react';
import { cleanup, render } from 'react-testing-library';
import CourseForm from './CourseForm';

// There is no shallow rendering. Components are always mounted

afterEach(cleanup);

function renderCourseForm(args) {
  const defaltProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaltProps, ...args };
  return render(<CourseForm {...props} />);
}

it('should render Add Course header', () => {
  const { getByText } = renderCourseForm();
  getByText('Add Course');
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('should label save button as "Saving..." when saving', () => {
  // eslint-disable-next-line no-unused-vars
  const { getByText, debug } = renderCourseForm({ saving: true });
  // debug(); // print the element
  getByText('Saving...');
});
