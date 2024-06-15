import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ModalDiv from "../../Components/Modal/ModalDiv";
import Filter from "./Filter";
import Modal from "./Item";

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
                <AnimatePresence>
                    {FilterData && isFilter && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }}>
                            <Filter setIsFilter={setIsFilter} loadMore={loadMore} FilterData={FilterData} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex flex-wrap items-stretch ">
                {Data.list.length ? (
                    Data.list.map((item, index) => (
                        <motion.div whileHover={{ scale: 1.1 }} className="w-full hover:scale-110 hover:relative mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3">
                            <ModalDiv key={index}>
                                <Modal item={item} />
                            </ModalDiv>
                        </motion.div>
                    ))
                ) : (
                    <div className="w-full  basis-full ">
                        <div className=" text-center">No Results Found</div>
                    </div>
                )}
            </div>
            <div className=" rounded-lg text-center bg-main-purple hover:cursor-pointer text-white py-2" onClick={() => loadMore()}>
                Load More
            </div>
        </div>
    );
};

export default CRM;
