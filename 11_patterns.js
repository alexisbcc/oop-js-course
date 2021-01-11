
class TableBuilder {
  constructor(rows){
    this.rows = rows;
  }
  // columnsToDelete = ['key1', 'key2', ...]
  deleteTableColumns(columnsToDelete) {
    const restColumns = Object.keys(this.rows[0])
      .filter(item => !columnsToDelete.includes(item));
    this.rows = this.rows.map(item => restColumns.reduce((acc, key) => ({
      ...acc,
      [key]: item[key]
    }), {}));
  }
  // newColumnnames = {key1: key1NewName, key2: key2NewName, ...}
  replaceTableColumnsNames(newColumnnames) {
    this.rows = this.rows.map(item =>
      Object.entries(item).reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          ...{
            [newColumnnames[currentValue[0]] || currentValue[0]]: currentValue[1]
          }
        }), {})
    );
  };

  // columnValueCallback = {columnName: callback, ...}
  convertTableData(columnValueCallback) {
    const columnNames = Object.keys(this.rows[0]);
    this.rows = this.rows.map(item =>
      columnNames.reduce((acc, currentKey) => ({
        ...acc,
        [currentKey]: columnValueCallback[currentKey] ? columnValueCallback[currentKey](item[currentKey])
                                                      : item[currentKey]
      }), {})
    )
  };

  orderTableColumns(firstColumnsNames) {
    const baseColumnNames = Object.keys(this.rows[0]);
    const columnNames = [...new Set([...firstColumnsNames, ...baseColumnNames])];
    this.rows = this.rows.map(item =>
        columnNames.reduce((acc, currentKey) => ({
          ...acc,
          [currentKey]: item[currentKey]
        }), {})
      )
  };
}


// state.columnsToDelete = ['key1', 'key2', ...]
const deleteTableColumns = (state) => {
  const restColumns = Object.keys(state.rows[0])
    .filter(item => !state.columnsToDelete.includes(item));
  return state.rows.map(item => restColumns.reduce((acc, key) => ({
    ...acc,
    [key]: item[key]
  }), {}));
};

// state.newColumnnames = {key1: key1NewName, key2: key2NewName, ...}
const replaceTableColumnsNames = (state) => {
  return state.rows.map(item =>
    Object.entries(item).reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        ...{
          [state?.newColumnnames[currentValue[0]] || currentValue[0]]: currentValue[1]
        }
      }), {})
  );
};

// state.columnValueCallback = {columnName: callback, ...}
const convertTableData = (state) => {
  const columnNames = Object.keys(state.rows[0]);
  return state.rows.map(item =>
    columnNames.reduce((acc, currentKey) => ({
      ...acc,
      [currentKey]: state?.columnValueCallback[currentKey] ? state.columnValueCallback[currentKey](item[currentKey])
                                                           : item[currentKey]
    }), {})
  )
};

const orderTableColumns = (state) => {
  const baseColumnNames = Object.keys(state.rows[0]);
  const columnNames = [...new Set([...state.firstColumnsNames, ...baseColumnNames])];
  return state.rows.map(item =>
      columnNames.reduce((acc, currentKey) => ({
        ...acc,
        [currentKey]: item[currentKey]
      }), {})
    )
};

// Table feature generators
const generateTableHeadCells = (state) => ({
  headCells: Object.entries(state.rows[0]).map(element => ({
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
  return {visibleColumns: Object.keys(state.rows[0]).reduce(reducer, {})}
};

// Table builders
const orderedTable = (rows, { numberOfVisisbleColumns=5, firstColumnsNames=[], newHeadCellLabels={} }={}) => {
  let state = {
    rows: orderTableColumns({rows, firstColumnsNames}),
    ...{
      numberOfVisisbleColumns,
      firstColumnsNames,
      newHeadCellLabels
    }
  }
  return {
    rows: state.rows,
    ...generateTableHeadCells(state),
    ...visibleColumns(state)
  }
};

const orderedBasicTable = (rows, { firstColumnsNames=[] }={}) => {
  let state = {
      rows,
      firstColumnsNames,
  }
  return orderTableColumns(state);
};

let data = [
  {telephone: 5555555, name: 'Raziel', age: 55, info: 'lala'},
  {age: 12, telephone: 4575878, name: 'James', info: 'lala'},
  {name: 'Legolas', age: 25, telephone: 7495138, info: 'lala'},
  {name: 'Harry', age: 24, telephone: 9983646, info: 'lala'},
  {age: 27, name: 'Karmen', telephone: 4976831, info: 'lala'},
  {name: 'Hector', age: 88, telephone: 2306898, info: 'lala'},
  {name: 'Kain', age: 33, telephone: 7819177, info: 'lala'}
]

const columns = ['age'];


let newTable = new TableBuilder(data);
console.log(newTable.rows);
newTable.deleteTableColumns(['info'])
console.log(newTable.rows);
newTable.replaceTableColumnsNames({age: 'Edad'})
console.log(newTable.rows);
newTable.convertTableData({
  Edad: (item) => item.toFixed(2)
})
console.log(newTable.rows);
newTable.orderTableColumns(['name'])
console.log(newTable.rows);

// console.log(convertTableData({
//   rows: data,
//   columnValueCallback: {
//     age: (item) => item.toFixed(2)
//   }
// }));
// console.log(deleteTableColumns({rows: data, columnsToDelete: ['age']}));
// console.log(data);
// console.log(replaceTableColumnsNames({rows: data, newColumnnames: {age: 'Edad', name: 'Nombre'}}));
// console.log(newTable);
// console.log(Object.keys(newTable.rows[0]));
// console.log(Object.keys(newTable.rows[1]));
