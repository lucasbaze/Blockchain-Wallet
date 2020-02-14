import React, {useState, useEffect} from 'react';

const Transactions = ({ username, allUserNames }) => {
	const [allTransactions, setAllTransactions] = useState([])
	const [transaction, setTransaction] = useState({
		recipient: '',
		amount: 0
	})
	
	useEffect(() => {
		async function getTransactions(){
			const response = await fetch('http://localhost:5000/chain')
			const data = await response.json()
			const userTransactions = data.chain.reduce((acc, block) => {
				const blockTransactions = block.transactions.filter(transaction => allUserNames.includes(transaction.recipient))
				
				return acc.concat(...blockTransactions)
			}, [])
			setAllTransactions(userTransactions)
		}

		getTransactions();
	}, [allUserNames])

	const handleChange = (e) => {
		setTransaction({...transaction, [e.target.name]: e.target.value})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(transaction)
		const response = await fetch('http://localhost:5000/transaction/new', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({...transaction, sender: username})
		})
		console.log(response)
	} 

	return (
		<>
		<div style={{marginTop: 10}}>
			<form onSubmit={handleSubmit}>
					<h1>Send Lamba Coins!</h1>
				<div>
				<label>Recipient</label>
				<input type="text" name="recipient" id="recipient" onChange={handleChange}  value={transaction.recipient}/>
				</div>
				<div>
				<label>Amount</label>
				<input type="number" name="amount" id="amount" onChange={handleChange}  value={transaction.amount}/>
				</div>
				<button type="submit">Send Coins!</button>
			</form>
		</div>
		<div>
			{allTransactions.length > 0 && allTransactions.map(transaction => (
				<div style={{display: 'flex', justifyContent: 'space-between', margin: 20}}>
					<div>
						Sender: {transaction.sender}
					</div>
					<div>
						Recipient: {transaction.recipient}
					</div>
					<div>
						Amount: {transaction.amount}
					</div>
				</div>
			))

			}
		</div>
		<div>
			<h2>Balance</h2>
			{allTransactions.length > 0 && allTransactions.reduce((acc, curr) => {
				return acc + parseInt(curr.amount)
			}, 0)}
		</div>
		</>
	)
}

export default Transactions