(function(global) {

    var settings = {
        baseURL: "http://quizj.ag.wap3.com.ua",
        cellSide: 20

    }

    settings.apiURL = settings.baseURL + "/api/";

    function addUrl(key, url, method){
        settings[key] = {
            url: settings.apiURL + url,
            method: method||"POST"
        }
    }

    // Users
    addUrl("join", "/user/join", "PUT");
    
    // Game
    addUrl("gameStatus", "/game/{gameId}/status");
    addUrl("loadUserShips", "/game/{gameId}/load-user-ships/{userId}");
    addUrl("saveUserShips", "/game/{gameId}/save-user-ships/{userId}");
    addUrl("isMyStep", "/game/{gameId}/is-my-step/{userId}"); // should return opponent actions
    addUrl("saveUserActions", "/game/{gameId}/save-user-actions/{userId}");
    addUrl("gameResults", "/game/{gameId}/results");

    function API(){}

    API.prototype = {
        getURL: function(name, data){
            var url = settings[name].url;
            return url.replace(/\{([^{}]*)\}/g, function($0, $1){
                var replacement = data[$1].toString();
                delete data[$1];
                return replacement;
            });
        },
        callURL: function(name, data, callback, failCallback){
            var url = settings[name].url,
                method = settings[name].method,
                that=this;

            failCallback = failCallback || function(){ console.log(arguments) }

            url = url.replace(/\{([^{}]*)\}/g, function($0, $1){
                var replacement = data[$1].toString();
                delete data[$1];
                return replacement;
            });

            $.ajax({
                type: method,
                url: url,
                data: data//JSON.stringify(data)
            }).done(callback).fail(failCallback);
        }
    }

    global.settings = settings;
    global.api = new API();
})(window);