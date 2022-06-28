var app = new Vue({
  el: "#app",
  data: {
    products: [
      {
        id: 1,
        name: 'Papa',
        category: 'Verduras',
        amount: 20,
        price: 500,
        description: 'Papa pastusa, para realizar deliciosas recetas'
      },
      {
        id: 2,
        name: 'Carne de Cerdo',
        category: 'Carnes',
        amount: 30,
        price: 12000,
        description: 'Deliciosa carne de cerdo fresca'
      },
      {
        id: 3,
        name: 'Gaseosa',
        category: 'Bebidas',
        amount: 40,
        price: 1500,
        description: 'Delicioda bebida, refrescante de varios sabores'
      },
    ],

    newProducts:[],

    categories:['Carnes', 'Verduras', 'Bebidas', 'Frutas', 'Lacteos'],
    

    sales: [],

    sale:{
      id: '',
      products: [],
      total: 0
    },

    product:{
      
      name: '',
      category: '',
      amount: '',
      price: '',
      description: ''

    },

    option: 1,
    prod: null,
    cart:{
      id: '',
      name: '',
      category: '',
      amount: '',
      price: '',
      total: ''
    },



  },
  methods: {


    loadForm(){
      
      let x = document.getElementById("option1");
      let y = document.getElementById("option2");
      let z = document.getElementById("option3");
      x.classList.add('active');
      y.classList.remove('active');
      z.classList.remove('active');
      this.option = 1;

    },

    loadSale(){
      let x = document.getElementById("option1");
      let y = document.getElementById("option2");
      let z = document.getElementById("option3");
      y.classList.add('active');
      x.classList.remove('active');
      z.classList.remove('active');
      this.option = 2;

    },

    loadProduct(){
      let x = document.getElementById("option1");
      let y = document.getElementById("option2");
      let z = document.getElementById("option3");
      z.classList.add('active');
      y.classList.remove('active');
      x.classList.remove('active');
      this.option = 3;
    },

    saveProduct(){

      if(this.product.name == '' || this.product.category == '' || this.product.price == '' || this.product.amount == '' ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingresa correctamente los datos del formulario',
         
        });
        return;

      }

      this.newProducts.push({
        id: this.newProducts.length +1,
        name: this.product.name,
        category: this.product.category,
        amount: this.product.amount,
        price: this.product.price,
        description: this.product.description,


      });

      Swal.fire(
        'Se Guardo correctamente el producto',
        'Presiona el botón',
        'success'
      );
      this.updateLocalStorage();

      this.product.name = '';
      this.product.category = '';
      this.product.amount = '';
      this.product.price = '';
      this.product.description = '';





    },

    deleteProd(index){
      Swal.fire({
        title: '¿Estas seguro de elimar el producto?',
        text: "Se eliminará el producto y no podras rehacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Elimando el producto!',
            'Se ha eliminado correctamente el producto',
            'success'
          );

          this.newProducts.splice(index);
          this.updateLocalStorage();
          
      

      
      
         
        }
      })

    },

    selectProd(prod){
      
      this.product.id = prod.id
      this.product.name = prod.name;
      this.product.category = prod.category;
      this.product.amount = prod.amount;
      this.product.price = prod.price;
      this.product.description = prod.description;

      let btn = document.getElementById("update");
      btn.classList.remove('disabled')

    },

    updateProd(){
      

      
      this.newProducts.forEach(p => {
        if(p.id == this.product.id)  
        {
          p.name = this.product.name,
          p.category =  this.product.category,
          p.price =  this.product.price,
          p.amount =  this.product.amount,
          p.description =  this.product.description
        }
        
      });

      this.product.id = ''
      this.product.name = '';
      this.product.category = '';
      this.product.amount = '';
      this.product.price = '';
      this.product.description = '';
      this.updateLocalStorage();
      let btn = document.getElementById("update");
      btn.classList.add('disabled')
    },


    addCart(){
      if(this.prod == null || this.cart.amount <  1 ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registra un producto',
         
        });
        return;

      }

      if(this.cart.amount > this.prod.amount){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Has superado el maximo de productos disponibles en stock',
         
        });
        return;

      }


      this.cart.id = this.sale.products.length +1;
      this.cart.name = this.prod.name;
      this.cart.category = this.prod.category;
      this.cart.price = this.prod.price;
      this.cart.total = this.cart.amount * this.prod.price;

      let total = this.cart.total
      this.sale.total += total;

      this.prod.amount -= this.cart.amount;

      this.sale.products.push({
        id: this.cart.id,
        name: this.cart.name,
        category: this.cart.category,
        price: this.cart.price,
        amount: this.cart.amount,
        total: this.cart.total,
      }
        
      );

      this.cart.id = '';
      this.cart.name ='';
      this.cart.category = '';
      this.cart.price = '';
      this.cart.amount = '';
      this.cart.total = '';
      this.prod = null;
      return;
     



      
    },


    addSale(){

      if(this.sale.products.length<= 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes registrar por lo menos un producto',
         
        });
        return;

       

      }

      this.sale.id = this.sales.length +1;

      let x = this.sale;

      this.sales.push({
        id: this.sale.id,
        products: this.sale.products,
        total: this.sale.total
      });

      this.updateLocalStorage();

      Swal.fire(
        'Se registro correctamente la compra',
        'Presiona el botón',
        'success'
      );

      this.sale.id = '';
      this.sale.products = [];
      this.sale.total = 0;
      
      


    },

    cancelSale(){
      Swal.fire({
        title: '¿Estas seguro de cancelar la venta?',
        text: "Se eliminará tu carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Cancelando la venta!',
            'Has cancelado la venta correctamente',
            'success'
          );
          this.sale.id = '';
      this.sale.products = [];
      this.sale.total = 0;

      this.cart.id = '';
      this.cart.name ='';
      this.cart.category = '';
      this.cart.price = '';
      this.cart.amount = '';
      this.cart.total = '';
      

      this.updateProducts();
      this.prod = {};
      
         
        }
      })
      

    },

    updateProducts(){
      if(localStorage.getItem('products') != null){
        this.newProducts = JSON.parse(localStorage.getItem('products'));
    }
    else{
        this.listData();
    }

    },


    listData(){
      this.newProducts = this.products;
      
  },

  updateLocalStorage(){
    localStorage.setItem('products', JSON.stringify(this.newProducts));
    localStorage.setItem('categories', JSON.stringify(this.categories));
    localStorage.setItem('sales', JSON.stringify(this.sales));

  },



  },

  created() {

    if(localStorage.getItem('products') != null){
        this.newProducts = JSON.parse(localStorage.getItem('products'));
    }
    else{
        this.listData();
    }

    if(localStorage.getItem('sales') != null){
      this.sales = JSON.parse(localStorage.getItem('sales'));
    }
    
    if(localStorage.getItem('categories') != null){
      this.categories = JSON.parse(localStorage.getItem('categories'));
    }
    
   

},
});

  //v-for="i in array" es una directiva de bue que permite recorrer un arreglo
