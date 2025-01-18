    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    let editCustomerIndex = -1; 
    
    const customerTableBody = document.getElementById('customerTableBody');
    const customerForm = document.getElementById('customerForm');
    const customerModalLabel = document.getElementById('customerModalLabel');
    const customerName = document.getElementById('customerName');
    const customerGender = document.getElementById('customerGender');
    const customerPhone = document.getElementById('customerPhone');
    const customerAddress = document.getElementById('customerAddress');
   
    function renderCustomers() {
        customerTableBody.innerHTML = '';
    
        for (let i = 0; i < customers.length; i++) {
            const customer = customers[i];
            const row = `
                <tr>
                    <td>${i + 1}</td>
                    <td>${customer.name}</td>
                    <td>${customer.gender}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editCustomer(${i})" data-bs-toggle="modal" data-bs-target="#customerModal">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${i})">Delete</button>
                    </td>
                </tr>
            `;
            customerTableBody.innerHTML += row; 
        }
    }
    function resetForm() {
        customerForm.reset(); 
        editCustomerIndex = -1; 
        customerModalLabel.textContent = 'Add Customer'; 
    }
    customerForm.addEventListener('submit', function (e) {
        e.preventDefault(); 
    
        const newCustomer = {
            name: customerName.value,
            gender: customerGender.value,
            phone: customerPhone.value,
            address: customerAddress.value,
        };
    
        if (editCustomerIndex === -1) {
            
            customers.push(newCustomer);
        } else {
            
            customers[editCustomerIndex] = newCustomer;
        }
    
        localStorage.setItem('customers', JSON.stringify(customers));
    
        renderCustomers();
        resetForm();
    
        const modal = document.getElementById('customerModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    });
    
    function editCustomer(index) {
        editCustomerIndex = index; 
        const customer = customers[index];
        customerName.value = customer.name;
        customerGender.value = customer.gender;
        customerPhone.value = customer.phone;
        customerAddress.value = customer.address;
        customerModalLabel.textContent = 'Edit Customer'; 
    }
    
    function deleteCustomer(index) {
        const confirmDelete = confirm('Are you sure you want to delete this customer?');
        if (confirmDelete) {
            customers.splice(index, 1); 
            localStorage.setItem('customers', JSON.stringify(customers));
            renderCustomers(); 
        }
    }
    renderCustomers();
    