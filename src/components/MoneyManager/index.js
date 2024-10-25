import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

/* const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
] */

const history = []
// Write your code here
class MoneyManager extends Component {
  state = {
    title: '',
    amount: 0,
    type: 'INCOME',
    balance: 0,
    income: 0,
    expense: 0,
    historylist: history,
  }

  onclicktitle = event => {
    this.setState({title: event.target.value})
  }

  onclickAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  onclicktype = event => {
    this.setState({type: event.target.value})
  }

  deleted = (id, amount, type) => {
    const {historylist, balance, income, expense} = this.state
    const filt = historylist.filter(each => each.id !== id)
    let newBalance = balance
    let newIncome = income
    let newExpense = expense

    // Update balance, income, and expense based on the transaction type
    if (type === 'INCOME') {
      newIncome -= amount
      newBalance -= amount
    } else {
      newExpense -= amount
      newBalance += amount
    }
    this.setState({
      historylist: filt,
      balance: newBalance,
      expense: newExpense,
      income: newIncome,
    })
  }

  onSubmitTransaction = event => {
    event.preventDefault()
    const {title, amount, type, balance, income, expense} = this.state

    let newBalance = balance
    let newIncome = income
    let newExpense = expense

    // Update balance, income, and expense based on the transaction type
    if (type === 'INCOME') {
      newIncome += amount
      newBalance += amount
    } else {
      newExpense += amount
      newBalance -= amount
    }

    const newTransaction = {
      title,
      amount,
      type,
      id: v4(),
    }

    this.setState(prevState => ({
      historylist: [...prevState.historylist, newTransaction],
      balance: newBalance,
      income: newIncome,
      expense: newExpense,
      title: '', // Clear input fields
      amount: '',
      type: 'INCOME', // Reset type to 'income'
    }))
  }

  render() {
    const {
      historylist,
      balance,
      income,
      expense,
      title,
      amount,
      type,
    } = this.state
    return (
      <div className="bg">
        <div className="namecontainer">
          <h1>Hi,Sivarubini</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div>
          <MoneyDetails balance={balance} income={income} expense={expense} />
        </div>
        <div className="lastcard">
          <form className="form" onSubmit={this.onSubmitTransaction}>
            <h1>Add Transaction</h1>
            <div>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                type="input"
                placeholder="Title"
                id="title"
                value={title}
                onChange={this.onclicktitle}
              />
            </div>
            <div>
              <label htmlFor="amount">AMOUNT</label>
              <br />
              <input
                type="input"
                placeholder="Amount"
                id="amount"
                value={amount}
                onChange={this.onclickAmount}
              />
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="INCOME"
                  checked={type === 'INCOME'}
                  onChange={this.onclicktype}
                  className="in"
                />
                Income
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="EXPENSES"
                  checked={type === 'EXPENSES'}
                  onChange={this.onclicktype}
                  className="in"
                />
                Expenses
              </label>
            </div>
            <div>
              <button type="submit" className="b">
                Add
              </button>
            </div>
          </form>
          <div className="history">
            <h1>History</h1>
            <ul>
              <li className="fl">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
                <div>
                  <p className="h1" />
                </div>
              </li>
              {historylist.map(eachitem => (
                <TransactionItem
                  eachitem={eachitem}
                  deleted={this.deleted}
                  key={eachitem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
