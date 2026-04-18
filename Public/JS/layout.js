function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('hidden');
}

document.addEventListener('click', function (e) {
    const menu = document.getElementById('userMenu');
    if (!menu) return;

    if (!e.target.closest('.fa-user')) {
        menu.classList.add('hidden');
    }
});

function viewCart() {

    let token = decodeURIComponent(document.cookie);
    
    if(token === 'token=' || !token)
    {
        window.location.href = "/auth";
    }

    $.ajax({
        type: 'GET',
        url: '/cart/viewCart',
        success: function (data) {
            $('#main-content').html(data);
        }
    })
}

function updateQty(pid, action)
{
    $.ajax({
        type: 'POST',
        url: '/cart/updateQty',
        data: {
            pid,
            action
        },
        success: () => {
            viewCart();
            showToast("Cart Updated Successfully", "success");
        }
    });
}

function getAllOrders() {
    $.ajax({
        type: 'GET',
        url: '/order/getAll',
        success: (data) => {
            $('#main-content').html(data);
        }
    })
}

function getOrders()
{
    let token = decodeURIComponent(document.cookie);
    
    if(token === 'token=' || !token)
    {
        window.location.href = "/auth";
    }

    $.ajax({
        type: 'GET',
        url: '/order/view',
        success: (data) => {
            $('#main-content').html(data);
        }
    })
}

function orderSubmit(event)
{
    event.preventDefault();

    $.ajax({
        type: 'POST',
        url: '/order/',
        success: () => {
            loadProducts();
            showToast("Product Ordered Successfully", "success");
        },
        error: () =>{
            showToast("Something Went Wrong While Ordering Product", "error");
        }
    })
}

function addToCart(event) {
    event.preventDefault();

    let token = decodeURIComponent(document.cookie);
    
    if(token === 'token=' || !token)
    {
        window.location.href = "/auth";
    }

    let form = $(event.target);

    $.ajax({
        type: 'POST',
        url: "/cart/addToCart",
        data: form.serialize(),
        success: function () {
            loadProducts();
            showToast("Product added to cart 🛒", "success");
        },
        error: function (err) {
            alert("Failed To Add The Product To Your Cart");
            showToast("Something went wrong while adding product to cart 🛒", "error");
        }
    })    
}

function submitAddProduct(event) {
    event.preventDefault();

    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);

    $.ajax({
        type: 'POST',
        url: "/admin/addProduct",
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            productList();
            showToast("Product added Successfully", "success");
        },
        error: function (err) {
            showToast("Something went wrong while adding the product", "error");
            console.log(err);
        }
    });
}

function submitEditProduct(event)
{
    event.preventDefault();

    const form = document.getElementById('editProductForm');
    const formData = new FormData(form);

    $.ajax({
        type: 'POST',
        url: "/admin/editProduct",
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            productList();
            showToast("Product Details Updated Successfully", "success");

        },
        error: function (err) {
            showToast("Something Went Wrong While Updateing The Product Details", "error");
            console.log(err);
        }
    })
}

function loadProducts(para = "asc") {
    const referringUrl = document.referrer;
    $.ajax({
        type: 'GET',
        url: `/product/${para}`,
        success: function (data) {
            $('#main-content').html(data);
        }
    });
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const target = cookies.find(row => row.startsWith(name + '='));
    return target ? target.split('=')[1] : null;
}

function addProduct() {
    $.ajax({
        type: 'GET',
        url: '/admin/addProduct',
        success: function (data) {
            $('#main-content').html(data);
        }
    });
}

function editProduct(productId) {
    $.ajax({
        type: 'POST',
        url: '/admin/getEditProductView',
        data: { id: productId },
        success: function (html) {
            $('#main-content').html(html);
        },
        error: function (err) {
            alert("Failed to load edit view");
            console.error(err);
        }
    });
}

function deleteProduct(productId) {
    if (!confirm("Are You Sure You Want To Remove This Product?"))
        return;

    $.ajax({
        type: 'POST',
        url: "/admin/deleteProduct",
        data: { id: productId },
        success: function () {
            productList();
            showToast("Product Removed Successfully", "success");
        },
        error: function (err) {
            showToast("Failed To Remove Product", "error");
            console.log(err);
        }
    })
}


function productList() {
    $.ajax({
        type: 'GET',
        url: '/admin/products',
        success: function (data) {
            $('#main-content').html(data);
        }
    });
};

let dl = document.getElementById('productsortddl')
loadProducts();