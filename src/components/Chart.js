import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const IEX_TOKEN = process.env.REACT_APP_IEX_TOKEN;
am4core.useTheme(am4themes_animated);

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.data.companyName,
      symbol: props.data.symbol
    }
  }

  componentDidMount() {

    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;

    chart.dateFormatter.inputDateFormat = "YYYY-MM-dd";

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.OHLCSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";
    series.strokeWidth = 2;

    chart.cursor = new am4charts.XYCursor();

    // a separate series for scrollbar
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "close";
    // need to set on default state, as initially series is "show"
    lineSeries.defaultState.properties.visible = false;

    // hide from legend too (in case there is one)
    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(lineSeries);
    chart.scrollbarX = scrollbarX;

    //chart.dataSource.url = `https://cloud.iexapis.com/stable/stock/${this.state.symbol}/chart/1y?token=${IEX_TOKEN}`;
    //console.log(chart);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div>
        <h1>Chart For {this.state.name}</h1>
        <div id="chartdiv"
          style={{
            color: 'white',
            width: "600px",
            height: "500px",
            border: "3px solid white"
          }}></div>
      </div>

    );
  }
}

export default Chart;