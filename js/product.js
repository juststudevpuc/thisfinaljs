
   let products = JSON.parse(localStorage.getItem('products')) || [];
   let editIndex = -1; 
   
   const productTableBody = document.getElementById('productTableBody');
   const productForm = document.getElementById('productForm');
   const productModalLabel = document.getElementById('productModalLabel');
   const productName = document.getElementById('productName');
   const productCategory = document.getElementById('productCategory');
   const productPrice = document.getElementById('productPrice');
   const productStock = document.getElementById('productStock');
   
   function renderProducts() {
       productTableBody.innerHTML = ''; 
   
       for (let i = 0; i < products.length; i++) {
           const product = products[i];
           const row = `
               <tr>
                   <td>${i + 1}</td>
                   <td>${product.name}</td>
                   <td>${product.category}</td>
                   <td style="color: red;">$${product.price.toFixed(2)}</td>
                   <td>${product.stock}</td>
                   <td>
                       <button class="btn btn-primary btn-sm" onclick="editProduct(${i})" data-bs-toggle="modal" data-bs-target="#productModal">Edit</button>
                       <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
                   </td>
               </tr>
           `;
           productTableBody.innerHTML += row; 
       }
   }
   
   function resetForm() {
       productForm.reset(); 
       editIndex = -1; 
       productModalLabel.textContent = 'Add Product';
   }
   
   productForm.addEventListener('submit', function (e) {
       e.preventDefault(); 
   
       const newProduct = {
           name: productName.value,
           category: productCategory.value,
           price: parseFloat(productPrice.value),
           stock: parseInt(productStock.value),
       };
   
       if (editIndex === -1) {
           products.push(newProduct);
       } else {
           products[editIndex] = newProduct;
       }
   
       localStorage.setItem('products', JSON.stringify(products));
   
       renderProducts();
       resetForm();
   
       const modal = document.getElementById('productModal');
       const modalInstance = bootstrap.Modal.getInstance(modal);
       modalInstance.hide();
   });
   
   function editProduct(index) {
       editIndex = index; 
       const product = products[index]; 
       productName.value = product.name;
       productCategory.value = product.category;
       productPrice.value = product.price;
       productStock.value = product.stock;
       productModalLabel.textContent = 'Edit Product';
   }
   

   function deleteProduct(index) {
       const confirmDelete = confirm('Are you sure you want to delete this product?');
       if (confirmDelete) {
           products.splice(index, 1);
           localStorage.setItem('products', JSON.stringify(products)); 
           renderProducts(); 
       }
   }
   renderProducts();
   