function countChar(){
    let data = document.getElementById("para").value ;
   
    if(data){
    let now = data.match(/\w+/g).length;
    document.getElementById("characher").innerHTML = "Total number of character "+data.length+ "<br>Total number of words "+ now;
    }
    else{
        alert("please enter data in input field!!");
    }
}