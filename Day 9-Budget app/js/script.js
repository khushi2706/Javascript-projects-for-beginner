class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = window.localStorage['itemList'];
    if (!this.itemList) {
      let Ilist = [];
      localStorage.setItem('itemList', JSON.stringify(Ilist));
      }
      else{
        this.itemList = JSON.parse(this.itemList);
      }
    this.itemID = window.localStorage['itemId'];
    if(!this.itemID){
      localStorage.setItem('itemId',0)
    }
    this.Budget = window.localStorage['Budget'];
    if(!this.Budget){
      localStorage.setItem('Budget',0)
    }
    
  }
  //submit budfet method
  submitBudgetForm(){
    const value = this.budgetInput.value;

    if(value ==="" || value<0){
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>value can not be empty or negative</p>`
      const self = this;
      setTimeout(function() {
        self.budgetFeedback.classList.remove("showItem");
      }, 3000);
    }
    else{
      this.budgetAmount.textContent = value;
      this.Budget = value;
      localStorage.setItem("Budget",this.Budget);
      this.budgetInput.value = "";
      this.showBalance();
    }
  }
  //expense form
  submitExpenseForm(){
     const expenseValue = this.expenseInput.value;
     const amountValue = this.amountInput.value;

     if(expenseValue === '' || amountValue === '' || amountValue <0)
     {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>value can not be empty or negative</p>`
      const self = this;
      setTimeout(function() {
        self.budgetFeedback.classList.remove("showItem");
      }, 4000);
     }
     else{
        let amount = parseInt(amountValue);
        this.expenseInput.value = "";
        this.amountInput.value = "";

        let expense = {
          id:this.itemID,
          title:expenseValue,
          amount:amount,
        }
        this.itemID++;
        //update in local storage
        localStorage.setItem('itemId',this.itemID);
        this.itemList.push(expense);
        localStorage.setItem('itemList', JSON.stringify(this.itemList));
        this.addExpense(expense);
        this.showBalance();
     }
  }
  // add expense
  addExpense(expense){
    const div = document.createElement('div');
    div.classList.add('expense');
    //show expense
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

    <div class="expense-icons list-item">

     <span class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </span>
     <span class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </spans>
    </div>
   </div>`
   this.expenseList.appendChild(div);
  }
  //edit expense
  editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);
    //remove from list;
    let expense = this.itemList.filter(function(item) {
      return item.id == id;
    });
   // show value
   this.expenseInput.value = expense[0].title;
   this.amountInput.value = expense[0].amount;
   // delete item
   let tempList = this.itemList.filter(function(expense) {
     return expense.id != id;
   });

   this.itemList = tempList;
   localStorage.setItem('itemList', JSON.stringify(this.itemList));
   this.showBalance();
 }

 //delete expense
 deleteExpense(element) {
  let id = parseInt(element.dataset.id);
  // console.log(id);
  let parent = element.parentElement.parentElement.parentElement;
  // remove from dom
  this.expenseList.removeChild(parent);

  // delete item
  let tempList = this.itemList.filter(function(expense) {
    return expense.id != id;
  });

  this.itemList = tempList;
  console.log("deleting");
  localStorage.setItem('itemList', JSON.stringify(tempList));
  this.showBalance();
}

  // show balance
  showBalance(){
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;

     if (total<0) {
       this.balance.classList.remove("showGreen","showBlack");
       this.balance.classList.add("showRed")
     }
     if (total>0) {
      this.balance.classList.remove("showRed","showBlack");
      this.balance.classList.add("showGreen")
    }
    else{
      this.balance.classList.remove("showGreen","showRed");
      this.balance.classList.add("showBlack")
    }
  }

  // total expense
  totalExpense(){
    let total = 0;
    if(this.itemList.length>0){
      this.itemList.forEach(expese => {
        total+= expese.amount
      }); 
    }
    this.expenseAmount.textContent = total;
    return total
  }

  //display data
   displayData(){
    const ui = new UI();
    ui.budgetAmount.textContent = ui.Budget;
  
    ui.itemList.forEach(ele => {
      this.addExpense(ele);
    });

    this.showBalance();
  }
}



function eventListers(){

  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  // new instance of class
  const ui = new UI()

  ui.displayData();

  // budget form submit
  budgetForm.addEventListener("submit",function(event){
    event.preventDefault();
    ui.submitBudgetForm();
  })
  // expense form
  expenseForm.addEventListener("submit",function(event){
    event.preventDefault();
    ui.submitExpenseForm();
  })
  // expense list
  expenseList.addEventListener("click",function(event){
    if (event.target.parentElement.classList.contains("edit-icon")) {
      ui.editExpense(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense(event.target.parentElement);
    }
  })
}



document.addEventListener('DOMContentLoaded',function(){
  eventListers();
})