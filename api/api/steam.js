module.exports = {
    getUserInfo: function(req, res) {
        SteamInstance.resolveVanityURL({ vanityurl: req.params.name }, function(err, data) {
            (err) ? res.send(err): SteamInstance.getOwnedGames({
                key: config.steamApiKey,
                steamid: data.steamid,
                include_appinfo: true,
                include_played_free_games: false,
                appids_filter: 0
            }, function(err, data) {
                res.send(data)
            })
        });
    },
    getSteamLevel: function(req, res) {
        SteamInstance.getSteamLevel({
            key: config.steamApiKey,
            steamid: req.params.id
        }, function(err, data) {
            res.send(data)
        })
    }
}
