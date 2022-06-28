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

    categories:['Carnes', 'Verduras', 'Bebidad', 'Frutas', 'Lacteos'],
    

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
    prod: {},
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
      this.option = 1

    },

    loadSale(){
      this.option = 2

    },

    loadProduct(){
      this.option = 3
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
        'Se Guardo correctamente la mascota',
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

    addCart(){
      if(this.prod == null || this.cart.amount <  1 ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registra un producto',
         
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
      this.prod = {};
      return;
     



      
    },


    addSale(){

      if(this.sale.products.length){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes registrar por lo menos un producto',
         
        });
        return;

       

      }

      this.sale.id = this.sales.length +1;

      this.sales.push(this.sale);

      this.updateLocalStorage();

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
