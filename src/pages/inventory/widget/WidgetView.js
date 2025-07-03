import React, { useCallback, useState } from "react";
import { Button, Collapse, Grid, Switch, withStyles } from "@material-ui/core";
import ToolTip from "@bento-core/tool-tip";
import { WidgetGenerator } from "@bento-core/widgets";
import { widgetConfig } from "../../../bento/dashTemplate";
import colors from "../../../utils/colors";
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
            if (
              widgetTypes[index] === "sunburst" &&
              (!dataset.children || !dataset.children.length)
            ) {
              return <></>;
            }
            return (
              <Grid key={index} item lg={4} md={6} sm={12} xs={12} style={{padding: "30px"}}>
                <WidgetThemeProvider>
                  <div className={classes.widgetBox}>
                  <Widget
                    header={
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          flex:1
                        }}
                      >
                        <Typography
                          size="md"
                          weight="normal"
                          family="Nunito"
                          style={{
                            textAlign: "start",
                            width: "100%",
                          }}
                          color="lochmara"
                          className={classes.widgetTitle}
                        >
                          {widget.title}
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
