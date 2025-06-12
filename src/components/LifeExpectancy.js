import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import "../styles/LifeExpectancy.css"; // Import your CSS file for styling

function Legend(
  color,
  {
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat,
    tickValues,
  } = {}
) {
  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible")
    .style("display", "block");

  let tickAdjust = (g) =>
    g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color
      .copy()
      .rangeRound(
        d3.quantize(d3.interpolate(marginLeft, width - marginRight), n)
      );

    svg
      .append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr(
        "xlink:href",
        ramp(
          color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))
        ).toDataURL()
      );
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(
      color
        .copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
      {
        range() {
          return [marginLeft, width - marginRight];
        },
      }
    );

    svg
      .append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3
          .range(n)
          .map((i) => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
    const thresholds = color.thresholds
      ? color.thresholds() // scaleQuantize
      : color.quantiles
      ? color.quantiles() // scaleQuantile
      : color.domain(); // scaleThreshold

    const thresholdFormat =
      tickFormat === undefined
        ? (d) => d
        : typeof tickFormat === "string"
        ? d3.format(tickFormat)
        : tickFormat;

    x = d3
      .scaleLinear()
      .domain([-1, color.range().length - 1])
      .rangeRound([marginLeft, width - marginRight]);

    svg
      .append("g")
      .selectAll("rect")
      .data(color.range())
      .join("rect")
      .attr("x", (d, i) => x(i - 1))
      .attr("y", marginTop)
      .attr("width", (d, i) => x(i) - x(i - 1))
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", (d) => d);

    tickValues = d3.range(thresholds.length);
    tickFormat = (i) => thresholdFormat(thresholds[i], i);
  }

  // Ordinal
  else {
    x = d3
      .scaleBand()
      .domain(color.domain())
      .rangeRound([marginLeft, width - marginRight]);

    svg
      .append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
      .attr("x", x)
      .attr("y", marginTop)
      .attr("width", Math.max(0, x.bandwidth() - 1))
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", color);

    tickAdjust = () => {};
  }

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues)
    )
    .call(tickAdjust)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("class", "title")
        .text(title)
    );

  return svg.node();
}

