import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModalDiv from '../../compoents/Modal/ModalDiv';
import Modal from './Item';

interface LayoutProps {}
export type dataType = {
  end_year: string;
  intensity: string;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string;
  impact: string;
  added: string;
  published: string;
  country: string;
  relevance: string;
  pestle: string;
  source: string;
  title: string;
  likelihood: string;
};
export type FilterDataType = Record<
  string,
  | string[]
  | {
      gte: number;
      lte: number;
    }
>;
const CRM: React.FC<LayoutProps> = ({}) => {
  const location = useLocation();
  const [isFiler, setisFilter] = useState(false);
  const [FilterData, setFilterData] = useState<FilterDataType | null>(null);
  const [Data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    loadMore(50);
  }, []);
  const loadMore = (len: number) => {
    fetch(
      'http://localhost:3000/api?skip=' +
        Data.length +
        '&take=' +
        len +
        (FilterData === null ? '&FilterData=true' : '&FilterData=false')
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: { data: dataType[]; FilterData?: FilterDataType }) => {
        setData((prev) => [...prev, ...data.data]);
        if (data.FilterData) setFilterData(data.FilterData);
      });
  };
  return (
    <div className="flex flex-wrap items-stretch ">
      <div className="basis-full  flex flex-col justify-end  text-white py-2">
        <span className="bg-main-purple self-end text-lg mr-[12px] hover:cursor-pointer py-2 px-4 rounded-lg ">
          Filter
        </span>
        <div className=""></div>
      </div>
      {Data.map((item, index) => {
        return (
          <ModalDiv
            key={index}
            className="w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2  desktop:basis-1/3 "
          >
            <div className="p-6 flex min-w-[270px] flex-col text-lightBlack  h-full   shadow-lg border rounded">
              <Modal item={item} />
            </div>
          </ModalDiv>
        );
      })}
      <div
        className="basis-full rounded-lg text-center bg-main-purple hover:cursor-pointer text-white py-2"
        onClick={() => loadMore(50)}
      >
        Load More
      </div>
    </div>
  );
};

export default CRM;
