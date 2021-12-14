import React from 'react';
import { StatsBar } from 'bento-components';
import { statsStyling } from '../../bento/globalStatsData';

const CustomStatsView = ({ data, displayItems }) => (
  <>
    <StatsBar globalStatsData={displayItems} data={data} statsStyling={statsStyling} />
  </>
);

export default CustomStatsView;
