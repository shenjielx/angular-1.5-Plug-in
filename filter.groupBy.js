var appModule = angular.module("appModule", []);
appModule.filter('groupBy', ['$timeout', function ($timeout) {
	return function (data, key) {
		if (!key || !data) return data;
		var outputPropertyName = key;
		if (!data[outputPropertyName]) {
			var result = {};
			for (var i = 0; i < data.length; i++) {
				if (!result[data[i][key]])
					result[data[i][key]] = [];
				result[data[i][key]].push(data[i]);
			}
			Object.defineProperty(data, outputPropertyName, { 
                enumerable: false, 
                configurable: true, 
                writable: false, 
                value: result 
            });
			$timeout(function () { delete data[outputPropertyName]; }, 0, false);
		}
		return data[outputPropertyName];
	};
}]);

// demo:
// items = [{date:'yyyy-MM-dd',time:'HH:mm:ss',info:'xxxxxxx'}]
// <div ng-repeat="(key, value) in items | groupBy : 'date'">
//      <div class="header" ng-bind="key"></div>
//            <div class="meta" ng-repeat="item in value">
//                <span ng-bind="item.time"></span>
//                <label ng-bind="item.info"></label>
//            </div>
//      </div>
// </div>