const data = [
  { name: "Afghanistan", hale: 53 },
  { name: "Albania", hale: 68.1 },
  { name: "Algeria", hale: 65.5 },
  { name: "Andorra", hale: null },
  { name: "Angola", hale: 55.8 },
  { name: "Antigua and Barb.", hale: 67 },
  { name: "Argentina", hale: 68.4 },
  { name: "Armenia", hale: 66.3 },
  { name: "Australia", hale: 73 },
  { name: "Austria", hale: 72.4 },
  { name: "Azerbaijan", hale: 64.9 },
  { name: "Bahamas", hale: 66.8 },
  { name: "Bahrain", hale: 68.1 },
  { name: "Bangladesh", hale: 63.3 },
  { name: "Barbados", hale: 67 },
  { name: "Belarus", hale: 65.5 },
  { name: "Belgium", hale: 71.6 },
  { name: "Belize", hale: 62.5 },
  { name: "Benin", hale: 53.5 },
  { name: "Bhutan", hale: 60.7 },
  { name: "Bolivia", hale: 63 },
  { name: "Bosnia and Herz.", hale: 67.2 },
  { name: "Botswana", hale: 57.5 },
  { name: "Brazil", hale: 66 },
  { name: "Brunei", hale: 67.9 },
  { name: "Bulgaria", hale: 66.4 },
  { name: "Burkina Faso", hale: 52.9 },
  { name: "Burundi", hale: 52.6 },
  { name: "Cabo Verde", hale: 64.5 },
  { name: "Cambodia", hale: 60.8 },
  { name: "Cameroon", hale: 51.1 },
  { name: "Canada", hale: 73.2 },
  { name: "Central African Rep.", hale: 44.9 },
  { name: "Chad", hale: 47.2 },
  { name: "Chile", hale: 69.7 },
  { name: "China", hale: 68.7 },
  { name: "Colombia", hale: 67.1 },
  { name: "Comoros", hale: 56.6 },
  { name: "Congo", hale: 56.7 },
  { name: "Cook Is.", hale: null },
  { name: "Costa Rica", hale: 70.9 },
  { name: "Côte d'Ivoire", hale: 48.3 },
  { name: "Croatia", hale: 69 },
  { name: "Cuba", hale: 69.9 },
  { name: "Cyprus", hale: 73.3 },
  { name: "Czechia", hale: 69.3 },
  { name: "North Korea", hale: 64.6 },
  { name: "Dem. Rep. Congo", hale: 52.5 },
  { name: "Denmark", hale: 71.8 },
  { name: "Djibouti", hale: 56.6 },
  { name: "Dominica", hale: null },
  { name: "Dominican Rep.", hale: 65.2 },
  { name: "Ecuador", hale: 67.9 },
  { name: "Egypt", hale: 61.1 },
  { name: "El Salvador", hale: 65.5 },
  { name: "Eq. Guinea", hale: 53.8 },
  { name: "Eritrea", hale: 57.4 },
  { name: "Estonia", hale: 68.2 },
  { name: "Ethiopia", hale: 57.5 },
  { name: "Fiji", hale: 61.3 },
  { name: "Finland", hale: 71.7 },
  { name: "France", hale: 73.4 },
  { name: "Gabon", hale: 58.7 },
  { name: "Gambia", hale: 54.4 },
  { name: "Georgia", hale: 64.9 },
  { name: "Germany", hale: 71.6 },
  { name: "Ghana", hale: 56.4 },
  { name: "Greece", hale: 72 },
  { name: "Grenada", hale: 64.7 },
  { name: "Guatemala", hale: 64.2 },
  { name: "Guinea", hale: 52.2 },
  { name: "Guinea-Bissau", hale: 51.7 },
  { name: "Guyana", hale: 58.3 },
  { name: "Haiti", hale: 55.3 },
  { name: "Honduras", hale: 66.8 },
  { name: "Hungary", hale: 66.8 },
  { name: "Iceland", hale: 73 },
  { name: "India", hale: 59.3 },
  { name: "Indonesia", hale: 61.7 },
  { name: "Iran", hale: 65.4 },
  { name: "Iraq", hale: 59 },
  { name: "Ireland", hale: 72.1 },
  { name: "Israel", hale: 72.9 },
  { name: "Italy", hale: 73.2 },
  { name: "Jamaica", hale: 66.9 },
  { name: "Japan", hale: 74.8 },
  { name: "Jordan", hale: 66.4 },
  { name: "Kazakhstan", hale: 63.4 },
  { name: "Kenya", hale: 58.9 },
  { name: "Kiribati", hale: 57.8 },
  { name: "Kuwait", hale: 66.3 },
  { name: "Kyrgyzstan", hale: 63.5 },
  { name: "Laos", hale: 57.9 },
  { name: "Latvia", hale: 66.2 },
  { name: "Lebanon", hale: 66.1 },
  { name: "Lesotho", hale: 46.6 },
  { name: "Liberia", hale: 54.5 },
  { name: "Libya", hale: 62.3 },
  { name: "Lithuania", hale: 66.1 },
  { name: "Luxembourg", hale: 72.6 },
  { name: "Madagascar", hale: 58.3 },
  { name: "Malawi", hale: 56.2 },
  { name: "Malaysia", hale: 66.6 },
  { name: "Maldives", hale: 69.8 },
  { name: "Mali", hale: 50.7 },
  { name: "Malta", hale: 72.2 },
  { name: "Marshall Is.", hale: null },
  { name: "Mauritania", hale: 56.4 },
  { name: "Mauritius", hale: 65.8 },
  { name: "Mexico", hale: 67.7 },
  { name: "Micronesia", hale: 61.1 },
  { name: "Monaco", hale: null },
  { name: "Mongolia", hale: 61.9 },
  { name: "Montenegro", hale: 68.1 },
  { name: "Morocco", hale: 65.3 },
  { name: "Mozambique", hale: 52.2 },
  { name: "Myanmar", hale: 58.4 },
  { name: "Namibia", hale: 55.9 },
  { name: "Nauru", hale: null },
  { name: "Nepal", hale: 61.3 },
  { name: "Netherlands", hale: 72.1 },
  { name: "New Zealand", hale: 72.8 },
  { name: "Nicaragua", hale: 66.9 },
  { name: "Niger", hale: 52.5 },
  { name: "Nigeria", hale: 48.9 },
  { name: "Niue", hale: null },
  { name: "Norway", hale: 73 },
  { name: "Oman", hale: 65.6 },
  { name: "Pakistan", hale: 57.7 },
  { name: "Palau", hale: null },
  { name: "Panama", hale: 69.4 },
  { name: "Papua New Guinea", hale: 58 },
  { name: "Paraguay", hale: 65.3 },
  { name: "Peru", hale: 67.5 },
  { name: "Philippines", hale: 61.7 },
  { name: "Poland", hale: 68.5 },
  { name: "Portugal", hale: 72 },
  { name: "Qatar", hale: 68.6 },
  { name: "South Korea", hale: 73 },
  { name: "Moldova", hale: 63.6 },
  { name: "Romania", hale: 66.6 },
  { name: "Russia", hale: 63.5 },
  { name: "Rwanda", hale: 59.9 },
  { name: "St. Kitts and Nevis", hale: null },
  { name: "Saint Lucia", hale: 66.4 },
  { name: "St. Vin. and Gren.", hale: 63.4 },
  { name: "Samoa", hale: 66 },
  { name: "San Marino", hale: null },
  { name: "São Tomé and Principe", hale: 60.7 },
  { name: "Saudi Arabia", hale: 65.7 },
  { name: "Senegal", hale: 58.8 },
  { name: "Serbia", hale: 67.4 },
  { name: "Seychelles", hale: 65.7 },
  { name: "Sierra Leone", hale: 47.6 },
  { name: "Singapore", hale: 76.2 },
  { name: "Slovakia", hale: 68.3 },
  { name: "Slovenia", hale: 70.5 },
  { name: "Solomon Is.", hale: 61.9 },
  { name: "Somalia", hale: 50 },
  { name: "South Africa", hale: 55.7 },
  { name: "S. Sudan", hale: 50.6 },
  { name: "Spain", hale: 73.8 },
  { name: "Sri Lanka", hale: 66.8 },
  { name: "Sudan", hale: 55.7 },
  { name: "Suriname", hale: 63.2 },
  { name: "eSwatini", hale: 50.2 },
  { name: "Sweden", hale: 72.4 },
  { name: "Switzerland", hale: 73.5 },
  { name: "Syria", hale: 55.8 },
  { name: "Tajikistan", hale: 63.5 },
  { name: "Thailand", hale: 66.8 },
  { name: "Macedonia", hale: 67.1 },
  { name: "Timor-Leste", hale: 59.2 },
  { name: "Togo", hale: 53.9 },
  { name: "Tonga", hale: 64.3 },
  { name: "Trinidad and Tobago", hale: 63.3 },
  { name: "Tunisia", hale: 66.3 },
  { name: "Turkey", hale: 66 },
  { name: "Turkmenistan", hale: 61.4 },
  { name: "Tuvalu", hale: null },
  { name: "Uganda", hale: 54.9 },
  { name: "Ukraine", hale: 64 },
  { name: "United Arab Emirates", hale: 66.7 },
  { name: "United Kingdom", hale: 71.9 },
  { name: "Tanzania", hale: 56.5 },
  { name: "United States of America", hale: 68.5 },
  { name: "Uruguay", hale: 68.8 },
  { name: "Uzbekistan", hale: 64.5 },
  { name: "Vanuatu", hale: 62.7 },
  { name: "Venezuela", hale: 66.1 },
  { name: "Vietnam", hale: 67.5 },
  { name: "Yemen", hale: 55.1 },
  { name: "Zambia", hale: 54.3 },
  { name: "Zimbabwe", hale: 54.4 },
];

