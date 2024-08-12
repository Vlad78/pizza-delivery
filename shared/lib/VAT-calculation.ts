export const calculatePriceWithoutVAT = (priceWithVAT: number, VAT: number) => {
    return Math.floor(priceWithVAT / (VAT / 100 + 1) * 100) / 100
}

export const calculateVAT = (priceWithoutVAT: number, VAT: number) => {

    return Math.floor(priceWithoutVAT * (VAT / 100) * 100) / 100
}