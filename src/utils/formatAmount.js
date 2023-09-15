export const formatAmount = (str) => {
    const numToUse = str && typeof str == 'string'
        ? Number(str?.replace(/\,/g, '')).toLocaleString('en-US')
        : Number(str?.toString()?.replace(/\,/g, '')).toLocaleString('en-US');
    return `${numToUse}.00`
}

export const priceString = (price, option) =>
    price &&
    parseInt(price)?.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        ...option,
    });
