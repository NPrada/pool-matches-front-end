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



          // for(let i = 0; i < result.count; i++){
          //   const playersIds = result.games[i].teams.team1.concat(result.games[i].teams.team2)
          //
          //   console.log(playersIds)
          //
          //   playersIds.forEach((val) => {
          //     fetch(apiUrl+"/users/"+result.users[i]._id)
          //       .then(res => res.json())
          //       .then(result => {
          //
          //         //usersData.users.push(result)
          //
          //         // if(usersData.count === usersData.users.length){
          //         //   this.setState({
          //         //     isLoaded: true,
          //         //     usersData: usersData.users
          //         //   });
          //         // }
          //       })
          //   })
          //
          //
          //
          // }
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
        console.log(gamesList[i])
        tableContent.push(
          <TableRow key={i}
             content={[i+1, gamesList[i].date]}/> )
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