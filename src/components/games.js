import React from "react";
import {apiUrl} from "./constants";
import {TableHeader, TableRow} from "./table";

export default class Games extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gamesData: null
    };
  }

  componentDidMount() {
    fetch(apiUrl+"/games")
      .then(res => res.json())
      .then((result) => {
        console.log(result)
          let gamesData = {count: result.count, games: []};

          this.setState({
            isLoaded: true,
            gamesData: result
          });

        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  getNames = (namesArrOfObj) => {
    let result = [];
    for(let i = 0; i < namesArrOfObj.length; i++){
      result.push(namesArrOfObj[i].name)
    }
    return result;
  };

  render() {
    const { error, isLoaded, gamesData } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error: { error.message }</div>;
    } else {
      let tableContent = [];
      const gamesList = gamesData.games;
      //
      // console.log(usersData)
      //
      // //populate winRatios
      // for(let i = 0; i < usersData.length; i++){
      //   usersData[i].winRatio = getWinRatio(usersData[i].games, usersData[i]._id);
      // }
      // //sort by winratio
      // usersData.sort((a,b) => {
      //   return a.winRatio - b.winRatio
      // }).reverse();
      //


      for(let i = 0; i < gamesList.length; i++){
        console.log(gamesList[i]);

        let team1Names = this.getNames(gamesList[i].teams.team1)
        let team2Names = this.getNames(gamesList[i].teams.team2)

        const teamToBolden = gamesList[i].winner === 'team1' ? 2 : 3;

        tableContent.push(
          <TableRow key={i} bolden={teamToBolden}
             content={ [i+1, gamesList[i].date, team1Names, team2Names ] }/> )
      }

      return (
        <div className={'players-content'}>
          <div className={'table-main'}>
            <TableHeader headerNames={['#','Date','Team1','Team2']}/>
            {tableContent}
          </div>
        </div>
      );
    }
  }
}