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
const CRM: React.FC<LayoutProps> = ({}) => {
  const location = useLocation();
  const [Data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div className="flex flex-wrap items-stretch ">
      {Data.slice(0, 50).map((item, index) => {
        return (
          <ModalDiv
            key={index}
            className="w-full mobile:basis-full tablet:basis-1/2 laptop:basis-1/2  desktop:basis-1/3 "
          >
            <div className="p-6 flex min-w-[270px] flex-col text-lightBlack hover:cursor-pointer h-full hover:bg-hoverColor  shadow-lg border rounded">
              <Modal item={item} />
            </div>
          </ModalDiv>
        );
      })}
    </div>
  );
};

export default CRM;
