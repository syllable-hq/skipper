import React from 'react'
import ReactExport from 'react-data-export';

const dataSet1 = [
  {
      name: "Johson",
      amount: 30000,
      sex: 'M',
      is_married: true
  },
  {
      name: "Monika",
      amount: 355000,
      sex: 'F',
      is_married: false
  },
  {
      name: "John",
      amount: 250000,
      sex: 'M',
      is_married: false
  },
  {
      name: "Josef",
      amount: 450500,
      sex: 'M',
      is_married: true
  }
];

function ExportCSV() {
  return (
    <ReactExport.ExcelFile>
      <ReactExport.ExcelSheet data={dataSet1} name="Employees">
        <ReactExport.ExcelColumn label="Name" value="name"/>
        <ReactExport.ExcelColumn label="Wallet Money" value="amount"/>
        <ReactExport.ExcelColumn label="Gender" value="sex"/>
        <ReactExport.ExcelColumn label="Marital Status" value={(col) => col.is_married ? "Married" : "Single"}/>
      </ReactExport.ExcelSheet>
    </ReactExport.ExcelFile>
  );
}

export default ExportCSV;
