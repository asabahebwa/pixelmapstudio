import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "../styles/WorldCup.css"; // Import your CSS file for styling

function WorldCup() {
  const [geoData, setGeoData] = useState(null);
  const [worldCupData, setWorldCupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const chartRef = useRef(null);

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
        setWorldCupData(worldCupData);

        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (!geoData || !worldCupData) return;

    console.log(worldCupData);

    d3.select(chartRef.current).selectAll("svg").remove();

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

    d3.select(chartRef.current).selectAll("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add sphere with black border
    svg
      .append("path")
      .datum({ type: "Sphere" })
      .attr("fill", "#f8f9fa") // Light background color for oceans
      .attr("stroke", "#000") // Black border around the globe
      .attr("stroke-width", 1) // Border width
      .attr("d", path);

    svg
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "rgb(9, 157, 217)")
      .style("stroke", "black")
      .style("stroke-width", 0.5);

    const nested = Array.from(
      d3.rollup(
        worldCupData,
        (v) => ({
          attendance: d3.sum(v, (d) => +d.attendance),
          x: d3.mean(v, (d) => projection([+d.long, +d.lat])[0]),
          y: d3.mean(v, (d) => projection([+d.long, +d.lat])[1]),
          country: v[0].home,
        }),
        (d) => d.year
      ),
      ([key, value]) => ({ key, value })
    );

    console.log(nested);
    // Calculate the extent of attendance for scaling bubble sizes

    const attendance_extent = d3.extent(nested, (d) => d.value["attendance"]);

    const rScale = d3.scaleSqrt().domain(attendance_extent).range([0, 8]);

    // Draw bubbles
    svg
      .append("g")
      .attr("class", "bubble")
      .selectAll("circle")
      .data(
        nested.sort(function (a, b) {
          return b.value["attendance"] - a.value["attendance"];
        })
      )
      .enter()
      .append("circle")
      .attr("fill", "rgb(247, 148, 42)")
      .attr("cx", (d) => d.value["x"])
      .attr("cy", (d) => d.value["y"])
      .attr("r", (d) => rScale(d.value["attendance"]))
      .attr("stroke", "black")
      .attr("stroke-width", 0.7)
      .attr("opacity", 0.7)
      .append("title")
      .text((d) => {
        const formattedAttendance = d3.format(",")(d.value.attendance);
        return `${d.key} - ${d.value.country}\nAttendance: ${formattedAttendance}`;
      });
  }, [geoData, worldCupData]);

  if (loading) {
    return <div className="worldcup-loading">Loading...</div>;
  }
  if (error) {
    return (
      <div className="worldcup-error">
        Error loading data. Please try again later.
      </div>
    );
  }

  return <div ref={chartRef} className="worldcup-container"></div>;
}

export default WorldCup;
