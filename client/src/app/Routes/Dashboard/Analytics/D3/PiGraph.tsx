import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

interface DataType {
    name: string;
    count: number;
}

const PieChart = ({ formattedData: data }: { formattedData: DataType[] }) => {
    const [hoverItem, setHoverItem] = useState<{
        name: string;
        color: string;
    }>({
        name: "",
        color: "",
    });

    const svgRef = useRef<HTMLDivElement | null>(null);

    const drawChart = (svgContainer: HTMLDivElement) => {
        d3.select(svgContainer).selectAll("*").remove();

        const containerWidth = svgContainer.getBoundingClientRect().width;
        const containerHeight = containerWidth;
        const radius = containerWidth / 2;

        const svg = d3.select(svgContainer).append("svg").attr("width", containerWidth).attr("height", containerHeight).append("g").attr("transform", `translate(${radius}, ${radius})`);

        const hoverText = svg.append("text").attr("text-anchor", "middle").attr("dy", ".35em").style("font-size", "1.5em").style("fill", "#000");

        if (!Array.isArray(data)) return;

        const formattedData = data.map((d) => ({
            name: d.name,
            count: +d.count,
        })) as DataType[];

        const maxItem = formattedData.reduce((prev, current) => (prev.count > current.count ? prev : current));
        setHoverItem({
            name: maxItem.name,
            color: d3.schemeCategory10[formattedData.findIndex((item) => item.name === maxItem.name)],
        });

        hoverText.text(maxItem.name).style("fill", d3.schemeCategory10[formattedData.findIndex((item) => item.name === maxItem.name)]);

        const pie = d3.pie<DataType>().value((d) => d.count);

        const arc = d3
            .arc<d3.PieArcDatum<DataType>>()
            .innerRadius(radius * 0.8)
            .outerRadius(radius);

        svg.selectAll("path")
            .data(pie(formattedData))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .on("mouseover", function (event, d) {
                d3.select(this).transition().duration(200).style("opacity", 0.7);
                setHoverItem({
                    name: d.data.name,
                    color: d3.select(this).attr("fill")!,
                });
                hoverText.text(d.data.name).style("fill", d3.select(this).attr("fill")!);
            })
            .on("mouseout", function () {
                d3.select(this).transition().duration(200).style("opacity", 1);
                setHoverItem({
                    name: maxItem.name,
                    color: d3.schemeCategory10[formattedData.findIndex((item) => item.name === maxItem.name)],
                });
                hoverText.text(maxItem.name).style("fill", d3.schemeCategory10[formattedData.findIndex((item) => item.name === maxItem.name)]);
            });
    };

    useEffect(() => {
        if (svgRef.current) {
            drawChart(svgRef.current);

            const resizeFun = () => {
                if (svgRef.current) drawChart(svgRef.current);
            };
            window.addEventListener("resize", resizeFun);

            return () => {
                d3.select(svgRef.current).selectAll("*").remove();
                window.removeEventListener("resize", resizeFun);
            };
        }
    }, []);
    return (
        <motion.div  className="flex justify-center items-center" ref={svgRef} style={{ width: "100%", height: "100%" }}>
        </motion.div>
    );
};

export default PieChart;
