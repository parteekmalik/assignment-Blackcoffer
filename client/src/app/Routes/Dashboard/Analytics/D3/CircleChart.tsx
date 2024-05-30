import * as React from "react";
import PieChart from "./PiGraph";
import TreedotIcon from "../../../../Layout/compoents/Aside/components/SVGs/TreedotIcon";
import * as d3 from "d3";
import { dataType } from "../../CRM/CRM";

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
    },[]);
    return (
        <div className=" h-full w-full">
            <div className="flex justify-between p-2">
                <div className="flex flex-col">
                    <span className="text-xl">{url}</span>
                    <span className="text-xl">{ChartData.length}</span>
                </div>
                <div className=" h-full  rounded-full hover:bg-hoverColor p-1">
                    <TreedotIcon size={40} />
                </div>
            </div>
            <div className="relative w-[calc(100%-2rem)] p-[2rem]">{formattedData.length && <PieChart formattedData={formattedData} />}</div>
            <div className="flex flex-wrap w-full flex-col-3 justify-between p-2">
                {ChartData.map((item) => {
                    return (
                        <div key={item.name} className="flex basis-1/2 justify-start items-center gap-1">
                            <div className="w-2 h-2 rounded-full " style={{ backgroundColor: item.color }}></div>
                            <span className="text-lightBlack min-w-[fit-content]" >{item.name}</span>
                        </div>
                    );
                })}
            </div>
            {/* {JSON.stringify(formattedData)} */}
            {/* <div className="absolute z-10 inset-0 flex items-center justify-center">
                <div className="bg-white w-[calc(100%-4rem)] h-[calc(100%-4rem)] rounded-full flex justify-center items-center">
                    <div className="flex gap-2 justify-center items-center">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hoverItem.color, color: hoverItem.color }}></div>
                        <span>{hoverItem.name}</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default CircleChart;
