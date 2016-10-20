var appModule = angular.module("appModule", []);
appModule.filter('dateTimeToLocalString', ['$filter', function ($filter) {
	return function (data, key) {
		if (!data) return data;
		if (!key) key = 0;
		//key:
		// 0 - "yyyy-MM-dd HH:mm:ss",
		// 1 - "yyyy-MM-dd",
		// 2 - "HH:mm:ss",
		// 3 - "MM-dd HH:mm:ss"
		var format;
		if (key == 1) {
			format = "yyyy-MM-dd";
		} else if (key == 2) {
			format = "HH:mm:ss";
		} else if (key == 3) {
			format = "MM-dd HH:mm:ss";
		} else {
			format = "yyyy-MM-dd HH:mm:ss";
		}
		var timezone = $filter('date')(new Date(), 'Z');
		var dateTime = $filter('date')(new Date(data), format, timezone);
		return dateTime;
	};
}]);

// demo:
// <td>{{ '2016-10-20 11:13:30 AM' | dateTimeToLocalString }}</td>
// <td>{{ '2016-10-20 11:13:30 AM' | dateTimeToLocalString : 1 }}</td>