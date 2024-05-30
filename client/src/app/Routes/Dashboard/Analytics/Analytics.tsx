import ModalDiv from "../../Components/Modal/ModalDiv";
import Barchart from "./D3/BarChart";
import CircleChart from "./D3/CircleChart";

function Analytics() {
    return (
        <div className="flex flex-col w-full  ">
            <div className="flex flex-wrap">
                {/* <ModalDiv className=" w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <Barchart></Barchart>
                </ModalDiv>
                <ModalDiv className=" w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <Barchart></Barchart>
                </ModalDiv> */}
                <ModalDiv className=" w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <CircleChart url={`country`}></CircleChart>
                </ModalDiv>
                <ModalDiv className=" w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <CircleChart url={`pestle`}></CircleChart>
                </ModalDiv>
                <ModalDiv className=" w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <CircleChart url={`sector`}></CircleChart>
                </ModalDiv>
                <ModalDiv className=" w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <CircleChart url={`topic`}></CircleChart>
                </ModalDiv>
                <ModalDiv className=" w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <CircleChart url={`region`}></CircleChart>
                </ModalDiv>
            </div>
        </div>
    );
}

export default Analytics;
