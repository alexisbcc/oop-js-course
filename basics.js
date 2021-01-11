// const rows = new TableBuilder(dataArray).deleteTableColumns(columnsToDelete)
//                                         .replaceTableColumnsNames(newColumnnames)
//                                         .convertTableData(columnValueCallback)
//                                         .orderTableColumns(firstColumnsNames)
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
    return this;
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
    return this;
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
    return this;
  };
  // firstColumnsNames = ['key1', 'key2', ...]
  orderTableColumns(firstColumnsNames) {
    const baseColumnNames = Object.keys(this.rows[0]);
    const columnNames = [...new Set([...firstColumnsNames, ...baseColumnNames])];
    this.rows = this.rows.map(item =>
        columnNames.reduce((acc, currentKey) => ({
          ...acc,
          [currentKey]: item[currentKey]
        }), {})
      )
    return this;
  };
}

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
const deletedConvertedOrderedTable = (dataArray, modifiers, { numberOfVisisbleColumns=5, newHeadCellLabels={} }={}) => {
  const {
    columnsToDelete,
    columnValueCallback,
    firstColumnsNames
  } = modifiers;
  const rows = new TableBuilder(dataArray).deleteTableColumns(columnsToDelete)
                                          .convertTableData(columnValueCallback)
                                          .orderTableColumns(firstColumnsNames)
                                          .rows
  const state = {
    rows,
    ...{
      numberOfVisisbleColumns,
      newHeadCellLabels
    }
  }
  return {
    rows,
    ...generateTableHeadCells(state),
    ...visibleColumns(state)
  }
};

const deletedConvertedOrderedTable = (dataArray, modifiers, { numberOfVisisbleColumns=5, newHeadCellLabels={} }={}) => {
  const {
    columnsToDelete,
    newColumnnames,
    columnValueCallback,
    firstColumnsNames
  } = modifiers;
  const rows = new TableBuilder(dataArray).deleteTableColumns(columnsToDelete)
                                          .replaceTableColumnsNames(newColumnnames)
                                          .convertTableData(columnValueCallback)
                                          .orderTableColumns(firstColumnsNames)
                                          .rows
  const state = {
    rows,
    ...{
      numberOfVisisbleColumns,
      newHeadCellLabels
    }
  }
  return {
    rows,
    ...generateTableHeadCells(state),
    ...visibleColumns(state)
  }
};

const orderedBasicTable = (dataArray, { firstColumnsNames=[] }={}) => {
  return new TableBuilder(dataArray).orderTableColumns(firstColumnsNames)
                                          .rows
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
const modifiers = {
  columnsToDelete: ['info'],
  columnValueCallback: {age: (item) => item.toFixed(2)},
  firstColumnsNames: ['name']
}
let table1 = deletedConvertedOrderedTable(data, modifiers);
let table2 = orderedBasicTable(data);
//let newTable = new TableBuilder(data);
console.log(table2);


// newTable.deleteTableColumns(['info'])
//         .replaceTableColumnsNames({age: 'Edad'})
//         .convertTableData({Edad: (item) => item.toFixed(2)})
//         .orderTableColumns(['name'])
// console.log(newTable.rows);

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
