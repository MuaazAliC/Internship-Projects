  
  const countries = [
      { name: "China", population: 1412600000, coords: [104.1954, 35.8617] },
      { name: "India", population: 1366000000, coords: [78.9629, 20.5937] },
      { name: "USA", population: 331900000, coords: [-95.7129, 37.0902] },
      { name: "Indonesia", population: 273800000, coords: [113.9213, -0.7893] },
      { name: "Pakistan", population: 231400000, coords: [69.3451, 30.3753] },
      { name: "Nigeria", population: 223800000, coords: [8.6753, 9.0820] },
      { name: "Brazil", population: 214300000, coords: [-51.9253, -14.2350] },
      { name: "Bangladesh", population: 170000000, coords: [90.3563, 23.6850] },
      { name: "Russia", population: 145500000, coords: [105.3188, 61.5240] },
      { name: "Mexico", population: 126000000, coords: [-102.5528, 23.6345] }
    ];

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const formatPop = d3.format(",.0f");

    const svgBar = d3.select("#barChart");
    const barWidth = +svgBar.attr("width");
    const barHeight = +svgBar.attr("height");
    const margin = { top: 20, right: 20, bottom: 30, left: 100 };
    const width = barWidth - margin.left - margin.right;
    const height = barHeight - margin.top - margin.bottom;

    const gBar = svgBar.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleBand()
      .domain(countries.map(d => d.name))
      .range([0, height])
      .padding(0.2);

    const x = d3.scaleLinear()
      .domain([0, d3.max(countries, d => d.population)])
      .range([0, width]);

    gBar.append("g")
      .call(d3.axisLeft(y));

    gBar.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(".2s")));

    gBar.selectAll(".bar")
      .data(countries)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", d => y(d.name))
      .attr("width", d => x(d.population))
      .attr("height", y.bandwidth())
      .attr("fill", (d, i) => color(i));

    gBar.selectAll(".label")
      .data(countries)
      .enter()
      .append("text")
      .attr("x", d => x(d.population) - 50)
      .attr("y", d => y(d.name) + y.bandwidth() / 1.7)
      .attr("fill", "white")
      .text(d => formatPop(d.population));

  
    const svgMap = d3.select("#map");
    const mapWidth = +svgMap.attr("width");
    const mapHeight = +svgMap.attr("height");

    const projection = d3.geoMercator()
      .scale(95)
      .translate([mapWidth / 2, mapHeight / 1.5]);

    const path = d3.geoPath().projection(projection);

    const popScale = d3.scaleSqrt()
      .domain([0, d3.max(countries, d => d.population)])
      .range([5, 25]);

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(world => {
      const countriesGeo = topojson.feature(world, world.objects.countries);

      svgMap.append("g")
        .selectAll("path")
        .data(countriesGeo.features)
        .enter()
        .append("path")
        .attr("fill", "#333")
        .attr("stroke", "#666")
        .attr("d", path);

      svgMap.selectAll("circle")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", d => projection(d.coords)[0])
        .attr("cy", d => projection(d.coords)[1])
        .attr("r", d => popScale(d.population))
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .append("title")
        .text(d => `${d.name}\nPopulation: ${formatPop(d.population)}`);
    });
