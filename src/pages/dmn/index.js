import React from 'react';
import env from '../../utils/env';

const DataModelNavigator = () => {
  const dmnUrl = env.REACT_APP_DMN_URL;
  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <iframe
        src={dmnUrl}
        scrolling="no"
        title="Data Model Navigator"
        style={{ width: '100%', height: '1000px', border: 'none' }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default DataModelNavigator;
