import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "../styles/WorldCup.css"; // Import your CSS file for styling
import { use } from "react";

function WorldCup() {
  const [geoData, setGeoData] = React.useState(null);
  const [worldCupData, setWorldCupData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const chartRef = useRef(null);

  const width = 1200;
  const height = 650;

  useEffect(() => {
    // Clear any existing SVG before creating a new one
    setLoading(true);
    Promise.all([
      fetch(
        "https://raw.githubusercontent.com/asabahebwa/geo_mapping/master/src/world_countries.json"
      ),
      fetch(
        "https://raw.githubusercontent.com/asabahebwa/geo_mapping/master/src/world_cup_geo.json"
      ),
    ])
      .then((responses) => Promise.all(responses.map((resp) => resp.json())))
      .then(([geoData, worldCupData]) => {
        setGeoData(geoData);
        console.log("geoData  --->", geoData);
        console.log("cupData  --->", worldCupData);
        setWorldCupData(worldCupData);

        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!geoData || !worldCupData) return;

    d3.select(chartRef.current).selectAll("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    const projection = d3
      .geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.4]);

    const path = d3.geoPath().projection(projection);

    const map = svg
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "rgb(9, 157, 217)")
      .style("stroke", "black")
      .style("stroke-width", 0.5);

    // const nested = d3
    //   .nest()
    //   .key((d) => d.year)
    //   .rollup((leaves) => {
    //     const total = d3.sum(leaves, (d) => d.attendance);
    //     const coords = leaves.map((d) => projection([+d.long, +d.lat]));
    //     const center_x = d3.mean(coords, (d) => d[0]);
    //     const center_y = d3.mean(coords, (d) => d[1]);
    //     return {
    //       attendance: total,
    //       x: center_x,
    //       y: center_y,
    //     };
    //   })
    //   .entries(worldCupData);

    // const attendance_extent = d3.extent(nested, (d) => d.value["attendance"]);

    // const rScale = d3.scaleSqrt().domain(attendance_extent).range([0, 8]);
    // svg
    //   .append("g")
    //   .attr("class", "bubble")
    //   .selectAll("circle")
    //   .data(
    //     nested.sort(function (a, b) {
    //       return b.value["attendance"] - a.value["attendance"];
    //     })
    //   )
    //   .enter()
    //   .append("circle")
    //   .attr("fill", "rgb(247, 148, 42)")
    //   .attr("cx", (d) => d.value["x"])
    //   .attr("cy", (d) => d.value["y"])
    //   .attr("r", (d) => rScale(d.value["attendance"]))
    //   .attr("stroke", "black")
    //   .attr("stroke-width", 0.7)
    //   .attr("opacity", 0.7);
  }, [geoData, worldCupData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div ref={chartRef} className="worldcup-container"></div>;
}

export default WorldCup;
