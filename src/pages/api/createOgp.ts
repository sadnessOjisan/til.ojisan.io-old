import { createCanvas } from "canvas";

type QueryType = {
  title: string;
  bgColor1: string;
  bgColor2: string;
  textColor: string;
};

const isValidQuery = (data: any): data is QueryType => {
  if (typeof data.bgColor1 !== "string") return false;
  if (typeof data.bgColor2 !== "string") return false;
  if (typeof data.textColor !== "string") return false;
  return true;
};

export default (req, res) => {
  const query = req.query;
  if (!isValidQuery(query)) {
    console.error(query);
    throw new Error("invalid query");
  }
  const { title, textColor, bgColor1, bgColor2 } = query;
  const canvas = createCanvas(600, 300);
  const ctx = canvas.getContext("2d");

  // background
  ctx.beginPath();
  //線形グラデーションを指定する
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  console.error(bgColor1);
  //赤→緑→青となるように、グラデーション色を３つ追加する
  gradient.addColorStop(0.0, `#${bgColor1}`);
  gradient.addColorStop(1.0, `#${bgColor2}`);
  //上で指定したグラデーション内容を塗りつぶしスタイルに代入する
  ctx.fillStyle = gradient;
  //現在のパスを塗りつぶす
  ctx.fill();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Write "Awesome!"
  ctx.font = "30px Impact";
  ctx.fillStyle = `#${textColor}`;

  // Draw line under text)
  // Write "Awesome!"
  ctx.font = "30px Impact";
  ctx.fillText(title, 50, 100);

  const buf = canvas.toBuffer();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buf.length,
  });
  res.end(buf, "binary");
};
