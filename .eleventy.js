module.exports = config => {
    config.addPassthroughCopy('src/assets');
    config.addPassthroughCopy('src/css');
    config.addPassthroughCopy('src/js');


    config.addNunjucksFilter("filter_by", (array, property, value) => array.filter(item => item[property] === value));
    config.addNunjucksFilter("sort_by", (array, property) => array.sort((a, b) => a[property] - b[property]));

    config.addNunjucksFilter("trainers_filter", (trainers, status) => {
        return trainers.filter(trainer => trainer.status === status)
    });

    config.addNunjucksFilter("players_filter", (players, status, position) => {
        return players.filter(player => player.status === status
           && player.position === position)
    });

    config.addNunjucksFilter("matches_filter", (matches, event, group) => {
        return matches.filter(match => match.eventId === event
            && match.group === group)
    })

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