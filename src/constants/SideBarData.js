export const MasterSubMenuDatas = [
            { title: 'USER', src: 'User', apiEndpoint: '/user' },
            { title: 'TEAMS', src: 'team', apiEndpoint: '/teams' },
            { title: 'TOURNAMENTS', src: 'tournaments', apiEndpoint: '/tournaments' },
            {
                title: 'MASTER', src: 'master', apiEndpoint: null,
                list: [
                    { title: "Player Role", apiEndpoint: "/master/playertype" },
                    { title: "Match Type", apiEndpoint: "/master/matchtype" },
                    { title: "Batting Style", apiEndpoint: "/master/battingstyle" },
                    { title: "Bowling Style", apiEndpoint: "/master/bowlingstyle" },
                    { title: "Country", apiEndpoint: "/master/country" },
                    // { title: "State", apiEndpoint: "/master/states" },
                    // { title: "Citys", apiEndpoint: "/master/citys" },
                    // { title: "City List By Country Code", apiEndpoint: "/master/citysbycountrycode" },
                    { title: "Fielding Position", apiEndpoint: "/master/fieldingpossision" },
                    { title: "Field Side", apiEndpoint: "/master/fieldside" },
                    { title: "Out Type", apiEndpoint: "/master/matchouttype" },
                    { title: "Shots", apiEndpoint: "/master/shots" },
                    { title: "Ball Types", apiEndpoint: "/master/balltypes" },
                    { title: "Pitch Types", apiEndpoint: "/master/pitchtypes" },
                    { title: "Match Officials", apiEndpoint: "/master/match-officials-type" },
                    { title: "Categories List", apiEndpoint: "/master/categories-list" },
                    // { title: "Popular Cities", apiEndpoint: "/master/popular-cities" },
                    // { title: "Shots Direction", apiEndpoint: "/master/shots-direction" },
                    // { title: "Match Status", apiEndpoint: "/master/match-status" },
                    { title: "Tournament Categories", apiEndpoint: "/master/tournament-categories-list" },
                    { title: "Status List", apiEndpoint: "/master/status-list" },
                    // { title: "Tournament Rounds Types", apiEndpoint: "/master/tournament-rounds-types" },
                    { title: "Sponsor Categories", apiEndpoint: "/master/sponsor-categories" },
                    { title: "Search Categories", apiEndpoint: "/master/search-categories" }
                ]
            }
    ]