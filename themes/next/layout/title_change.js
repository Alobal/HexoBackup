
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         document.title = '(╯‵□′)╯︵┻━┻这就走啦 ~';
         clearTimeout(titleTime);
     }
     else {
         document.title = '(￣y▽￣)╭ Ohohoho..欢迎回来~' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });