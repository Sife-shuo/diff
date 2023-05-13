function diff(oldstr,newstr){
    var n=oldstr.length;
    var m=newstr.length;
    var c=[[0,0]];
    var ways=roadway(oldstr,newstr);
    var px=0,py=0;
    var gen=altoway(ways,n,m,geta(n,m,ways)["end"]);
    for(var i=0;i<gen.length;i++){
        var o=gen[i];
        if(o[0]!=0&&o[0]==o[1]){
            c.push([o[0]+px,o[1]+py,1]);
            c.push([o[0]+px+1,o[1]+py+1])
        }
        else{
            c.push([o[0]+px,o[1]+py]);
            c.push([o[0]+px+1,o[1]+py+1])
        }
        px+=o[0]+1;
        py+=o[1]+1;
    }
    var p=c[c.length-1];
    if(n-p[0]!=0){c.push([n,p[1]])};
    if(m-p[1]!=0){c.push([p[0],m])};
    return check(c,oldstr,newstr);
}
function geta(n,m,ways){
    var last=n+m;
    var g={};
    function find(ways,a,b,alla,allb,c){
        if(ways.length==0&&(a+b)+(n-alla+m-allb)<last){
            last=(a+b)+(n-alla+m-allb)
            g={"end":c,"d":[a,b],"w":[alla,allb]}
        };
        ways.map((e,q)=>
            find(wayslice(ways,e[0]+1,e[1]+1),a+e[0],b+e[1],alla+1+e[0],allb+1+e[1],c.concat([q]))
        )
    };
    find(ways,0,0,0,0,[]);
    return g;
}
function altoway(ways,n,m,a){
    var f=[];
    var px=0,py=0;
    var w=ways;
    for(var i=0;i<a.length;i++){
        var p=w[a[i]];
        f.push([p[0],p[1]]);
        px+=p[0]+1;py+=p[1]+1;
        w=wayslice(w,p[0]+1,p[1]+1);
    }
    return f;
}
function check(t,ostr,nstr){
    var all=[];
    var c0="";
    var c1="",c2="";
    for(var i=1;i<t.length;i++){
        var c=t[i];
        var d=t[i-1];
        if(!c[2]&&c[0]-1==d[0]&&c[1]-1==d[1]){
            if(c1.length){all.push([1,c1]);c1="";}
            if(c2.length){all.push([-1,c2]);c2="";}
            c0+=ostr.slice(d[0],d[0]+1)
        }else if(c.toString()!=d.toString()){
            if(c0.length){all.push([0,c0]);c0="";}
            if(c[0]==d[0]){
                if(c2.length){all.push([-1,c2]);c2="";}
                c1+=nstr.slice(d[1],c[1])
            }else if(c[1]==d[1]){
                if(c1.length){all.push([1,c1]);c1="";}
                c2+=ostr.slice(d[0],c[0])
            }else{
                if(c2.length){all.push([-1,c2]);c2="";}
                c1+=nstr.slice(d[1],c[1])
                if(c1.length){all.push([1,c1]);c1="";}
                c2+=ostr.slice(d[0],c[0])
            }
        }
    }
    if(c0.length){all.push([0,c0]);c0="";}
    if(c2.length){all.push([-1,c2]);c2="";}
    if(c1.length){all.push([1,c1]);c1="";}
    return all;
}
function roadway(oldstr,newstr){
    var ways=[];
    for(var x=0;x<oldstr.length;x++){
        for(var y=0;y<newstr.length;y++){
            if(oldstr[x]==newstr[y]){
                ways.push([x,y])
            }
        }
    }
    return ways;
}
function wayslice(ways,dex,dey){
    var f=[];
    for(var i=0;i<ways.length;i++){
        var pos=ways[i];
        if(pos[0]>=dex&&pos[1]>=dey){
            f.push([pos[0]-dex,pos[1]-dey])
        }
    }
    return f;
}
module.exports=diff;