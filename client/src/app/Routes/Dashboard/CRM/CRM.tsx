import React, { Suspense, useEffect, useState } from "react";
import Filter from "./Filter";
import Modal from "./Item";
import ModalDiv from "../../../compoents/Modal/ModalDiv";
import { useLocation } from "react-router-dom";

interface LayoutProps {}
export type dataType = {
    id: string;
    sector: string | null;
    topic: string | null;
    insight: string;
    url: string;
    region: string | null;
    added: string | null;
    published: string | null;
    country: string | null;
    pestle: string | null;
    source: string | null;
    title: string;
    end_year: number | null;
    intensity: number | null;
    start_year: number | null;
    impact: number | null;
    relevance: number | null;
    likelihood: number | null;
};
export type DataType = { list: dataType[]; Filter: string };
export type FilterDataType = Record<
    string,
    | string[]
    | {
          gte: number;
          lte: number;
      }
>;

const CRM: React.FC<LayoutProps> = ({}) => {
    const [FilterData, setFilterData] = useState<FilterDataType | null>(null);
    const [Data, setData] = useState<DataType>({ Filter: "", list: [] });
    const [isFilter, setIsFilter] = useState(false);
    const location = useLocation();

    useEffect(() => {
        loadMore("&" + location.search.slice(1, location.search.length));
    }, [location]);

    const loadMore = (Filter?: string) => {
        const url = import.meta.env.VITE_BACKEND_URL + "/api/Filter?skip=" + (Filter ? 0 : Data.list.length) + "&take=" + 50 + (Filter ?? Data.Filter) + (FilterData === null ? "&FilterData=true" : "&FilterData=false");
        console.log(url);
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data: { data: dataType[]; FilterData?: FilterDataType }) => {
                if (!Filter)
                    setData((prev) => {
                        return { ...prev, list: [...prev.list, ...data.data] };
                    });
                else
                    setData((prev) => {
                        return { Filter: Filter ?? prev.Filter, list: data.data };
                    });
                if (data.FilterData) setFilterData(data.FilterData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    useEffect(() => {
        console.log(Data);
    }, [Data]);

    return (
        <div className="flex flex-col w-full  ">
            <div className=" gap-4 flex flex-col justify-end  py-2">
                <span onClick={() => setIsFilter((prev) => !prev)} className="bg-main-purple text-white self-end text-lg hover:cursor-pointer py-2 px-4 rounded-lg">
                    Filter
                </span>
                {/* {JSON.stringify(FilterData)} */}
                {FilterData && isFilter && <Filter setIsFilter={setIsFilter} loadMore={loadMore} FilterData={FilterData} />}
            </div>
            <div className="flex flex-wrap items-stretch ">
                {Data.list.length ? (
                    Data.list.map((item, index) => (
                        <ModalDiv key={index} className="w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                            <div className="p-6 flex min-w-[270px] flex-col text-lightBlack h-full shadow-lg hover:scale-110 hover:relative bg-white border rounded">
                                <Modal item={item} />
                            </div>
                        </ModalDiv>
                    ))
                ) : (
                    <ModalDiv className="w-full basis-full ">
                        <div className="p-6 flex min-w-[270px] flex-col text-lightBlack h-full shadow-lg border rounded text-center">No Results Found</div>
                    </ModalDiv>
                )}
            </div>
            <div className=" rounded-lg text-center bg-main-purple hover:cursor-pointer text-white py-2" onClick={() => loadMore()}>
                Load More
            </div>
        </div>
    );
};

export default CRM;
