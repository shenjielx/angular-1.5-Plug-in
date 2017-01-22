appModule.filter('dateTimeToLocalString', ['$filter', function($filter) {
    return function(data, key) {
		if (!data) return data;
		if (!key) key = 0;
		var format;
		if (key === 1) {
			format = "yyyy-MM-dd";
		} else if (key === 2) {
			format = "HH:mm:ss";
		} else if (key === 3) {
			format = "MM-dd HH:mm:ss";
		} else {
			format = "yyyy-MM-dd HH:mm:ss";
		}
		if (data.indexOf('T') > -1)
			data = data.replace('T', ' ').split('.')[0];

		if (window.ActiveXObject || "ActiveXObject" in window)
			data = data.replace('-', '/').replace('-', '/');
		else
			data = data.replace('/', '-').replace('/', '-');

		if (data.indexOf('Z') === -1 && data.indexOf('+') === -1) {
			data += 'Z';
		}
		var datestamp = Date.parse(data);
		if (datestamp) return $filter('date')(datestamp, format);
		else return '';
    };
}]);

// demo:
// <td>{{ '2016-10-20 11:13:30 AM' | dateTimeToLocalString }}</td>
// <td>{{ '2016-10-20 11:13:30 AM' | dateTimeToLocalString : 1 }}</td>