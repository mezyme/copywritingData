/*
 * @Author: ZhaoYue
 * @Date: 2020-12-19 22:10:26
 * @Description: 文件内容描述
 * @LastEditTime: 2020-12-21 16:24:32
 * @LastEditors: Please set LastEditors
 * @FilePath: /copywritingData/libs/utils.js
 */

// const mysql = require("mysql");

// const MySql = {
//     connectParams: {
//         host: "localhost",
//         user: "root",
//         password: "860926Yue",
//         database: "caihongpi"
//     },
//     connection: mysql.createConnection(this.connectParams),
//     connect: this.connection.connect(),
//     end: this.connection.end(),
// };

exports.radomNumber = (min, max) => {
    var num = Math.floor(Math.random() * (max - min + 1) + min)
    // console.log(`随机数是: ${num}`);
    return num
}