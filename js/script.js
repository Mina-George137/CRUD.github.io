let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescriptionInput = document.getElementById("productDescription");
let mainBtn = document.getElementById("mainButton");
let productsArray;
var globalIndex;
if (localStorage.getItem("products") != null) {
    productsArray = JSON.parse(localStorage.getItem("products"));
    displayProducts(productsArray);
} else {
    productsArray = [];
}

function checkMainBtn() {
    if (mainBtn.innerText == "update") {
        updateProduct(globalIndex);
        console.log("from the check : " + globalIndex);

        mainBtn.innerText = "Add product"
    } else {
        create();
    }
}

function create() {
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    };
    productsArray.push(product);
    localStorage.setItem("products", JSON.stringify(productsArray));
    clearForm();
    displayProducts(productsArray);
    console.log(productsArray);
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function displayProducts(productsToDisplay) {
    let box = " ";

    for (let i = 0; i < productsToDisplay.length; i++) {
        box += `
                <tr>
                    <td>${i}</td>
                    <td>${productsToDisplay[i].name}</td>
                    <td>${productsToDisplay[i].price}</td>
                    <td>${productsToDisplay[i].category}</td>
                    <td>${productsToDisplay[i].description}</td>
                    <td>
                    
                        <button onclick="changeFormForUpdate(${i})" class=" btn btn-outline-warning">Update</button>

                    </td>
                    <td>
                     <button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">Delete</button>

                    </td>
                </tr>`;
    }

    document.getElementById("tableBody").innerHTML = box;
}

function deleteProduct(productIndex) {
    productsArray.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productsArray));

    displayProducts(productsArray);
}

function searchProduct(searchTerm) {
    let foundedProducts = [];
    for (let i = 0; i < productsArray.length; i++) {
        if (productsArray[i].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            productsArray[i].category.toLowerCase().includes(searchTerm.toLowerCase())) {
            foundedProducts.push(productsArray[i]);
        } else {
            console.log("Not Found");
        }
    }

    displayProducts(foundedProducts);
}

function changeFormForUpdate(productIndex) {
    let index = productIndex;
    productNameInput.value = productsArray[productIndex].name;
    productPriceInput.value = productsArray[productIndex].price;
    productCategoryInput.value = productsArray[productIndex].category;
    productDescriptionInput.value = productsArray[productIndex].description;
    mainBtn.innerText = "update";
    productsArray.splice(index, 1);
    displayProducts(productsArray);
    globalIndex = index;
    console.log("from the change : " + globalIndex);
}

function updateProduct(productIndex) {
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    };
    productsArray.splice(productIndex, 0, product);
    localStorage.setItem("products", JSON.stringify(productsArray));
    clearForm();
    displayProducts(productsArray);
}