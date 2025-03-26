export const MasterSubMenuDatas = [
            { title: 'User', src: 'User', apiEndpoint: '/user' },
            { title: 'Team', src: 'team', apiEndpoint: '/teams' },
            { title: 'Tournament', src: 'tournaments', apiEndpoint: null,
                list: [
                    {title: 'tournaments', mainPage:'tournament', apiEndpoint: null}
                ]
             },
            {
                title: 'Master', src: 'master', apiEndpoint: null,
                list: [
                    { title: "Player Role", mainPage:'master', apiEndpoint: "/master/playertype" },
                    { title: "Match Type", mainPage:'master', apiEndpoint: "/master/matchtype" },
                    { title: "Batting Style", mainPage:'master', apiEndpoint: "/master/battingstyle" },
                    { title: "Bowling Style", mainPage:'master', apiEndpoint: "/master/bowlingstyle" },
                    { title: "Country", mainPage:'master', apiEndpoint: "/master/country" },
                    // { title: "State", apiEndpoint: "/master/states" },
                    // { title: "Citys", apiEndpoint: "/master/citys" },
                    // { title: "City List By Country Code", apiEndpoint: "/master/citysbycountrycode" },
                    { title: "Fielding Position", mainPage:'master', apiEndpoint: "/master/fieldingpossision" },
                    { title: "Field Side", mainPage:'master', apiEndpoint: "/master/fieldside" },
                    { title: "Out Type", mainPage:'master', apiEndpoint: "/master/matchouttype" },
                    { title: "Shots", mainPage:'master', apiEndpoint: "/master/shots" },
                    { title: "Ball Types", mainPage:'master', apiEndpoint: "/master/balltypes" },
                    { title: "Pitch Types", mainPage:'master', apiEndpoint: "/master/pitchtypes" },
                    { title: "Match Officials", mainPage:'master', apiEndpoint: "/master/match-officials-type" },
                    { title: "Categories List", mainPage:'master', apiEndpoint: "/master/categories-list" },
                    // { title: "Popular Cities", apiEndpoint: "/master/popular-cities" },
                    // { title: "Shots Direction", apiEndpoint: "/master/shots-direction" },
                    // { title: "Match Status", apiEndpoint: "/master/match-status" },
                    { title: "Tournament Categories", mainPage:'master', apiEndpoint: "/master/tournament-categories-list" },
                    { title: "Status List", mainPage:'master', apiEndpoint: "/master/status-list" },
                    // { title: "Tournament Rounds Types", apiEndpoint: "/master/tournament-rounds-types" },
                    { title: "Sponsor Categories", mainPage:'master', apiEndpoint: "/master/sponsor-categories" },
                    { title: "Search Categories", mainPage:'master', apiEndpoint: "/master/search-categories" }
                ]
            }
    ]