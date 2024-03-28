const events = require('./src/data/events.json')

module.exports = (config) => {
    config.addPassthroughCopy('src/assets');
    config.addPassthroughCopy('src/css');
    config.addPassthroughCopy('src/js');

    config.addNunjucksFilter("sort_by", (array, property, order) => {
        return array.sort((a, b) => {
            return order === "ascending" ? a[property] - b[property] : b[property] - a[property];
        });
    });

    config.addNunjucksFilter("trainer_filter", (trainers, status) => {
        return trainers.filter((trainer) => {
            return trainer.status === status;
        });
    });

    config.addNunjucksFilter("player_filter", (players, status, position) => {
        return players.filter((player) => {
            return player.status === status
                && player.position === position;
        });
    });

    config.addNunjucksFilter("match_filter", (matches, event, group) => {
        return matches.filter((match) => {
            return match.eventId === event
                && match.group === group;
        });
    });

    config.addNunjucksFilter("ranking_filter", (matches, playerCategory, pitchType) => {
        const newEvents = events.filter((event) => {
            return event.pitchType === pitchType
        }).map((event) => event.id);
        console.log(newEvents)

        const newMatches = matches.filter((match) => {
            return match.teamA.name === "FC Ste-Foy"
                || match.teamB.name === "FC Ste-Foy";
        })
        .filter((match) => {
            return newEvents.includes(match.eventId);
        })
        .map((match) => {
            const { eventId, group, teamA, teamB } = match;
            let team = teamB;
            if (teamA.name === "FC Ste-Foy") {
                team = teamA;
            }
            return { eventId, group, team };
        });

        const players = {};

        newMatches.forEach((match) => {
            if (!(playerCategory in match.team)) {
                return;
            }
            Object.keys(match.team[playerCategory])
                .forEach((playerName) => {
                    if (!(playerName in players)) {
                        players[playerName] = 0;
                    }
                    players[playerName] += match.team[playerCategory][playerName];
                });
        });

        return Object.keys(players).map((playerName) => {
            if (playerCategory === "scorers") {
                return {
                    name: playerName,
                    goals: players[playerName]
                };
            }
            else {
                return {
                    name: playerName,
                    concededGoals: players[playerName]
                };
            }
        });
    });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'public',
            includes: "templates",
            data: "data"
        }
    };
};