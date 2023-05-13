const diffed=require("./lib/diff");
const fastdiff=require("./lib/fast-diff");
//var diff=(oldstr,newstr)=>diffed(oldstr,newstr)
var diff=diffed;
diff.fast=fastdiff;
diff.log=(oldstr,newstr,type=0)=>{
    if(type=="fast"){
        var f=fastdiff(oldstr,newstr)
    }else{
        var f=diff(oldstr,newstr)
    };
    var old="";
    var n="";
    for(var p=0;p<f.length;p++){
        var i=f[p];
        if(i[0]==0){
            old+=i[1];
            n+=i[1];
        }else if(i[0]==1){
            n+=log(i[1],1)
        }else if(i[0]==-1){
            old+=log(i[1],-1)
        }
    }
    console.log(old);
    console.log(n);
}
function log(a,m){
    var co="";
    if(m==1){co="38;2;0;255;0"};
    if(m==-1){co="38;2;255;0;0"};
    return `\x1b[${co}m${a}\x1b[0m`
}
module.exports=diff;