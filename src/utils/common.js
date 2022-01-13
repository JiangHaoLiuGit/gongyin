/**
 * 函数防抖 
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
 const Debounce = (fn, t) => {
    let delay = t || 500;
    let timer;
    return function() {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
  };
  
  
  /**
  1. 函数节流
  2. @param fn
  3. @param interval
  4. @returns {Function}
  5. @constructor
  */
  const Throttle = (fn, t) => {
    let last;
    let timer;
    let interval = t || 500;
    return function() {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }
  }
  
  //时间戳转换成日期格式
  const timestampToTime = (timestamp) => {
      if(timestamp == 0) {
          return '---'
      } else {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ":";
        var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
          return Y+M+D+h+m+s;
      }
  }
  
  //时间戳转换成日期格式
  const newTimestampToTime = (timestamp) => {
      if(timestamp == 0) {
          return '---'
      } else {
          var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes();
          // var s = date.getSeconds();
          return Y+M+D+h+m;
      }
  }
  
  //日期格式转换成时间戳
  const dataTime = (timestamp) => {
      // timestamp = new Date(timestamp).getTime()
      // timestamp = timestamp + ""
      // if(timestamp.length > 10){
      //     var tmp = Date.parse( new Date() ).toString()
      //     tmp = tmp.substr(0,10);
      //     return tmp
      // }else{
      //     return new Date(timestamp).getTime()
      // }
      let str = String(new Date(timestamp).getTime())
      if(str.length > 10){
          str = str.slice(0,10)
      }
      
      return str
      
      
      
  }
  //日期格式转换成时间戳
  const newDataTime = (timestamp) => {
      var date = new Date(timestamp);
      var time1 = date.getTime()/1000;
      return time1
  }
  export default {
    Debounce,
    Throttle,
    timestampToTime,
    dataTime,
    newDataTime,
    newTimestampToTime
  }