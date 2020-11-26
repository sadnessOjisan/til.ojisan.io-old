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
  gradient.addColorStop(0.0, `#${bgColor1}`);
  gradient.addColorStop(1.0, `#${bgColor2}`);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Write "Awesome!"
  ctx.font = "32px Impact";
  ctx.fillStyle = `#${textColor}`;
  // Draw line under text)
  const textWidth = ctx.measureText(title).width;
  ctx.fillText(title, (600 - textWidth) / 2, 100);

  ctx.font = "24px Impact";
  const nameWidth = ctx.measureText("@sadnessOjsian").width;
  ctx.fillStyle = `white`;
  ctx.fillText("@sadnessOjsian", (600 - nameWidth) / 2, 230);

  ctx.font = "20px Impact";
  const siteTitleWidth = ctx.measureText("til.ojisan.io").width;
  ctx.fillStyle = `white`;
  ctx.fillText("til.ojisan.io", 600 - 40 - siteTitleWidth, 280);

  const buf = canvas.toBuffer();
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buf.length,
  });
  res.end(buf, "binary");
};
