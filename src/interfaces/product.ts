interface Product {
    id          : number, 
    category    : string,
    description : string,
    image       : string, 
    price       : number,
    title       : string,
    rating      : {
        count   : number,
        rate    : number
    }
}

