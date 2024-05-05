export interface ProductData {
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