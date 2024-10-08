import { TRequsetArgu, TResponseValue, TResponseValues } from "@/type/type";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { InView, useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./Spinner";
export default function EstateList({ argu }: { argu: TRequsetArgu }) {
  const [datas, setDatas] = useState<TResponseValues>({
    RESULT: { CODE: "", MESSAGE: "" },
    row: [],
  });
  const [row, setRow] = useState<TResponseValue[]>([]);
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
    // const { tbLnOpendataRtmsV: data } = await res.json();
    res
      .then((data) => data.json())
      .then((data) => {
        if (typeof data.tbLnOpendataRtmsV !== "undefined") {
          setDatas(data.tbLnOpendataRtmsV);
          setRow((prev) => [...prev, ...data.tbLnOpendataRtmsV.row]);
        } else setDatas(data);
      });
  };

  useEffect(() => {
    page_from.current = 1;
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
            <ul key={uuidv4()} className="mb-4">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  건물명: {data.BLDG_NM}
                </h3>
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
