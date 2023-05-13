#!/usr/bin/env node
const diff=require("./diff");
if(process.argv[2]&&process.argv[3]){
    if(process.argv[4]&&process.argv[4].replaceAll("-","").replaceAll("/","").toLowerCase()=="f"){
        diff.log(process.argv[2],process.argv[3],"fast")
    }else{
        diff.log(process.argv[2],process.argv[3])
    }
}else{
    console.log("Error string")
}