function LifeExpectancy() {
  const chartRef = useRef(null);
  const [worldData, setWorldData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the TopoJSON data
    setLoading(true);
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
      .then((topology) => {
        setWorldData(topology);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!worldData) return;

    // Convert TopoJSON to GeoJSON
    const countries = topojson.feature(worldData, worldData.objects.countries);

    const countrymesh = topojson.mesh(
      worldData,
      worldData.objects.countries,
      (a, b) => a !== b
    );
    // Specify the chart’s dimensions.
    const width = 928;
    const marginTop = 46;
    const height = width / 2 + marginTop;

    // Fit the projection.
    const projection = d3.geoEqualEarth().fitExtent(
      [
        [2, marginTop + 2],
        [width - 2, height],
      ],
      { type: "Sphere" }
    );
    const path = d3.geoPath(projection);

    // Index the values and create the color scale.
    const valuemap = new Map(data.map((d) => [d.name, d.hale]));
    const color = d3.scaleSequential(
      d3.extent(valuemap.values()),
      d3.interpolateYlGnBu
    );

    // Create the SVG container.
    d3.select(chartRef.current).selectAll("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Append the legend.
    svg
      .append("g")
      .attr("transform", "translate(20,0)")
      .append(() =>
        Legend(color, { title: "Healthy life expectancy (years)", width: 260 })
      );

    // Add a white sphere with a black border.
    svg
      .append("path")
      .datum({ type: "Sphere" })
      .attr("fill", "white")
      .attr("stroke", "currentColor")
      .attr("d", path);

    // Add a path for each country and color it according to this data.
    svg
      .append("g")
      .selectAll("path")
      .data(countries.features)
      .join("path")
      .attr("fill", (d) => color(valuemap.get(d.properties.name)))
      .attr("d", path)
      .append("title")
      .text((d) => `${d.properties.name}\n${valuemap.get(d.properties.name)}`);

    // Add a white mesh.
    svg
      .append("path")
      .datum(countrymesh)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("d", path);
  }, [worldData]);

  if (loading) {
    return (
      <div className="life-expectancy-loading">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 mb-4 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }
  return <div ref={chartRef} className="life-expectancy-container"></div>;
}

export default LifeExpectancy;
