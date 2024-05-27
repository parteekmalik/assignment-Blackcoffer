import React, { useEffect, useState } from 'react';
import { FilterDataType } from './CRM';

const convertToState = (filterData: FilterDataType) => {
  const newData: {
    [key: string]:
      | { options: string[]; isSelected: string[] }
      | {
          isNullIncluded: boolean;
          option: {
            gte: number;
            lte: number;
          };
          state: {
            gte: number;
            lte: number;
          };
        };
  } = {};
  Object.keys(filterData).forEach((key) => {
    const item = filterData[key];
    newData[key] = Array.isArray(item)
      ? { options: item, isSelected: [] }
      : {
          option: item,
          state: { gte: item.gte, lte: item.lte },
          isNullIncluded: false,
        };
  });
  return newData;
};

function Filter({ FilterData }: { FilterData: FilterDataType }) {
  const [isFiler, setisFilter] = useState(false);

  const [FilterState, setFilterState] = useState(convertToState(FilterData));

  useEffect(() => {
    setFilterState(convertToState(FilterData));
  }, [FilterData, isFiler]);
  const submitFilter = () => {
    setisFilter(false);
  };
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;
    const scrollLeft = item.scrollLeft; // Save current horizontal scroll position
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    item.scrollLeft = scrollLeft; // Restore horizontal scroll position after scrolling
  };

  return (
    <div className="basis-full gap-4 flex flex-col   justify-end  text-white py-2">
      <span
        onClick={() => setisFilter((prev) => !prev)}
        className="bg-main-purple self-end text-lg  hover:cursor-pointer py-2 px-4 rounded-lg "
      >
        Filter
      </span>
      <div
        className={
          ' shadow-lg border-2 rounded-lg p-4  text-black flex flex-col  ' +
          (isFiler ? ' ' : 'hidden')
        }
      >
        <div className="grid-rows-10 grid gap-2 grid-cols-4 px-4">
          {Object.keys(FilterState).map((key) => {
            const item = FilterState![key]; // Access the value associated with the key
            return (
              <>
                <div className="p-2 flex  items-center">
                  <span className="text-lg font-semibold ">
                    {key.slice(0, 1)[0].toUpperCase() +
                      key.slice(1, key.length)}
                  </span>
                </div>
                <div key={key} className="m-1 p-2 col-span-3">
                  {'options' in item ? (
                    <div
                      className="overflow-hidden overflow-x-scroll flex"
                      style={{ scrollbarWidth: 'thin' }}
                      onMouseEnter={handleMouseEnter}
                    >
                      <span
                        className={
                          'min-w-[fit-content] hover:cursor-pointer  rounded-lg  py-2 px-4  font-semibold ' +
                          (!item.isSelected.length
                            ? 'bg-main-purple text-white '
                            : ' ')
                        }
                        onClick={() =>
                          setFilterState((prev) => {
                            const newdata = prev[key];
                            if ('options' in newdata) {
                              newdata.isSelected = [];
                            }

                            return { ...prev };
                          })
                        }
                      >
                        All
                      </span>
                      {item.options.map((option) => {
                        return (
                          <span
                            className={
                              ' min-w-[fit-content] hover:cursor-pointer ml-1  rounded-lg  py-2 px-4  font-semibold ' +
                              (item.isSelected.includes(option)
                                ? 'bg-main-purple text-white '
                                : ' ')
                            }
                            onClick={() =>
                              setFilterState((prev) => {
                                const newdata = prev[key]!;
                                if ('options' in newdata) {
                                  if (newdata.isSelected.includes(option))
                                    newdata.isSelected =
                                      newdata.isSelected.filter(
                                        (i) => i !== option
                                      );
                                  else newdata.isSelected.push(option);
                                }

                                return { ...prev };
                              })
                            }
                          >
                            {option}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* onchange hadle */}
                      <input
                        className="border-2 p-1 w-20 border-black"
                        type="number"
                        step={1}
                        value={item.state.lte}
                        onChange={(e) => {
                          setFilterState((prev) => {
                            const newdata = prev[key]!;
                            if ('option' in newdata) {
                              newdata.state.lte = Number(e.target.value);
                            }
                            return { ...prev };
                          });
                        }}
                        min={item.option.lte}
                        max={item.state.gte}
                      ></input>
                      <input
                        className="border-2 p-1 w-20 border-black"
                        type="number"
                        step={1}
                        value={item.state.gte}
                        onChange={(e) => {
                          setFilterState((prev) => {
                            const newdata = prev[key]!;
                            if ('option' in newdata) {
                              newdata.state.gte = Number(e.target.value);
                            }
                            return { ...prev };
                          });
                        }}
                        min={item.state.lte}
                        max={item.option.gte}
                      ></input>
                      <div>
                        <input type="checkbox" className="border-4"></input>
                        <span> Does include unknown</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })}
        </div>
        <div className="self-end  flex">
          <span
            onClick={() => submitFilter()}
            className="bg-hoverColor text-main-purple  text-lg mr-[12px] hover:cursor-pointer py-2 px-4 rounded-lg "
          >
            Cancel
          </span>
          <span
            onClick={() => submitFilter()}
            className="bg-main-purple text-white text-lg mr-[12px] hover:cursor-pointer py-2 px-4 rounded-lg "
          >
            Submit
          </span>
        </div>
      </div>
    </div>
  );
}

export default Filter;
