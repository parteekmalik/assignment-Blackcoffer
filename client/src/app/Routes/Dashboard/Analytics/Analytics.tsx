import React from "react";
import Barchart from "./BarChart";
import ModalDiv from "../../../compoents/Modal/ModalDiv";
import Modal from "../CRM/Item";

function Analytics() {
    return (
        <div className="flex flex-col w-full  ">
            <div className="flex flex-wrap">
                <ModalDiv className="grow w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <Barchart></Barchart>
                </ModalDiv>
                <ModalDiv className="grow w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <Barchart></Barchart>
                </ModalDiv>
                <ModalDiv className="grow w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                    <Barchart></Barchart>
                </ModalDiv>
            </div>
        </div>
    );
}

export default Analytics;
