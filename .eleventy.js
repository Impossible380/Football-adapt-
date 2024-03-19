module.exports = config => {
    config.addPassthroughCopy('src/assets');
    config.addPassthroughCopy('src/css');
    config.addPassthroughCopy('src/js');


    config.addNunjucksFilter("filter_by", (array, property, value) => array.filter(item => item[property] === value));
    config.addNunjucksFilter("sort_by", (array, property) => array.sort((a, b) => a[property] - b[property]));

    config.addNunjucksFilter("player_filter", (players, status, position) => {
        return players.filter(player => player.status === status
           && player.position === position)
    });

    config.addNunjucksFilter("trainer_filter", (trainers, status) => {
        return trainers.filter(trainer => trainer.status === status)
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