import './App.css';
import { css } from '@emotion/css';
import { Modal, Button, Input, Select, DatePicker } from "antd";
import { TransactionRow } from './Components/TransactionRow';
import { useState } from 'react';

const mockData = [
  {
    id: "1",
    type: "expense",
    category: "Shopping",
    amount: -300,
    date: "19 JUL 2001",
  },
  {
    id: "2",
    type: "income",
    category: "Salary",
    amount: 15000,
    date: "21 NOV 2001",
  }
];

function App() {

  const [createModalVisible, setcreateModalVisible] = useState(false);
  const [transactions, setTransactions] = useState(mockData);
  const [category, setCategory] = useState("Shopping");
  const [date, setDate] = useState();
  const [amount, setAmount] = useState(0);
  const [search, setSearch] = useState("");  
  const onDeleteItem = (id) => {setTransactions(transactions.filter((tx) => tx.id !== id))};
  
  const filteredTransaction = transactions.filter(tx => tx.category.includes(search));

  return (
    <div className={css`
    background-color: aliceblue;
    height: 100vh;
    width: 100vw;
    padding-top: 32px;
    `}
    >
      <div className={css`
        width: 80%;
        margin: auto;
        max-width: 500px;
      `}
      >
        <div className={css`
          display: flex;
        `}
        >
          <Input placeholder="Search by text" onChange={(e) => { setSearch(e.target.value); }} />
          <Button onClick={() => setcreateModalVisible(true)}>Create</Button>
        </div>
        {filteredTransaction.map((tx) => (
          <TransactionRow tx={tx} onDeleteItem = {onDeleteItem} />
        ))}        

      </div>
      <Modal title="List" open={createModalVisible}
        onOk={() => {
          const incomeCategory = ["Salary"];          
          const type = incomeCategory.includes(category) ? "income" : "expense";
          const newTx = {
            id: transactions.length + 1,
            type,
            category,
            date,
            amount,
          };
          console.log(newTx);          
          setTransactions([...transactions, newTx]);
          setcreateModalVisible(false);
        }}
        onCancel={() => {
          setcreateModalVisible(false);
        }}
      >
        <div className={css`
          display: flex;
          flex-direction: column;
          height: 120px;
          justify-content: space-between;
        `}
        >
          <Select
            placeholder="Select your category"
            onChange={(e) => {
              setCategory(e);
            }}
          >
            <Select.Option value="Shoping">Shopping</Select.Option>
            <Select.Option value="Salary">Salary</Select.Option>
          </Select>
          <DatePicker
            onChange={(e) => {
              setDate(e.format("DD MMM YYYY"));
            }}
          />
          <Input 
          placeholder="Input Amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }} 
          />
        </div>
      </Modal>
    </div>
  );
}

export default App;
