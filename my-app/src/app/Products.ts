    export class Product {
        public _id: any = null;
        public name: string = "";
        public price: number = 0; // Corrected to be a number
        public des: string = "";
        public img: string = "";
        public cate: string = "";
        public pettype: string = "";
        public quantity: number = 1;  // Default quantity set to 1

        constructor(
            _id: any = null,
            name: string = "",
            price: number = 0, // Ensure this is a number
            des: string = "",
            img: string = "",
            cate: string = "",
            pettype: string = "",
            quantity: number = 1  // Allow setting initial quantity through constructor
        ) {
            this._id = _id;
            this.name = name;
            this.price = price; // Ensure this is set as a number
            this.des = des;
            this.img = img;
            this.cate = cate;
            this.pettype = pettype;
            this.quantity = quantity;
        }
    }
    export interface Cart {
            items: Product[]; // An array of Product objects
            addItem(item: Product): void; // Function to add an item to the cart
            removeItem(itemId: any): void; // Function to remove an item from the cart by its ID
            calculateTotal(): number; // Function to calculate the total price of all items in the cart
            // ... any additional methods or properties relevant to a cart
        }