function Stack(array) {
    this.array = [];
    if (array) this.array = array;
}

Stack.prototype.getBuffer = function () {
    return this.array.slice();
}

Stack.prototype.isEmpty = function () {
    return this.array.length == 0;
}

Stack.prototype.peak = function () {
    return this.array[this.array.length - 1];
}

Stack.prototype.first = function () {
    return this.array[0];
}

Stack.prototype.push = function (value) {
    this.array.push(value);
    console.log("pushed");
}

Stack.prototype.pop = function (value) {
    console.log("popped");
    return this.array.pop(value);

}

Stack.prototype.shift = function (value) {
    console.log("shifted");
    return this.array.shift(value)
}

Stack.prototype.splice = function (value) {
    console.log("spliced");
    return this.array.splice(value, 1)
}

function stackSearch(stack, element) {
    var bufferArray = stack.getBuffer();

    var bufferStack = new Stack(bufferArray)

    while (!bufferStack.isEmpty()) {
        if (bufferStack.pop() == element) {
            return true;
        }
    }
    return false;
}

function printStack(stack) {
    document.getElementById("output-list").innerHTML = "";
    for (var i = 0; i < stack.length; i++) {
        document.getElementById("output-list").innerHTML += "<li>" + bufferArray[i] + "</li>";
    }
}

var myStack = new Stack([]);
var retrieved = localStorage.getItem("bufferArray");

var bufferArray = myStack.getBuffer();
var bufferStack = new Stack(bufferArray);

//Listens for enter being pressed, fires relevant button when pressed
var addInput = document.getElementById("add-to-todo");
var removeInput = document.getElementById("remove-from-todo");

addInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        console.log("ENTER");
        document.getElementById("add-btn").click();
    }
});

removeInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        console.log("ENTER");
        document.getElementById("remove-specific-btn").click();
    }
});


//Funciton for adding input to stack

function addVariable() {
    var toAdd = document.getElementById("add-to-todo").value;
    bufferStack.push(toAdd);
    printStack(bufferArray);
    document.getElementById("add-to-todo").value = "";
}

//Function to remove last item for stack, if stack empty return alert
function removeLast() {
    if (bufferStack.isEmpty()) {
        alert("Your to-do list is already empty - nothing to do except put your feet up!")
        printStack(bufferArray);
        return;
    }
    else {
        var poppedItem = bufferStack.pop();
        printStack(bufferArray);
    }
}
//Function to remove first item for stack, if stack empty return alert
function removeFirst() {
    if (bufferStack.isEmpty()) {
        alert("Your to-do list is already empty - nothing to do except put your feet up!")
        printStack(bufferArray);
        return;
    }
    else {
        var shiftedItem = bufferStack.shift();
        printStack(bufferArray);
    }
}
//Function to remove specific item user requests from stack
function removeSpecific() {
    if (bufferStack.isEmpty()) {
        alert("Your to-do list is already empty - nothing to do except put your feet up!")
    } else {
        var toRemove = document.getElementById("remove-from-todo").value;
        console.log(toRemove);
        console.log(typeof (toRemove));

        for (let i = 0; i < bufferArray.length; i++) {
            if (bufferArray[i].toUpperCase() == toRemove.toUpperCase()) {
                bufferStack.splice(i, 1);
                printStack(bufferArray);
                document.getElementById("remove-from-todo").value = "";
                return;
            }
        }
        alert("Could not find " + toRemove + " in your list. Please try again")
    }
}

//Function to remove all items from stack by popping them until stack is empty
function clearList() {
    if (bufferStack.isEmpty()) {
        alert("Your to-do list is already empty - nothing to do except put your feet up!");
    } else {
        while (!bufferStack.isEmpty()) {
            bufferArray.pop();
        }
        printStack(bufferArray);
    }
}

//Function to save stack in local storage so it remains after session ends
function saveList() {
    var jsonArray = JSON.stringify(bufferArray);
    localStorage.setItem("bufferArray", jsonArray);
}

//Function for retrieving stack from local storage
function loadList() {
    var retrieved = JSON.parse(localStorage.getItem("bufferArray"));
    for (var i = 0; i < retrieved.length; i++) {
        var listItem = retrieved[i];
        bufferArray.push(listItem);
    }
    printStack(retrieved);
}