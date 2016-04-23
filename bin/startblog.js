#!/usr/bin/env node

var article = process.argv[2];

if(!article) {
  console.log("启动失败,参数不能为空!");
  process.exit(1);
}
require("../writer/index")(article);