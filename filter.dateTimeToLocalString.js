appModule.filter('dateTimeToLocalString', ['$filter', function($filter) {
    return function(data, key) {
        if (!data) return data;
        if (!key) key = 0;

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
        if (data.indexOf('Z') === -1 && data.indexOf('+') === -1) {
            data += 'Z';
        }
        var datestamp = Date.parse(data);
        return $filter('date')(datestamp, format);
    };
}]);

// demo:
// <td>{{ '2016-10-20 11:13:30 AM' | dateTimeToLocalString }}</td>
// <td>{{ '2016-10-20 11:13:30 AM' | dateTimeToLocalString : 1 }}</td>