
const returnDataApi = async (data) => {
    const itemsFormat = []
    const categories = []
    await data.map(item => {
        const dataItem = {
            id: item?.id,
            title: item?.title,
            price: {
                currency: item?.currency_id,
                amount: item?.installments?.amount,
                decimals: 0
            },
            picture: item?.thumbnail,
            condition: item?.condition,
            free_shipping: item?.shipping?.free_shipping
        }
        categories.push(item.category_id)
        itemsFormat.push(dataItem)
    })

    const requestFormat = {
        author: {
            name: "william",
            lastname: "garcia"
        },
        categories: categories,
        items: itemsFormat,
    }
    return requestFormat
}


const returnDataApiProduct = async (dataProduct, description) => {
    const requestFormat = {
        author: {
            name: "william",
            lastname: "garcia"
        },
        item: {
            id: dataProduct?.id,
            title: dataProduct?.title,
            price: {
                currency: dataProduct?.currency_id,
                amount: dataProduct?.price,
                decimals: 0
            },
            picture: dataProduct?.pictures?.[0]?.url,
            condition: dataProduct?.condition,
            free_shipping: dataProduct?.shipping?.free_shipping,
            sold_quantity: dataProduct.sold_quantity,
            description: description.plain_text
        }
    }
    return requestFormat
}

module.exports = { returnDataApi, returnDataApiProduct }
