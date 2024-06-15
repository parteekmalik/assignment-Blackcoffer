import * as d3 from "d3";
import * as React from "react";
import TreedotIcon from "../../../../Layout/compoents/Aside/components/SVGs/TreedotIcon";
import PieChart from "./PiGraph";
import { motion } from "framer-motion";

interface DataType {
    name: string;
    count: number;
}

const CircleChart = ({ url }: { url: string }) => {
    const [formattedData, setformattedData] = React.useState<DataType[]>([]);
    const ChartData = React.useMemo(() => {
        return formattedData.map((d, i) => ({
            name: d.name,
            color: d3.schemeCategory10[i % 10],
        }));
    }, [formattedData]);
    React.useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/Analytics/Filter/` + url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data: DataType[]) => {
                setformattedData(data.slice(0, 10));
            });
    }, []);
    return (
        <motion.div className=" h-full w-full flex flex-col justify-center items-center">
            <motion.div className="flex w-full justify-between p-2">
                <motion.div className="flex flex-col">
                    <span className="text-xl">{url}</span>
                    <span className="text-xl">{ChartData.length}</span>
                </motion.div>
                <motion.div className=" h-full  rounded-full hover:bg-hoverColor p-1">
                    <TreedotIcon size={40} />
                </motion.div>
            </motion.div>
            <motion.div className="relative w-[calc(100%-2rem)] p-[2rem] ">{formattedData.length && <PieChart formattedData={formattedData} />}</motion.div>
            <motion.div className="flex flex-wrap w-full flex-col-3 justify-between p-2">
                {ChartData.map((item) => {
                    return (
                        <motion.div key={item.name} className="flex basis-1/2 justify-start items-center gap-1">
                            <motion.div className="w-2 h-2 rounded-full " style={{ backgroundColor: item.color }}></motion.div>
                            <span className="text-lightBlack min-w-[fit-content]">{item.name}</span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default CircleChart;
