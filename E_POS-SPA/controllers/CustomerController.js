/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/
    //select the save button and bind a click event for it

var customers = []; // global scope (Store all the customer records)

//Button Events
$("#btnCustomer").click(function () {
    //local scope // function scope

    //select all the four text fields and then get their typed values
    let customerID = $("#txtCustomerID").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();

    // alert(customerID+" "+ customerName+" "+customerAddress+" "+customerSalary);

    //Put all of these values inside a named container
    // customer

    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    }

    //add the customer object to the array
    customers.push(customerObject);


    // console.log(customers);

    loadAllCustomers();

    bindRowClickEvents();

    loadAllCustomersForOption();

});

$("#btnCusDelete").click(function () {
    let deleteID = $("#txtCustomerID").val();

    let option = confirm("Do you really want to delete customer id :" + deleteID);
    if (option){
        if (deleteCustomer(deleteID)) {
            alert("Customer Successfully Deleted..");
            setTextfieldValues("", "", "", "");
        } else {
            alert("No such customer to delete. please check the id");
        }
    }
});

$("#btnGetAll").click(function () {
    loadAllCustomers();
});

$("#btnUpdate").click(function () {
    let customerID = $("#txtCustomerID").val();
    let response = updateCustomer(customerID);
    if (response) {
        alert("Customer Updated Successfully");
        setTextfieldValues("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});


//load all customers
function loadAllCustomers() {
    //remove all the table body content before adding data
    $("#tblCustomer").empty();


    // get all customer records from the array
    for (var customer of customers) {
        // console.log(customer);// customer object

        // add those data to the table row
        // var row= "<tr><td>"+customer.id+"</td><td>"+customer.name+"</td><td>"+customer.address+"</td><td>"+customer.salary+"</td></tr>";

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;

        //then add it to the table body of customer table
        $("#tblCustomer").append(row);
    }
}

function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let salary = $(this).children(":eq(3)").text();
        // console.log(id, name, address, salary);

        //setting table details values to text fields
        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerSalary').val(salary);

    });
}

$("#txtCustomerID").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#txtCustomerID").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            setTextfieldValues(customer.id, customer.name, customer.address, customer.salary);
        } else {
            alert("There is no cusotmer available for that " + typedId);
            setTextfieldValues("", "", "", "");
        }
    }
});

function setTextfieldValues(id, name, address, salary) {
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerSalary").val(salary);
}


function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#txtCustomerID").val();
        customer.name = $("#txtCustomerName").val();
        customer.address = $("#txtCustomerAddress").val();
        customer.salary = $("#txtCustomerSalary").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }

}
