import * as React from "react";
import * as d3 from "d3";

interface DataType {
    Country: string;
    Value: number;
}

const Barchart: React.FC = () => {
    // Set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const height = 400 - margin.top - margin.bottom;

    // Create a ref for the SVG container
    const svgRef = React.useRef<HTMLDivElement | null>(null);

    // Function to draw the chart
    const drawChart = (svgRef: React.MutableRefObject<HTMLDivElement | null>) => {
        if (!svgRef.current) return;

        // Clear previous SVG content
        d3.select(svgRef.current).selectAll("*").remove();

        // Get the width of the parent container
        const containerWidth = svgRef.current.getBoundingClientRect().width;
        const width = containerWidth - margin.left - margin.right;

        // Append the svg object to the ref element
        const svg = d3
            .select(svgRef.current)
            .append("svg")
            .attr("width", containerWidth)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Parse the Data
        d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then((data) => {
            if (!data) return;

            const formattedData = data.map((d) => ({
                Country: d.Country as string,
                Value: +d.Value!,
            })) as DataType[];

            // X axis
            const x = d3
                .scaleBand()
                .range([0, width])
                .domain(formattedData.map((d) => d.Country))
                .padding(0.2);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            // Add Y axis
            const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
            svg.append("g").call(d3.axisLeft(y));

            // Bars
            svg.selectAll("mybar")
                .data(formattedData)
                .enter()
                .append("rect")
                .attr("x", (d) => x(d.Country)!)
                .attr("y", (d) => y(d.Value))
                .attr("width", x.bandwidth())
                .attr("height", (d) => height - y(d.Value))
                .attr("class", "fill-main-purple");
        });
    };

    // Use React's useEffect to run D3 code after the component mounts
    React.useEffect(() => {
        drawChart(svgRef);

        const resizeFun = () => drawChart(svgRef);
        // Add event listener to handle window resize
        window.addEventListener("resize", resizeFun);

        // Cleanup function to remove the svg and event listener when the component unmounts
        return () => {
            d3.select(svgRef.current).selectAll("*").remove();
            window.removeEventListener("resize", resizeFun);
        };
    }, []);

    return <div ref={svgRef} style={{ width: "100%" }}></div>;
};

export default Barchart;
