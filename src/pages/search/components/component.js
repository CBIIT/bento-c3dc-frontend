import React from 'react';
import AboutCard from './cards/aboutCard';

const Components = {
  about: AboutCard,
};

export default ({
  searchText, data, classes, index,
}) => {
  if (typeof Components[data.type] !== 'undefined') {
    return React.createElement(Components[data.type], {
      data, classes, index, searchText,
    });
  }
  return React.createElement(
    () => (
      <div>
        The component
        {' '}
        {data.type}
        {' '}
        has not been created yet.
      </div>
    ),
  );
};
