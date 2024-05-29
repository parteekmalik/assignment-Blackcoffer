import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { FilterDataType } from "./CRM";

const convertToState = (filterData: FilterDataType, location: Location<any>) => {
    const params = new URLSearchParams(location.search);
    const newData: {
        [key: string]:
            | { list: string[]; isNullIncluded: boolean }
            | {
                  isNullIncluded: boolean;
                  gte: number;
                  lte: number;
              };
    } = {};
    console.log(params.has("sector"));
    Object.keys(filterData).forEach((key) => {
        const item = filterData[key];
        newData[key] = Array.isArray(item)
            ? params.has(key)
                ? { isNullIncluded: true, list: JSON.parse(params.get(key) ?? "") as string[] }
                : { isNullIncluded: true, list: [] }
            : params.has(key)
            ? (JSON.parse(params.get(key) ?? "") as {
                  isNullIncluded: boolean;
                  gte: number;
                  lte: number;
              })
            : {
                  gte: item.gte,
                  lte: item.lte,
                  isNullIncluded: false,
              };
    });
    return newData;
};

type Inputs = ReturnType<typeof convertToState>;
function Filter({ FilterData, setIsFilter, loadMore }: { loadMore: (Filter?: string) => void; setIsFilter: React.Dispatch<React.SetStateAction<boolean>>; FilterData: FilterDataType }) {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: convertToState(FilterData, location),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const queryParams = new URLSearchParams();

        Object.keys(data).forEach((key) => {
            const item = data[key];
            if (Array.isArray(item)) {
                if (item.length) queryParams.append(key, JSON.stringify(item));
            } else {
                queryParams.append(key, JSON.stringify(item));
            }
        });
        navigate({
            pathname: "",
            search: queryParams.toString(),
        });
        loadMore("&" + queryParams.toString());
        setIsFilter(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"shadow-lg border-2 rounded-lg p-4 text-black flex flex-col "}>
            <div className="grid-rows-10 grid gap-2 grid-cols-4 px-4">
                {Object.keys(FilterData).map((key) => {
                    const item = FilterData[key]; // Access the value associated with the key
                    return (
                        <React.Fragment key={key}>
                            <div className="p-2 flex items-center">
                                <span className="text-lg font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            </div>
                            <div className="m-1 p-2 col-span-3">
                                {"list" in watch()[key] && Array.isArray(item) ? (
                                    <div className="overflow-hidden overflow-x-scroll flex" style={{ scrollbarWidth: "thin" }}>
                                        <span
                                            className={"min-w-[fit-content] hover:cursor-pointer rounded-lg py-2 px-4 font-semibold " + (!(watch()[key] as { list: string[]; isNullIncluded: boolean }).list.length ? "bg-main-purple text-white" : "")}
                                            onClick={() => {
                                                const newState = watch();
                                                newState[key] = { isNullIncluded: true, list: [] };
                                                reset({ ...newState });
                                            }}
                                        >
                                            All
                                        </span>
                                        <span
                                            className={"min-w-[fit-content] hover:cursor-pointer rounded-lg py-2 px-4 font-semibold " + (!(watch()[key] as { list: string[]; isNullIncluded: boolean }).list.length ? "bg-main-purple text-white" : "")}
                                            onClick={() => {
                                                const newState = watch();
                                                newState[key].isNullIncluded = !newState[key].isNullIncluded;

                                                reset({ ...newState });
                                            }}
                                        >
                                            unknown
                                        </span>
                                        {item.map((option) => (
                                            <span
                                                onClick={() => {
                                                    const newState = watch();
                                                    if ((newState[key] as { list: string[]; isNullIncluded: boolean }).list.includes(option))
                                                        (newState[key] as { list: string[]; isNullIncluded: boolean }).list = (newState[key] as { list: string[]; isNullIncluded: boolean }).list.filter((i) => i !== option);
                                                    else (newState[key] as { list: string[]; isNullIncluded: boolean }).list.push(option);
                                                    reset({ ...newState });
                                                }}
                                                key={option}
                                                className={"min-w-[fit-content] hover:cursor-pointer ml-1 rounded-lg py-2 px-4 font-semibold " + ((watch()[key] as { list: string[]; isNullIncluded: boolean }).list.includes(option) ? "bg-main-purple text-white" : "")}
                                            >
                                                {option}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {/* {JSON.stringify({ ...register(`${key}.lte` as const) })} */}
                                        <input className="border-2 p-1 w-20 border-black" type="number" {...register(`${key}.lte` as const)} step={1} min={(item as { gte: number; lte: number }).lte} max={(watch()[key] as { isNullIncluded: boolean; gte: number; lte: number }).gte} />
                                        <input className="border-2 p-1 w-20 border-black" type="number" {...register(`${key}.gte` as const)} step={1} min={(watch()[key] as { isNullIncluded: boolean; gte: number; lte: number }).lte} max={(item as { gte: number; lte: number }).gte} />
                                        <div>
                                            <input type="checkbox" {...register(`${key}.isNullIncluded` as const)} className="border-4" />
                                            <span> Does include unknown</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
            <div className="self-end flex">
                <span
                    onClick={() => {
                        setIsFilter(false);
                    }}
                    className="bg-hoverColor text-main-purple text-lg mr-[12px] hover:cursor-pointer py-2 px-4 rounded-lg"
                >
                    Cancel
                </span>
                <button type="submit" className="bg-main-purple text-white text-lg mr-[12px] hover:cursor-pointer py-2 px-4 rounded-lg">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default Filter;
