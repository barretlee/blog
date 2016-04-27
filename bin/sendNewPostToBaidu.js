var fs = require('fs');
var path = require('path');
var exec = require("child_process").exec;
var root = '../build/';
var writeFilePath = './urls.txt';
var historyFilePath = './history.txt';
var history = [];
var suffix = "http://www.barretlee.com/";
var pushQueue = [];
var count = 0;
var duplicate = 0;

if(fs.existsSync(historyFilePath)){
    try {
        history = JSON.parse(fs.readFileSync(historyFilePath) || "");
    }catch(e){
        history = [];
    }
}
function travel(dir) {
    fs.readdirSync(dir).forEach(function(p){
        var file = path.join(dir, p);
        var stat = fs.statSync(file);
        if(p == 'public' || p == 'demo') return;
        if(stat.isDirectory()){
            travel(file);
        } else {
            writeToList(file, p == 'blog');
        }
    });
}

function writeToList(file, fixFile){
    var url = suffix + file.replace(root, '');
    if (fixFile) url = path.dirname(url) + "/";
    if(historyFilePath.length && (historyFilePath.indexOf(url) > -1)) {
        duplicate++;
        return;
    }
    if(count > 1) return;
    pushQueue.push(url);
    history.push(url);
}

fs.existsSync(writeFilePath) && fs.unlinkSync(writeFilePath);
travel(root);
fs.appendFileSync(writeFilePath, pushQueue.join("\n"));
fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));

exec("curl -H 'Content-Type:text/plain' --data-binary @urls.txt \"http://data.zz.baidu.com/urls?site=www.barretlee.com&token=MWdfT3vVrD92opII\"", function(error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
console.log('\nTotal ' + count + " files.");
<<<<<<< HEAD
console.log('\nDuplicate ' + duplicate + " files.\n");
=======
console.log('\nDuplicate ' + duplicate + " files.\n");
>>>>>>> c619756fd94e711f785899540a6573df975378cd
