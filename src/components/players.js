import React from 'react';
import {apiUrl} from "./constants";

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

      for(let i = 0; i < usersData.length; i++){
        tableContent.push( <TableRow key={i} index={i+1} user={usersData[i]}/> )
      }

      return (
        <div className={'players-content'}>
          <div className={'table-main'}>
            {tableContent}
          </div>
        </div>
      );
    }
  }
}

class TableRow extends React.Component{
  render(){
    const {index, user} = this.props;

    const winRatio = getWinRatio(user.games, user._id);

    return (
      <div className={'table-row'}>
        <div className={'table-cell'}>{index}</div>
        <div className={'table-cell'}>{user.name}</div>
        <div className={'table-cell'}>{user.games.length}</div>
        <div className={'table-cell'}>{winRatio + '%'}</div>
      </div>
    )

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
