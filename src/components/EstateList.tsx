import { TRequsetArgu, TResponseValue, TResponseValues } from "@/type/type";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { InView, useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./Spinner";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { create } from "zustand";
type Tstore = {
  row: TResponseValue[];
  addRow: (obj: TResponseValue) => void;
  initRow: () => void;
};
const useStore = create<Tstore>((set) => ({
  row: [],
  addRow: (obj) =>
    set((state) => ({
      row: [
        ...state.row,
        {
          ...obj,
          id: uuidv4(),
        },
      ],
    })),
  initRow: () => set((state) => ({ row: [] })),
}));
export default function EstateList({ argu }: { argu: TRequsetArgu }) {
  const { row, addRow, initRow } = useStore();
  const [datas, setDatas] = useState<TResponseValues>({
    RESULT: { CODE: "", MESSAGE: "" },
    row: [],
  });

  // const [row, setRow] = useState<TResponseValue[]>([]); // zustand로 대체
  const page_from = useRef(1);

  const { ref, inView, entry } = useInView();

  const getEstateList = (page_from: number) => {
    const res = fetch(
      `http://localhost:3000/api/realestate/${page_from.toString()}?RCPT_YR=${
        argu.RCPT_YR ? argu.RCPT_YR : ""
      }&CGG_CD=${argu.CGG_CD ? argu.CGG_CD : ""}&BLDG_NM=${
        argu.BLDG_NM ? argu.BLDG_NM : ""
      }&CTRT_DAY=${argu.CTRT_DAY ? argu.CTRT_DAY : ""}&BLDG_USG=${
        argu.BLDG_USG ? argu.BLDG_USG : ""
      }`,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }
    );
    res
      .then((data) => data.json())
      .then((data) => {
        if (typeof data.tbLnOpendataRtmsV !== "undefined") {
          data.tbLnOpendataRtmsV.row.map((obj: TResponseValue) => {
            addRow(obj);
          });
          setDatas(data.tbLnOpendataRtmsV);
        } else setDatas(data);
      });
  };

  useEffect(() => {
    page_from.current = 1;
    initRow();
    getEstateList(page_from.current);
  }, [argu]);

  useEffect(() => {
    if (inView) {
      page_from.current += 10;
      getEstateList(page_from.current);
    }
  }, [inView]);

  if (datas.RESULT.CODE !== "INFO-000") {
    return (
      <>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {datas.RESULT.CODE}
        </h1>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {datas.RESULT.MESSAGE}
        </h1>
      </>
    );
  } else
    return (
      <>
        <div className="p-6 bg-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            총 거래량: {datas.list_total_count}
          </h1>
          {row.map((data) => (
            <ul key={data.id} className="mb-4">
              <h1>{data.id}</h1>

              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {data.BLDG_NM}
                </h3>
                <div className="flex">
                  <label className="text-gray-600 ml-auto">
                    {format(
                      parse(data.CTRT_DAY, "yyyyMMdd", new Date()),
                      "yyyy-MM-dd"
                    )}
                  </label>
                </div>
                <p className="text-gray-600">가격: {data.THING_AMT}</p>
                <p className="text-gray-600">면적: {data.ARCH_AREA}</p>
              </div>
            </ul>
          ))}
        </div>
        <div ref={ref}>
          <Spinner />
        </div>
      </>
    );
}
