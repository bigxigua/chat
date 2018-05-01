exports.getCss = function (ele, styleName) {
	console.log(ele.currentStyle)
	return ele.currentStyle ? ele.currentStyle[styleName] : window.getComputedStyle(ele, false)[styleName]
};

exports.getParameterByName = function (name, url) {
	var url = url || window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

exports.queryToJSON = function (url) {
  var url = url || location.href;
  let ret = {};
  let data = url.match(/\?(.+)/);
	if (!data) {
		return;
	}
	if (data.length !== 2) {
		return;
	}
	data = data[1];
	data = data.split('&');

	for (let i = 0, len = data.length; i < len; i++) {
    let temp = data[i];
		temp = temp.split('=');
		ret[temp[0]] = temp[1];
	}
	return ret;
};



