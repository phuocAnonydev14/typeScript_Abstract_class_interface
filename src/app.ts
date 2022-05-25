class ProductModel {
  id!: string;
  fullName!: string;
  price!: number;
}

interface CRUD {
  create(pro: ProductModel): void;
  read(): void;
  update(inputIdValue: string): void;
  delete(): void;
}

var inputId = document.querySelector("#id") as HTMLInputElement;
var inputName = document.querySelector("#name") as HTMLInputElement;
var inputPrice = document.querySelector("#price") as HTMLInputElement;

class ProductService {
  product: ProductModel[] = [];
  constructor() {
    let data = JSON.parse(localStorage.getItem("product")!)!;
    if (data) {
      this.product = data;
    } else {
      this.product = [];
    }
  }

  create(pro: ProductModel) {
    var check = 0;
    if (this.product.length > 1) {
      for (let i = 0; i < this.product.length; i++) {
        if (pro.id === this.product[i].id) {
          check++;
        }
      }
      if (check == 0) {
        this.product.push(pro);
        localStorage.setItem("product", JSON.stringify(this.product));
      } else {
        alert("duplicate ID");
      }
    } else {
      this.product.push(pro);
      localStorage.setItem("product", JSON.stringify(this.product));
    }
  }

  read() {
    var showList = document.querySelector("#list");
    let num = "";
    this.product.map((value) => {
      num += `<li><i class="fa-solid fa-hand-back-fist"></i> id : ${value.id} __&___ name: <span>${value.fullName}</span> __&__ price: ${value.price}$ 
              <i onclick="handleDelete(${value.id})" class="fa-solid fa-power-off"></i> <button onclick="updateItem(${value.id})" class="btn btn-dark">Update</button></li>`;
    });
    showList!.innerHTML = num;
    inputId.focus();
  }

  currentUpdate(inputIdValue: string) {
    for (let key in this.product) {
      if (this.product[key].id == inputIdValue) {
        var keyUpdate = key;
      }
    }
    // console.log(inputIdValue);
    inputId.value = this.product[parseInt(keyUpdate!)].id;
    inputName.value = this.product[parseInt(keyUpdate!)].fullName;
    inputPrice.value = this.product[parseInt(keyUpdate!)].price.toString();
  }
  update(inputIdValue: string, fullNameUpdate: string, priceUpdate: number) {
    for (let key in this.product) {
      if (this.product[key].id === inputIdValue) {
        var keyUpdate = key;
      }
    }
    this.product[parseInt(keyUpdate!)] = {
      id: inputIdValue,
      fullName: fullNameUpdate || this.product[parseInt(keyUpdate!)].fullName,
      price: priceUpdate || this.product[parseInt(keyUpdate!)].price,
    };
    localStorage.setItem("product", JSON.stringify(this.product));
  }

  delete(idProduct: string) {
    for (let key in this.product) {
      if (this.product[key].id === idProduct) {
        var keyUpdate = key;
      }
    }
    this.product.splice(parseInt(keyUpdate!), 1);
    localStorage.setItem("product", JSON.stringify(this.product));
  }
}

var productCb = new ProductService();
productCb.read();

function addItem() {
  let fullName = inputName.value;
  let price = parseInt(inputPrice.value);
  let id = inputId.value;

  if (!fullName || !id || !price) {
    alert("please fill in all and suitable before submit");
  } else {
    var object1: ProductModel = {
      id,
      fullName,
      price,
    };
    productCb.create(object1);
    location.reload();
  }
}

function updateItem(string) {
  productCb.currentUpdate(string);
  const buttonUpdate = document.querySelector(
    ".buttonUpdate"
  ) as HTMLButtonElement;
  buttonUpdate!.style.display = "block";
}

function handleDelete(idCheck: string) {
  productCb.delete(idCheck);
  location.reload();
}

function updateItemValue(valueId: string) {
  const fullName = inputName.value;
  const price = parseInt(inputPrice.value);
  const id = inputId.value;
  productCb.update(id, fullName, price);
  location.reload();
}
