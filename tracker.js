document.addEventListener("DOMContentLoaded", loadData);

function setIncome() {
    let income = document.getElementById("income").value;
    if (income === "") return;
    localStorage.setItem("income", income);
    document.getElementById("income").value = "";
    loadData();
}

function addExpense() {
    let name = document.getElementById("expenseName").value;
    let amount = document.getElementById("expenseAmount").value;
    if (name === "" || amount === "") return;
    
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ name, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    loadData();
}

function loadData() {
    let income = localStorage.getItem("income") || 0;
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let list = document.getElementById("expenseList");
    let totalExpenses = 0;
    list.innerHTML = "";
    
    expenses.forEach((expense, index) => {
        totalExpenses += parseFloat(expense.amount);
        let li = document.createElement("li");
        li.innerHTML = `${expense.name}: $${expense.amount} <button onclick="deleteExpense(${index})">X</button>`;
        list.appendChild(li);
    });
    
    let balance = income - totalExpenses;
    document.getElementById("totalIncome").textContent = income;
    document.getElementById("totalAmount").textContent = totalExpenses;
    document.getElementById("balance").textContent = balance;
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    loadData();
}
