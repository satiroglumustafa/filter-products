const mainFunct = () => {

    const rootElement = document.querySelector('#root')


    rootElement.insertAdjacentHTML('beforebegin',
        `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                    <select class="filterSelect">
                <option value="4">4.0 ve üzeri</option>
                <option value="3">3.0 ve üzeri</option>
                <option value="2">2.0 ve üzeri</option>
                <option value="1">1.0 ve üzeri</option>
            </select><button class="filterBtn">Filtrele</button>
                    </div>
                </div>
            </div>
        `
    )

    const getDatas = async () => {
        try {
            const request = await fetch('https://fakestoreapi.com/products')
            const jsonResult = await request.json();
            
            rootElement.insertAdjacentHTML('beforeend',
                `
                     <div class="product-area">
                         <div class="container">
                             <div class="row">
                                  
                             </div>
                         </div>
                     </div>
                 `
            )

            const insertArea = document.querySelector('.product-area .row')

            const beforeFilterFunct = () => {
                jsonResult.forEach(product => {
                    insertArea.insertAdjacentHTML('beforeend',
                        `
                            <div class="col-12 col-md-6 col-lg-4">
                                <div class="product-box">
                                    <div class="product-price">${product.price}<sup>TL</sup></div>
                                    <div class="product-img">
                                        <img src= "${product.image}" />
                                    </div>
                                    <div class="product-detail">
                                        <span class="product-category">Ürün Kategorisi: ${product.category}</span>
                                        <h3 class="product-title">${product.title}</h3>
                                        <div class="product-rating">${product.rating.rate}</div> 
                                    </div>   
                                </div>
                            <div>
                        `)
                });
            }
            beforeFilterFunct();

            const afterFilterFunct = (minRating) => {

                const urunPuan = minRating;
                insertArea.innerHTML = ''; 
                const filteredProducts = jsonResult.filter(product => product.rating.rate >= urunPuan)

                filteredProducts.forEach(element => {
                    insertArea.insertAdjacentHTML('beforeend',
                        `
                            <div class="col-12 col-md-6 col-lg-4">
                                <div class="product-box">
                                    <div class="product-price">${element.price}<sup>TL</sup></div>
                                    <div class="product-img">
                                        <img src= "${element.image}" />
                                    </div>
                                    <div class="product-detail">
                                        <span class="product-category">Ürün Kategorisi: ${element.category}</span>
                                        <h3 class="product-title">${element.title}</h3>
                                        <div class="product-rating">${element.rating.rate}</div> 
                                    </div>   
                                </div>
                            <div>
                        `)
                });
            }

            const filterBtn = document.querySelector('.filterBtn')
            const selectFilt = document.querySelector('.filterSelect')

            filterBtn.addEventListener('click', function () {
                const value = selectFilt.value
                if (value) {
                    afterFilterFunct(Number(value));
                }
            })

        } catch (error) {
            console.log("Hata:" + error)
        }
    }

    getDatas()
}

export { mainFunct }
