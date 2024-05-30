import { useState } from 'react';
import CloseSVG from '../Aside/components/SVGs/CloseSVG';
import SearchSVG from '../Aside/components/SVGs/SearchSVG';

function SearchModal() {
  const [value, setvalue] = useState('');
  return (
    <div className="h-[600px]">
      <div className="flex  ">
        <div className="flex p-[16px-16px-20px]">
          <SearchSVG />
          <input
            className=" grow focus:outline-none"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
          />
        </div>
        <div className="flex items-center ">
          <div className="h-[22px] mb-[2px] text-lightBlack opacity-[.4] text-[15px]">
            [esc]
          </div>
          <button className="">
            <CloseSVG></CloseSVG>
          </button>
        </div>
      </div>
      <div className="p-[48px]"></div>
    </div>
  );
}

export default SearchModal;
