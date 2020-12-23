/*
 * @Author: ZhaoYue
 * @Date: 2020-12-19 20:28:54
 * @Description: 获取彩虹屁数据然后写入txt文件中
 * @LastEditTime: 2020-12-20 16:40:44
 * @LastEditors: Please set LastEditors
 * @FilePath: /copywritingData/caihongpi/caiHongPiTxt.js
 */

const https = require("https");
const chpUrl = "https://chp.shadiao.app/api.php";
const fs = require("fs");
const mysql = require("mysql");

// 从接口获取数据
function getCaiHongPiText() {
  https.get(chpUrl, (res, ds) => {
    let chunks = [];
    let size = 0;
    res.on("data", (trunk) => {
      chunks.push(trunk);
      size += trunk.length;
    });
    res.on("end", () => {
      const chunksText = chunks.toString() + '\n\n\n';
      console.log(chunksText);
      console.log(`size: ${size}`);
      fs.appendFile('caihongpi/caiHongPi.txt', chunksText, resp => {
        setTimeout(getCaiHongPiText, 10000)
      })
    });
  });
}

// getCaiHongPiText();