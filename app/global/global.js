(function() {
  var ROOT = document.querySelector('html');
  var UIWIDTH = 750;

  String.prototype.format = function() {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {
      var reg = new RegExp("\\{" + i + "\\}", "gm");
      str = str.replace(reg, arguments[i]);
    }
    return str;
  };
  window.TBZ = {
    USER_ACCOUNT: localStorage.getItem('account'),
    DEFAULT_AVATAR: require('../images/avatar_user.jpg'),
    DEFAULT_USER_BG: require('../images/user-bg.jpg'),
    DEFAULT_CHATROOM_BG: require('../images/chatroom.jpg'),
    DEFAULT_GROUP_AVATAR: require('../images/download.svg'),
    UPLOAD_DEFAULT_AVATAR: require('../images/upload.jpg'),
    DEFAULT_URL: /^118.24.89.72/.test(location.hostname) ?  'http://118.24.89.72:8080/' : 'http://172.30.120.3:8080/',
    expressionsIMG: require('../images/expressions.png'),
    expressions: ['呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
                     '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心', 
                     '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
                     '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳'],
    sortUp: function (arr, key) {
      return arr.sort(function (a, b) {
        return a[key]-b[key]
      })
    },
    sortDown: function (arr, key) {
      return arr.sort(function (a, b) {
        return b[key] - a[key];
      })
    },
    isDev: function () {
      return /^127.0.0.1/.test(location.origin)
    },
    isIOSDevice: function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    calcRootSize: function () {
      var deviceWidth = window.innerWidth;
      var rootSize = 100 * deviceWidth / UIWIDTH;
      ROOT.style.fontSize = rootSize + 'px';
      if (!window._resizeListener_) {
        window.addEventListener('resize', TBZ.calcRootSize, false);
        window._resizeListener_ = true;
      }
    },
    isEmptyObject: function (obj) {
      return Object.keys(obj).length === 0;
    },
    supportPushState: window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)
  }
})();
