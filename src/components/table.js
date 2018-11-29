import React from "react";

export class TableRow extends React.Component{
  render(){
    const {content, bolden} = this.props;
    let rowContents = [];
    let index = 0;
    console.log(Array.isArray(content[3]));

    for(let i = 0; i < content.length;i++){
      const  fontWeight = i === bolden ? '600' : '400';
      if(Array.isArray(content[i])  ){

        let subcells = [];
        let k = 0;
        while (typeof content[i][k] !== "undefined"){
          console.log('while', content[i][k]);
          console.log('while', content[i][k].length);
          subcells.push(<div key={k} className={'table-subcell'}>{content[i][k]}</div>);
          k++
        }

        rowContents.push(<div key={i} style={{fontWeight: fontWeight}} className={'table-cell'}>{subcells}</div>)
      }else{
        rowContents.push(<div key={i} style={{fontWeight: fontWeight}} className={'table-cell'}>{content[i]}</div>)
      }
    }

    return (
      <div className={'table-row'}>
        {rowContents}
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