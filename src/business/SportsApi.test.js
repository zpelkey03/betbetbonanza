import { fetchUpcomingNHLGames } from './SportsApi'; // Import the method to test
import axios from 'axios'; // Import axios for mocking

// Mocking axios so we don't use up our api uses while testing.
jest.mock('axios');

describe('SportsAPI logic', () => {
    it('should fetch upcoming NHL games', async () => {
        // Define mock response data.
        const mockResponseData = {
            data: {
                "0": {
                    away_team: "St Louis Blues",
                    commence_time: "2024-03-11T23:00:00Z",
                    home_team: "Boston Bruins",
                    id: "5c8961b21dc53703ab1bd5512aa23067",
                    sport_key: "icehockey_nhl",
                    sport_title: "NHL",
                    bookmakers: [{
                        "key": "draftkings",
                        "title": "DraftKings",
                        "last_update": "2024-03-11T18:52:32Z",
                        "markets": [
                            {
                                "key": "h2h",
                                "last_update": "2024-03-11T18:52:32Z",
                                "outcomes": [
                                    {
                                        "name": "Boston Bruins",
                                        "price": -230
                                    },
                                    {
                                        "name": "St Louis Blues",
                                        "price": 190
                                    }
                                ]
                            }
                        ]
                    }]
                },
                "1": {
                    away_team: "New Jersey Devils",
                    commence_time: "2024-03-11T23:30:00Z",
                    home_team: "New York Rangers",
                    id: "8dfff226bbe3c8c243ae0f17081bbe57",
                    sport_key: "icehockey_nhl",
                    sport_title: "NHL",
                    bookmakers: [{
                        "key": "draftkings",
                        "title": "DraftKings",
                        "last_update": "2024-03-11T18:52:32Z",
                        "markets": [
                            {
                                "key": "h2h",
                                "last_update": "2024-03-11T18:52:32Z",
                                "outcomes": [
                                    {
                                        "name": "New Jersey Devils",
                                        "price": -200
                                    },
                                    {
                                        "name": "New York Rangers",
                                        "price": 150
                                    }
                                ]
                            }
                        ]
                    }]
                },
                "2": {
                    away_team: "Washington Capitals",
                    commence_time: "2023-03-11T23:00:00Z",
                    home_team: "Winnipeg Jets",
                    id: "8b9bf6335c17c9e81c38a1fd4770d2bd",
                    sport_key: "icehockey_nhl",
                    sport_title: "NHL",
                    bookmakers: [{
                        "key": "draftkings",
                        "title": "DraftKings",
                        "last_update": "2024-03-11T18:52:32Z",
                        "markets": [
                            {
                                "key": "h2h",
                                "last_update": "2024-03-11T18:52:32Z",
                                "outcomes": [
                                    {
                                        "name": "BWashington Capitals",
                                        "price": -150
                                    },
                                    {
                                        "name": "Winnipeg Jets",
                                        "price": 100
                                    }
                                ]
                            }
                        ]
                    }]
                }
            }
        };



        // Mocking api call to return mockResponseData
        axios.get.mockResolvedValueOnce(mockResponseData);

        //Calling the method underTest
        const upcomingGames = await fetchUpcomingNHLGames();

        //Only expect games 0 and 1 since game 2 is not upcoming but in the past.
        expect(upcomingGames).toEqual([
            {
                away_team: "St Louis Blues",
                commence_time: "2024-03-11T23:00:00Z",
                home_team: "Boston Bruins",
                id: "5c8961b21dc53703ab1bd5512aa23067",
                draftkings_odds: {
                    "home_team_odds": -230,
                    "away_team_odds": 190
                }
            },
            {

                away_team: "New Jersey Devils",
                commence_time: "2024-03-11T23:30:00Z",
                home_team: "New York Rangers",
                id: "8dfff226bbe3c8c243ae0f17081bbe57",
                draftkings_odds: {
                    "home_team_odds": -200,
                    "away_team_odds": 150
                }
            },
        ]);
    })
});