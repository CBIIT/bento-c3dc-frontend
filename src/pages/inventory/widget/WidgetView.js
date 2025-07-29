import React, { useCallback, useState } from "react";
import { Button, Collapse, Grid, Switch, withStyles } from "@material-ui/core";
import ToolTip from "@bento-core/tool-tip";
import { WidgetGenerator } from "@bento-core/widgets";
import { widgetConfig, widgetToolTipConfig, WIDGET_DATASET_LIMIT } from "../../../bento/dashTemplate";
import colors from "../../../utils/colors";
import ToolTipIconView from "../../../components/ToolTipIcon/ToolTipIconView";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { formatWidgetData } from "./WidgetUtils";
import WidgetThemeProvider from "./WidgetTheme";
import styles from "./WidgetStyle";

const CustomCollapse = withStyles({
  wrapper: {
    display: "block",
  },
})(Collapse);

const WidgetView = ({ classes, data, theme }) => {
  const displayWidgets = formatWidgetData(data, widgetConfig);
  const [widgetTypes, setWidgetTypes] = useState(
    widgetConfig.map((widget) => {
      return widget.type;
    })
  );
  const [collapse, setCollapse] = useState(true);
  const handleChange = () => setCollapse((prev) => !prev);

  const toggleWidgetType = (index) => {
    setWidgetTypes((prev) => {
      const newTypes = [...prev];
      newTypes[index] = newTypes[index] === "donut" ? "bar" : "donut";
      return newTypes;
    });
  };

  const widgetGeneratorConfig = {
    theme,
    DonutConfig: {
      colors,
      styles: {
        cellPadding: 2,
        textOverflowLength: 15,
        textColor: theme.palette.widgetBackground.contrastText,
      },
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
            {collapse ? "collapse view" : "open view"}
          </Button>
        </div>
      </div>
      <CustomCollapse in={collapse} className={classes.backgroundWidgets}>
        <Grid container>
          {widgetConfig.slice(0, 6).map((widget, index) => {
            let dataset = displayWidgets[widget.dataName];
            let newDataset = dataset.map((data) => {
              return {
                ...data,
              };
            });
            dataset = newDataset;
            
            if (!dataset || dataset.length === 0) {
              return <></>;
            }
            const datasetLength = dataset.length;
            if (widget.countType === "discrete") {
              dataset = dataset.sort((a, b) => b.subjects - a.subjects);
            }
            if (datasetLength > WIDGET_DATASET_LIMIT) {
              const otherGroup = {
                group: "Other",
                subjects: dataset.slice(WIDGET_DATASET_LIMIT).reduce((acc, curr) => acc + curr.subjects, 0),
              };
              dataset = dataset.slice(0, WIDGET_DATASET_LIMIT).concat(otherGroup);
            }
            if (
              widgetTypes[index] === "sunburst" &&
              (!dataset.children || !dataset.children.length)
            ) {
              return <></>;
            }
            const widgetTooltip = widgetToolTipConfig[widget.title];
            const dynamicTooltipConfig = {
              title: `Showing top ${WIDGET_DATASET_LIMIT} out of ${datasetLength} total ${widgetTooltip ? widgetTooltip.plural : 'items'}`,
              clsName: classes.widgetTotalTooltipIcon
            };
            return (
              <Grid key={index} item lg={4} md={6} sm={12} xs={12} className={classes.padding}>
                <WidgetThemeProvider>
                  <div className={classes.widgetBox}>
                  <Widget
                    header={
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          flex:1,
                          alignItems: "center"
                        }}
                      >
                        <Typography
                          className={classes.widgetTitle}
                        >
                          {widget.title}
                          {datasetLength > WIDGET_DATASET_LIMIT && <ToolTipIconView
                            section={widget.title}
                            tooltipConfig={{...widgetTooltip, ...dynamicTooltipConfig}}
                            classes={classes}
                          />}
                        </Typography>
                        <div>
                          <ToolTip
                            title={widget.tooltip}
                            placement="top-end"
                            textAlign="center"
                            arrow
                          >
                            <div>
                              <Switch
                                onChange={() => toggleWidgetType(index)}
                                checked={widgetTypes[index] === "bar"}
                                inputProps={{ 'aria-label': `Toggle chart type for ${widget.title}` }}
                              />
                            </div>
                          </ToolTip>
                        </div>
                      </div>
                    }
                    title={widget.title}
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                    bottomDivider
                    customBackGround
                    data={dataset}
                    chartType={widgetTypes[index]}
                    sliceTitle={widget.sliceTitle}
                    chartTitleLocation="bottom"
                    chartTitleAlignment="center"
                    width={widget.width}
                    height={widget.height}
                  />
                  </div>
                </WidgetThemeProvider>
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
