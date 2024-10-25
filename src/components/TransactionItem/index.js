// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachitem, deleted} = props
  const {title, amount, type, id} = eachitem
  const ondelete = () => {
    deleted(id, amount, type)
  }

  return (
    <li className="fl">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button
        type="button"
        onClick={ondelete}
        data-testid="delete"
        className="but"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="img"
        />
      </button>
    </li>
  )
}
export default TransactionItem
