import { NextRequest } from "next/server";
import { typelist } from "@/type/type";
export async function GET(
  request: NextRequest,
  { params }: { params: { page_number: string } }
) {
  try {
    let argu = [];
    const page_from = Number(params.page_number);
    const page_to = page_from + 9;
    console.log(params.page_number, page_from, page_to);
    const searchParams = request.nextUrl.searchParams;

    for (let i = 0; i < typelist.length; i++) {
      const str = searchParams.get(typelist[i]);
      if (str === "" || str === null) argu.push(" ");
      else argu.push(str);
    }

    const res = await fetch(
      `http://openapi.seoul.go.kr:8088/${
        process.env.BDS_API_KEY
      }/json/tbLnOpendataRtmsV/${page_from.toString()}/${page_to.toString()}/${
        argu[0]
      }/${argu[1]}/${argu[2]}/${argu[3]}/${argu[4]}/${argu[5]}/${argu[6]}/${
        argu[7]
      }/${argu[8]}/${argu[9]}/${argu[10]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(
      `http://openapi.seoul.go.kr:8088/${
        process.env.BDS_API_KEY
      }/json/tbLnOpendataRtmsV/${page_from.toString()}/${page_to.toString()}/${
        argu[0]
      }/${argu[1]}/${argu[2]}/${argu[3]}/${argu[4]}/${argu[5]}/${argu[6]}/${
        argu[7]
      }/${argu[8]}/${argu[9]}/${argu[10]}`
    );

    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    return Response.json({
      message: "데이터를 불러오는데 에러가 발생하였습니다.",
      status: false,
    });
  }
}
