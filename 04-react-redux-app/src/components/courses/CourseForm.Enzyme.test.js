import React from 'react';
import CourseForm from './CourseForm';
import { shallow } from 'enzyme';

/*
Two ways to render a React component for testing with Enzyme
1. shallow - Renders single component
           - No DOM is created
           - No child components are rendered

2. mount - Renders component with children
         - DOM is created in memory via JSDOM
 */

// Factory Helper
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
  return shallow(<CourseForm {...props} />);
}

it('renders form and header', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Course');
  // 'find' can use css selector
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find('button').text()).toBe('Save');
});

it('labels save buttons as "Saving..." when saving', () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find('button').text()).toBe('Saving...');
});
