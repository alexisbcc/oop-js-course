const orderTable = (state) => {
  const baseColumnNames = Object.keys(state.arrayData[0]);
  const columnNames = [...new Set([...state.firstColumnsNames, ...baseColumnNames])];
  return {
    rows: state.arrayData.map(item =>
      columnNames.reduce((acc, currentKey) => ({
        ...acc,
        [currentKey]: item[currentKey]
      }), {})
    )
  }
};

const generateTableHeadCells = (state) => ({
  headCells: Object.entries(state.arrayData[0]).map(element => ({
    id: element[0],
    numeric: (typeof element[1]) === "number" ? true : false,
    label: state?.newHeadCellLabels[element[0]] ? state.newHeadeCellLabels[element[0]]
                                               : element[0],
    minWidth: 170
  }))
});

const visibleColumns = (state) => {
  const reducer = (acc, key, index) => ({
    ...acc,
    [key]: (index < state.numberOfVisisbleColumns) ? true : false
  })
  return {visibleColumns: Object.keys(state.arrayData[0]).reduce(reducer, {})}
};


const orderedTable = (arrayData, { numberOfVisisbleColumns=5, firstColumnsNames=[], newHeadCellLabels={} }={}) => {

  let state = {
    arrayData,
    ...{
      numberOfVisisbleColumns,
      firstColumnsNames,
      newHeadCellLabels
    }
  }

  return {
    ...orderTable(state),
    ...generateTableHeadCells(state),
    ...visibleColumns(state)
  }
};

let data = [
  {telephone: 5555555, name: 'Raziel', age: 55},
  {age: 12, telephone: 4575878, name: 'James'},
  {name: 'Legolas', age: 25, telephone: 7495138},
  {name: 'Harry', age: 24, telephone: 9983646},
  {age: 27, name: 'Karmen', telephone: 4976831},
  {name: 'Hector', age: 88, telephone: 2306898},
  {name: 'Kain', age: 33, telephone: 7819177}
]

let newTable = orderedTable(data);
console.log(Object.keys(newTable.rows[0]));
