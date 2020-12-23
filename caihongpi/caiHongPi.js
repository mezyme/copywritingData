/*
 * @Author: ZhaoYue
 * @Date: 2020-12-19 20:28:54
 * @Description: 获取彩虹屁数据然后写入txt文件中
 * @LastEditTime: 2020-12-21 17:19:31
 * @LastEditors: Please set LastEditors
 * @FilePath: /copywritingData/caihongpi/caiHongPi.js
 */

const https = require("https");
const chpUrl = "https://chp.shadiao.app/api.php";
const fs = require("fs");
const mysql = require("mysql");
const moment = require('moment');
const utils = require('../libs/utils.js');

// 一共要存储条数
const total = 3000;
// 当前存储条数
let done = 0;
// 每几秒取一次数据
const timeSet = 5000;

// 连接数据库库
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "860926Yue",
  database: "caihongpi",
  charset: 'utf8mb4'
})
connection.connect();

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
      const chunksText = chunks.toString();
      console.log('========== 开始获取数据 ==========');
      console.log('接口获取的数据：');
      console.log(chunksText);
      console.log(`size: ${size}`);
      upDataContent(chunksText);
    });
  });
}

/**
 * 往数据库更新数据
 * @param {*} content
 * @param {string} [source='caihongpi']
 * @param {string} [author='zhaoyue']
 * @param {*} [createTime=moment().valueOf()]
 * @param {string} [createTimeStr=moment().format('YYYY-MM-DD HH:mm:ss')]
 */
function upDataContent (content, source = 'caihongpi', author = 'zhaoyue', createTime = moment().valueOf() , createTimeStr = moment().format('YYYY-MM-DD HH:mm:ss')) {
  // console.log('要插入的数据:' , content);
  const sql = "insert into data(content,source,author,createTime,createTimeStr) values(?,?,?,?,?)"
  const data = [content, source, author, createTime, createTimeStr]
  connection.query(sql, data, (err,result) => {
    if (err) {
      console.log('========== 数据库操作失败 ==========', err.message);
    } else {
      done++;
      console.log(`本次是第${done}次获取数据,共要获取${total}次`);
      if (done < total) {
        // 没采集到约定次数，继续采集
        const nextTime = utils.radomNumber(5000,30000);
        console.log(`过${nextTime}毫秒后获取下一次数据`);
        setTimeout(_ => getCaiHongPiText(), nextTime)
      } else {
        // 采集够次数结束数据库操作
        console.log(`数据采集完毕`);
        connection.end();
      }
      console.log(`========== 数据库操作成功 ========== \n`);
    }
  });
}

getCaiHongPiText();
// upDataContent('你是我黯淡生活中的一束光，照亮你我整个世界🌈')