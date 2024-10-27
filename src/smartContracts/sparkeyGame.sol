// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract SparkeyGame {
    enum Stake {
        Beer,       // 1 dollar
        MalortShot, // 2 dollars
        Coke,       // 2 dollars
        Handshake,  // 3 dollars
        WhiskeyShot // 5 dollars
    }

    struct Game {
        uint128 id;
        uint128 numberOfPlayers;
        Stake stake;
        address[] players;
        bool isActive;
    }

    uint128 private gameIdCounter;
    mapping(uint128 => Game) public games;

    // Add JoinGame during game creation
    function createGame(uint128 _numberOfPlayers, Stake _stake) public returns (uint128) {
        require(_numberOfPlayers > 1, "Game must have at least 2 players");
        uint128 gameId = gameIdCounter++;
        games[gameId] = Game({
            id: gameId,
            numberOfPlayers: _numberOfPlayers,
            stake: _stake,
            players: new address[](0),
            isActive: true
        });
        joinGame(gameId);
        return gameId;
    }

    function joinGame(uint128 _gameId) public payable {
        Game storage game = games[_gameId];
        require(game.isActive, "Game is not active");
        require(game.players.length < game.numberOfPlayers, "Game is full");
        require(msg.value >= getStakeValue(game.stake), "Insufficient stake");

        game.players.push(msg.sender);
        if (game.players.length == game.numberOfPlayers) {
            game.isActive = false;
        }
    }

    function getStakeValue(Stake _stake) public view returns (uint256) {
        if (_stake == Stake.Beer) return  getConversionRateToEth(1);
        if (_stake == Stake.MalortShot) return getConversionRateToEth(2);  // 2 dollars in wei
        if (_stake == Stake.Coke) return getConversionRateToEth(2);        // 2 dollars in wei
        if (_stake == Stake.Handshake) return getConversionRateToEth(3);   // 3 dollars in wei
        if (_stake == Stake.WhiskeyShot) return getConversionRateToEth(5); // 5 dollars in wei
        revert("Invalid stake");
    }

    function getPrice() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 price,,,) = priceFeed.latestRoundData(); 
        return  uint256(price*1e10);
    }

    function getConversionRateToEth(uint256 usdAmount) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmount = (usdAmount / ethPrice) / 1e18;
        return  ethAmount;
    }
}