import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ModalDiv from "../../Components/Modal/ModalDiv";
import CircleChart from "./D3/CircleChart";

const charts = ["country", "pestle", "sector", "topic", "region"];

function Analytics() {
    const [selectedId, setSelectedId] = useState<null | { name: string; data: any }>(null);
    const [isannimating, setisannimating] = useState(false);

    return (
        <div className="flex flex-col w-full  ">
            <div className="flex flex-wrap relative">
                {charts.map((item) => {
                    return (
                        <motion.div
                            id={item}
                            key={item}
                            onClick={(e) => {
                                setSelectedId({ name: item, data: e.currentTarget.getBoundingClientRect() });
                                setisannimating(true);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1 }}
                            className={`p-[12px]   w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2 desktop:basis-1/3 ` + (item === selectedId?.name ? " opacity-0 " : " ")}
                        >
                            <ModalDiv>
                                <CircleChart url={item}></CircleChart>
                                {selectedId && <motion.button onClick={() => setSelectedId(null)}></motion.button>}
                            </ModalDiv>
                        </motion.div>
                    );
                })}
                <AnimatePresence onExitComplete={() => setSelectedId(null)}>
                    {isannimating && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.3, delay: 0.15 }} style={{ pointerEvents: "auto" }} className="z-40 fixed  w-screen bg-black h-screen top-0 left-0 overlay">
                                <div className=" fixed w-screen top-0 left-0  h-screen" onClick={() => setisannimating(false)} />
                            </motion.div>
                            <motion.div
                                initial={{ left: selectedId!.data.left, top: selectedId!.data.top, height: selectedId!.data.height, width: selectedId!.data.width }}
                                exit={{ transform: "translate(0,0)", left: selectedId!.data.left, top: selectedId!.data.top, height: selectedId!.data.height, width: selectedId!.data.width }}
                                animate={{ top: "50%", left: "50%", height: selectedId!.data.height, width: "60vw", transform: "translate(-50%, -50%)" }}
                                className=" open p-[12px] fixed max-w-[1000px] z-50 "
                                transition={{ duration: 0.5 }}
                                layout
                            >
                                <ModalDiv>
                                    <CircleChart url={selectedId!.name}></CircleChart>
                                </ModalDiv>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Analytics;
