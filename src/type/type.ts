export type TRequsetArgu = {
  RCPT_YR?: string; // 접수연도
  CGG_CD?: string; // 자치구코드
  CGG_NM?: string; // 자치구명
  STDG_CD?: string; // 법정동코드
  LOTNO_SE?: string; // 지번구분
  LOTNO_SE_NM?: string; // 지번구분명
  MNO?: string; // 본번
  SNO?: string; // 부번
  BLDG_NM?: string; //건물명
  CTRT_DAY?: string; // 계약일
  BLDG_USG?: string; // 건물용도
};
export const typelist = [
  "RCPT_YR",
  "CGG_CD",
  "CGG_MM",
  "STDG_CD",
  "LONTO_SE",
  "LONTO_SE_NM",
  "MNO",
  "SNO",
  "BLDG_NM",
  "CTRT_DAY",
  "BLDG_USG",
];

export type TResponseValues = {
  list_total_count?: string;
  RESULT: { CODE: string; MESSAGE: string };
  row: TResponseValue[];
};

export type TResponseValue = {
  RCPT_YR: string;
  CGG_CD: string;
  CGG_NM: string;
  STDG_NM: string;
  LOTNO_SE: string;
  LOTNO_SE_NM: string;
  MNO: string;
  SNO: string;
  BLDG_NM: string;
  CTRT_DAY: string;
  THING_AMT: string;
  ARCH_AREA: string;
  LAND_AREA: string;
  FLR: string;
  RGHT_SE: string;
  RTRCN_DAY: string;
  ARCH_YR: string;
  BLDG_USG: string;
  DCLR_SE: string;
  OPBIZ_RESTAGNT_SGG_NM: string;
};
