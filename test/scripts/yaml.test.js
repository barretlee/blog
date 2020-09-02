'use strict';

const fs = require('fs')
const path = require('path')
const yaml = require('yaml');

const filePath = path.join(__dirname, '../../blog/_config.yml');
const configYaml = fs.readFileSync(filePath).toString();

console.log(yaml.parse(configYaml).url);