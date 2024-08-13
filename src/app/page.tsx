"use client";
import EstateList from "@/components/EstateList";
import { TRequsetArgu, TResponseValues } from "@/type/type";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [isSubmit, setIssubmit] = useState(false);
  const [argu, setArgu] = useState<TRequsetArgu>({});
  const [submitargu, setSubmitargu] = useState<TRequsetArgu>({});

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setArgu({
      ...argu,
      [e.target.name]: e.target.value,
    });
    console.log(argu);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (argu.CTRT_DAY != undefined) {
      const date = argu.CTRT_DAY;
      argu.CTRT_DAY = `${date.substring(0, 4)}${date.substring(
        5,
        7
      )}${date.substring(8, 10)}`;
    }
    console.log(argu);
    setSubmitargu(argu);
    setIssubmit(true);
    setArgu({});
  };

  return (
    <>
      <header className="fixed justify-start w-[300px] bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          서울시 부동산 실거래가 조회하기
        </h1>
        <div>
          <form action="" onSubmit={onSubmitHandler} className="space-y-2">
            <div className="space-y-1">
              <label className="inline-block text-gray-700">연도:</label>
              <div className="flex justify-between align-middle">
                <select
                  name="RCPT_YR"
                  value={argu.RCPT_YR ? argu.RCPT_YR : ""}
                  onChange={handleChange}
                  className="block rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-500"
                >
                  <option value="">전체</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
                <input
                  name="RCPT_YR"
                  type="text"
                  placeholder="연도를 입력하세요"
                  value={argu.RCPT_YR ? argu.RCPT_YR : ""}
                  onChange={handleChange}
                  className="block rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-500"
                ></input>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">자치구:</label>
              <select
                id="자치구코드"
                name="CGG_CD"
                value={argu.CGG_CD ? argu.CGG_CD : ""}
                onChange={handleChange}
                className="block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-500"
              >
                <option value="">전체</option>
                <option value="11680">강남구</option>
                <option value="11740">강동구</option>
                <option value="11305">강북구</option>
                <option value="11500">강서구</option>
                <option value="11620">관악구</option>
                <option value="11215">광진구</option>
                <option value="11530">구로구</option>
                <option value="11545">금천구</option>
                <option value="11350">노원구</option>
                <option value="11320">도봉구</option>
                <option value="11230">동대문구</option>
                <option value="11590">동작구</option>
                <option value="11440">마포구</option>
                <option value="11410">서대문구</option>
                <option value="11650">서초구</option>
                <option value="11200">성동구</option>
                <option value="11290">성북구</option>
                <option value="11710">송파구</option>
                <option value="11470">양천구</option>
                <option value="11560">영등포구</option>
                <option value="11170">용산구</option>
                <option value="11380">은평구</option>
                <option value="11110">종로구</option>
                <option value="11140">중구</option>
                <option value="11260">중랑구</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">건물명:</label>
              <input
                type="text"
                name="BLDG_NM"
                value={argu.BLDG_NM ? argu.BLDG_NM : ""}
                onChange={handleChange}
                className="block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-500"
              ></input>
            </div>
            <div>
              <label className="block text-gray-700">계약일:</label>
              <input
                name="CTRT_DAY"
                type="date"
                value={argu.CTRT_DAY ? argu.CTRT_DAY : ""}
                onChange={handleChange}
                className="block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-500"
              ></input>
            </div>
            <div>
              <label className="block text-gray-700">건물용도:</label>
              <select
                name="BLDG_USG"
                onChange={handleChange}
                value={argu.BLDG_USG ? argu.BLDG_USG : ""}
                className="block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-500"
              >
                <option value="">전체</option>
                <option value="아파트">아파트</option>
                <option value="단독다가구">단독다가구</option>
                <option value="연립다세대">연립다세대</option>
                <option value="오피스텔">오피스텔</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              검색
            </button>
          </form>
        </div>
      </header>
      <body>
        <div className="ml-[300px]">
          {isSubmit && <EstateList argu={submitargu} />}
        </div>
      </body>
    </>
  );
}
