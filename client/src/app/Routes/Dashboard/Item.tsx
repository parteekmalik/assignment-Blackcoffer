import React from 'react';
import { dataType } from './CRM';

interface ModalProps {
  item: dataType;
}

const Modal: React.FC<ModalProps> = ({ item }) => {
  return (
    <>
      <div className="flex justify-between  items-center mb-4">
        <h2 className="text-2xl font-bold">{item.title}</h2>
      </div>
      <div className="flex flex-col grow justify-between">
        <div>
          <h3 className="text-xl mb-[30px]">{item.insight}</h3>
        </div>
        {/* <p>
          <strong>Sector:</strong> {item.sector}
        </p>
        <p>
          <strong>Topic:</strong> {item.topic}
        </p>
        <p>
          <strong>Region:</strong> {item.region}
        </p>
        <p>
          <strong>Country:</strong> {item.country}
        </p>
        <p>
          <strong>Source:</strong> {item.source}
        </p>
        <p>
          <strong>Pestle:</strong> {item.pestle}
        </p>
        <p>
          <strong>Intensity:</strong> {item.intensity}
        </p>
        <p>
          <strong>Relevance:</strong> {item.relevance}
        </p>
        <p>
          <strong>Likelihood:</strong> {item.likelihood}
        </p>
        <p>
          <strong>Added:</strong> {item.added}
        </p>
        <p>
          <strong>Published:</strong> {item.published}
        </p> */}
        <button
          className=" mt-auto  hover:bg-hoverColor hover:text-main-purple border-1 shadow-sm  text-white bg-main-purple rounded-lg py-1"
          onClick={(e) => window.open(item.url, '_blank')}
        >
          Read Now
        </button>
      </div>
    </>
  );
};

export default Modal;
