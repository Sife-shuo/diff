# diffed
Build for **speed** and **tiny** (less than 5KB)

Two different algorithms were used, one that can quickly generate results(there will be a small deviation from the ideal result), and the other that produces the ideal result of the diff algorithm, but it takes slightly more time.

Based on `"Path cutting algorithm"`.

# Install
```
npm install diffed -g
```

# Usage

## ClI
```shell
diffed dbaf bcdb
#Color data display.Generate ideal results.
diffed apple application -f
#Color data display.Using faster algorithms.
```
## node
```javascript
const diff=require("diffed");
diff("abcdef","cdf");
//[[-1,"ab"],[0,"cd"],[-1,"e"],[0,"f"]] -1 to cut,0 to stay,1 to add
diff.fast("abcdef","cdf")//Using faster algorithms
```