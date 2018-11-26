import React from "react";

export class TableRow extends React.Component{
  render(){
    const {content} = this.props
    let rowContents = []
    content.forEach((val) => {
      rowContents.push(<div className={'table-cell'}>{val}</div>)
    })
    return (
      <div className={'table-row'}>
        {rowContents}
        {/*<div className={'table-cell'}>{index}</div>*/}
        {/*<div className={'table-cell'}>{user.name}</div>*/}
        {/*<div className={'table-cell'}>{user.games.length}</div>*/}
        {/*<div className={'table-cell'}>{user.winRatio + '%'}</div>*/}
      </div>
    )

  }
}

export class TableHeader extends React.Component{
  render(){
    const {headerNames} = this.props;

    let headerCells = [];

    headerNames.forEach((val)=>{
      headerCells.push(<div key={val} className={'header-cell'}>{val}</div>);
    });

    return(
      <div className={'table-header'}>
        {headerCells}
      </div>
    )
  }
}