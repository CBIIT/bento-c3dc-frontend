import React, { useCallback } from 'react';
import {
  Button,
  Collapse,
  Grid,
  // Switch,
  withStyles,
} from '@material-ui/core';
import styles from './WidgetStyle';
import { WidgetGenerator } from '@bento-core/widgets';
import { widgetConfig } from '../../../bento/dashTemplate';
import colors from '../../../utils/colors';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { formatWidgetData } from './WidgetUtils';

const CustomCollapse = withStyles({
  wrapper:{
    display: 'block',
  }
})(Collapse);

const WidgetView = ({
  classes,
  data,
  theme,
}) => {
  const displayWidgets = formatWidgetData(data, widgetConfig);
  const [collapse, setCollapse] = React.useState(true);
  // const themeChanger = useTheme();
  const handleChange = () => setCollapse((prev) => !prev);

  const widgetGeneratorConfig = {
    theme,
    DonutConfig: {
      colors,
      styles: {
        cellPadding: 2,
        textOverflowLength: 15,
        textColor: theme.palette.widgetBackground.contrastText,
      },
      functions:{
        // TODO: Make change in Widget package to rprovide option to configure active index. 
        // Using getLastIndex to show first index as data set us sorted decending. 
        getLastIndex: (dataset) => ((dataset.length !== undefined) ? 0 : 0),
      }
    },
    SunburstConfig: {
      styles: {
        textColor: theme.palette.widgetBackground.contrastText,
      },
    },
  };
  const { Widget } = useCallback(WidgetGenerator(widgetGeneratorConfig), []);

  return (
    <>
      <div className={classes.widgetsCollapse}>
        <div className={classes.floatLeft} />
        <div className={classes.floatRight}>
          <Button className={classes.customButton} onClick={handleChange}>
            {collapse ? 'collapse view' : 'open view'}
          </Button>
          {/* <Switch
            classes={{
              root: classes.switchRoot,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            className={classes.customSwitch}
            disableRipple
            checked={themeChanger.dark}
            onChange={themeChanger.toggleTheme}
          /> */}
        </div>
      </div>
      <CustomCollapse in={collapse} className={classes.backgroundWidgets}>
        <Grid container>
          {widgetConfig.slice(0, 6).map((widget, index) => {
            let dataset = displayWidgets[widget.dataName];
          let newDataset  = dataset.map((data) => {
              return {
                ...data
              };
            });
            dataset = newDataset;
            if (!dataset || dataset.length === 0) {
              return <></>;
            }
            if (widget.type === 'sunburst' && (!dataset.children || !dataset.children.length)) {
              return <></>;
            }
            return (
              <Grid key={index} item lg={4} md={6} sm={12} xs={12}
               style={{
                  paddingLeft: '30px',
                  paddingTop: '40px',
                  borderRadius: '30px',
                }}
              >
                {/* TODO: Cleaan below line if not needed. */}
                {/* <Typography size="md" weight="normal" family="Nunito"  style={{textAlign: 'center',width:'92%'}} color="lochmara"></Typography> */}
                
                <div className={classes.widgetBox}> 
                <Widget
                  header={(
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography size="md" weight="normal" family="Nunito" style={{ color: '#4A5C5E' }}>
                        {widget.title}
                      </Typography>
                    </div>
                  )}
                  title={widget.title}
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  bottomDivider                 
                  customBackGround
                  data={dataset}
                  chartType={widget.type}
                  sliceTitle={widget.sliceTitle}
                  chartTitleLocation="bottom"
                  chartTitleAlignment="center"
                  width={widget.width}
                  height={widget.height}
                />
                </div>
              
              </Grid>
            );
          })}
        </Grid>
      </CustomCollapse>
      {collapse && <div className={classes.dashboardDividerTop} />}
      {collapse && <div className={classes.dashboardDivider} />}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(WidgetView);
