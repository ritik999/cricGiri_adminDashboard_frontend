export const MasterSubMenuDatas = [
            { title: 'User', src: 'User', apiEndpoint: '/user' },
            { title: 'Team', src: 'team', apiEndpoint: '/teams' },
            { title: 'Tournament', src: 'tournaments', apiEndpoint: null,
                list: [
                    {title: 'Tournaments', mainPage:'tournament', apiEndpoint: "/tournaments/local-tournaments-by-location", apiBody:{ user_location_id: 234 }}
                ]
             },
            {
                title: 'Master', src: 'master', apiEndpoint: null,
                list: [
                    { title: "Player Role", mainPage:'master', apiEndpoint: "/master/playertype", apiBody:{} },
                    { title: "Match Type", mainPage:'master', apiEndpoint: "/master/matchtype", apiBody:{} },
                    { title: "Batting Style", mainPage:'master', apiEndpoint: "/master/battingstyle", apiBody:{} },
                    { title: "Bowling Style", mainPage:'master', apiEndpoint: "/master/bowlingstyle", apiBody:{} },
                    { title: "Country", mainPage:'master', apiEndpoint: "/master/country", apiBody:{} },
                    // { title: "State", apiEndpoint: "/master/states" },
                    // { title: "Citys", apiEndpoint: "/master/citys" },
                    // { title: "City List By Country Code", apiEndpoint: "/master/citysbycountrycode" },
                    { title: "Fielding Position", mainPage:'master', apiEndpoint: "/master/fieldingpossision", apiBody:{} },
                    { title: "Field Side", mainPage:'master', apiEndpoint: "/master/fieldside", apiBody:{} },
                    { title: "Out Type", mainPage:'master', apiEndpoint: "/master/matchouttype", apiBody:{} },
                    { title: "Shots", mainPage:'master', apiEndpoint: "/master/shots", apiBody:{} },
                    { title: "Ball Types", mainPage:'master', apiEndpoint: "/master/balltypes", apiBody:{} },
                    { title: "Pitch Types", mainPage:'master', apiEndpoint: "/master/pitchtypes", apiBody:{} },
                    { title: "Match Officials", mainPage:'master', apiEndpoint: "/master/match-officials-type", apiBody:{} },
                    { title: "Categories List", mainPage:'master', apiEndpoint: "/master/categories-list", apiBody:{} },
                    // { title: "Popular Cities", apiEndpoint: "/master/popular-cities" },
                    // { title: "Shots Direction", apiEndpoint: "/master/shots-direction" },
                    // { title: "Match Status", apiEndpoint: "/master/match-status" },
                    { title: "Tournament Categories", mainPage:'master', apiEndpoint: "/master/tournament-categories-list", apiBody:{} },
                    { title: "Status List", mainPage:'master', apiEndpoint: "/master/status-list", apiBody:{} },
                    // { title: "Tournament Rounds Types", apiEndpoint: "/master/tournament-rounds-types" },
                    { title: "Sponsor Categories", mainPage:'master', apiEndpoint: "/master/sponsor-categories", apiBody:{} },
                    { title: "Search Categories", mainPage:'master', apiEndpoint: "/master/search-categories", apiBody:{} }
                ]
            }
    ]