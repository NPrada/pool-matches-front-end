import React from 'react';
import {apiUrl} from "./constants";
import {TableHeader, TableRow} from "./table";

export default class Players extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      usersData: null
    };
  }

  componentDidMount() {
    fetch(apiUrl+"/users")
      .then(res => res.json())
      .then((result) => {
          let usersData = {count: result.count, users: []};

          // console.log(usersData[i]._id)

          for(let i = 0; i < result.count; i++){
            fetch(apiUrl+"/users/"+result.users[i]._id)
              .then(res => res.json())
              .then(result => {

                usersData.users.push(result)

                if(usersData.count === usersData.users.length){
                  this.setState({
                    isLoaded: true,
                    usersData: usersData.users
                  });
                }

              })

          }


        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, usersData } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (error || usersData === null) {
      return <div>Error: {(error ? error.message : 'No users found')}</div>;
    } else {
      let tableContent = [];

      console.log(usersData)

      //populate winRatios
      for(let i = 0; i < usersData.length; i++){
        usersData[i].winRatio = getWinRatio(usersData[i].games, usersData[i]._id);
      }
      //sort by winratio
      usersData.sort((a,b) => {
        return a.winRatio - b.winRatio
      }).reverse();

      for(let i = 0; i < usersData.length; i++){

        tableContent.push(
          <TableRow key={i}
              content={[i+1, usersData[i].name, usersData[i].games.length,usersData[i].winRatio + '%' ]}
          /> )
      }

      return (
        <div className={'players-content'}>
          <div className={'table-main'}>
            <TableHeader headerNames={['#','Name','Total Games','Win %']}/>
            {tableContent}
          </div>
        </div>
      );
    }
  }
}





const getWinRatio = (gamesArr, userId) =>{
  if(typeof gamesArr !== undefined && gamesArr.length !== 0){
    let totGames = gamesArr.length;
    let gamesWon = 0;
      for ( let i = 0; i < gamesArr.length; i++ ) {

        for (let k = 0; k < gamesArr[i].teams[gamesArr[i].winner].length; k++){

          if( gamesArr[i].teams[gamesArr[i].winner][k] === userId){
            gamesWon++
          }
        }
      }
      return Math.round((gamesWon / totGames) * 10000) / 100
  }else {
    return 0
  }
};
