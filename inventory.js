const inventoryPage = document.querySelector('#inventory-page')

const searchBox = document.querySelector('#search-box')
const brandCheckBoxes = document.querySelectorAll('.brand-filters>input[type=checkbox]')
const categoryCheckBoxes = document.querySelectorAll('.category-filters>input[type=checkbox]')
const searchBTN = document.querySelector('#search-btn')
const resetBTN = document.querySelector('#reset')

const topBrandFilter = document.querySelector('#top-brands')
const topCategoryFilter = document.querySelector('#top-categories')
const topPriceFilter = document.querySelector('#top-prices')
const allBrandsCheckBox = document.querySelector('input[value="All brands"]')
const allCategoriesCheckBox = document.querySelector('input[value="All categories"]')


console.log(allBrandsCheckBox)

const showCarsContainer = document.querySelector('#show-cars')

const carCards = (list) => {

    showCarsContainer.innerHTML = ''

    list.forEach((car) => {
        const galleryCard =

            `
                    <div class="gallery-cards" id="${car.name}">
                        <div class="image-container"><img src="./Sorces/pngimages/${car.image}" alt=""></div>
                        <div class="car-description">
                            <h4> ${car.name}</h4>
                            <p>${car.year}</p>
                            <h3>${car.price}</h3>
                            <div class="extraCar-info">
                                <span>
                                    <i class="fa-solid fa-gas-pump"></i>
                                    <p>${car.fuel}</p>
                                </span>
                                <span>
                                    <i class="fa-sharp fa-regular fa-transmission"></i>
                                    <p>${car.gear}</p>
                                </span>
                                <span>
                                    <i class="fa-etch fa-solid fa-gauge"></i>
                                    <p>${car.KM}</p>
                                </span>
                            </div>
                        </div>
                    </div>
        
        `

        showCarsContainer.innerHTML += galleryCard
    })
}



carCards(carsData)

const inventoryCards = document.querySelectorAll('.gallery-cards')


showCarsContainer.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.gallery-cards')


    if (clickedCard) {
        // console.log(localStorage.getItem('currentUser'))
        if (localStorage.getItem('currentUser') === null) {
            let singing = confirm('⚠ please sign up or login to set order!')
            if(singing) {

                inventoryPage.style.display = 'none'
                signPage.style.display = 'flex'
                
            }
            return;
        }



            let cardName = clickedCard.id

            let selectedCar = carsData.find(car => car.name === cardName)

            console.log(selectedCar)

            if (selectedCar) {
                orderPage.innerHTML = `
            
         <section id="orderCar">
            <img src="./Sorces/pngimages/${selectedCar.image}" alt="">

            <h3>${selectedCar.brand} ${selectedCar.name}</h3>
            <button id="orderBTN">Set Order</button>
            </section>

            <section id="carDetails">
            
            <div class="orderTitle">
            <h1>${selectedCar.name}</h1>
            <p>${selectedCar.year}</p>
            </div>

            <div class="orderTitle" id="orderPrice">
            <h4>${selectedCar.price}</h4>
            </div>

            <div class="orderInfo">
            <h4>Engine</h4>
            <p>${selectedCar.Engine}</p>
            </div>
            
            <div class="orderInfo">
            <h4>Transmission</h4>
            <p> ${selectedCar.gear}</p>
            </div>

            <div class="orderInfo">
                <h4>fuel Type</h4>
                <p>${selectedCar.fuel}</p>
                </div>
                
            <div class="orderInfo">
                <h4>Mileage</h4>
                <p>${selectedCar.KM}</p>
                </div>
                
                </section>
                
                
                `


                const orderBtn = document.querySelector('#orderBTN')

                orderBtn.addEventListener('click', () => {
                    alert(`Success! your order for: " ${selectedCar.brand} ${selectedCar.name}" has been registered. Our team will contact you soon!`)
                })
            }

            inventoryPage.style.display = 'none'
            orderPage.style.display = 'flex'
    }
})





const categoryList = ['All categories', 'SUV', 'Sedan', 'Coupe']

const getUniqeFilters = () => {
    const brands = ['All brands', ...new Set(carsData.map(car => car.brand))]
    console.log(brands)

    return brands
}




const selectOptionsRender = () => {
    const uniqeBrands = getUniqeFilters()

    topBrandFilter.innerHTML = ''
    uniqeBrands.forEach((brand) => {
        topBrandFilter.innerHTML += `<option>${brand}</option>`
    })

    topCategoryFilter.innerHTML = ''
    categoryList.forEach((category) => {
        topCategoryFilter.innerHTML += `<option>${category}</option>`
    })

}


selectOptionsRender()

const filter = () => {
    let currentBrand = topBrandFilter.value
    let currentCategory = topCategoryFilter.value
    let currentPrice = topPriceFilter.value

    let result = carsData.filter((car) => {
        let isBrandMatch = (currentBrand == 'All brands') || (currentBrand == car.brand)
        let isCategoryMatch = (currentCategory == 'All categories') || (currentCategory == car.category)
        return isBrandMatch && isCategoryMatch
    })

    if (currentPrice === 'Max Price') {
        result.sort((a, b) => {
            let PriceA = Number(a.price.replaceAll('$', ''))
            let PriceB = Number(b.price.replaceAll('$', ''))
            return PriceB - PriceA
        })
    }

    else if (currentPrice === 'Min Price') {
        result.sort((a, b) => {
            let PriceA = Number(a.price.replaceAll('$', ''))
            let PriceB = Number(b.price.replaceAll('$', ''))
            return PriceA - PriceB
        })
    }

    carCards(result)
}





let sideCheckedBoxes = () => {


    let checkedBrandFilters = []
    brandCheckBoxes.forEach((checkbox) => {

        if (checkbox.checked == true) {
            checkedBrandFilters.push(checkbox.value)
        }
    })

    // console.log(checkedBrandFilters)



    let checkedCategoryFilters = []
    categoryCheckBoxes.forEach((checkbox) => {

        if (checkbox.checked == true) {
            checkedCategoryFilters.push(checkbox.value)
        }
    })

    // console.log(checkedCategoryFilters)




    if (checkedBrandFilters.length == 0) {
        allBrandsCheckBox.checked = true
    }
    else {
        allBrandsCheckBox.checked = false
    }
    if (checkedCategoryFilters.length == 0) {
        allCategoriesCheckBox.checked = true
    }
    else {
        allCategoriesCheckBox.checked = false
    }

    let result = carsData.filter((car) => {

        let brandMatch = (checkedBrandFilters.length === 0) || (checkedBrandFilters.includes(car.brand))
        let categoryMatch = (checkedCategoryFilters.length == 0) || (checkedCategoryFilters.includes(car.category))

        return brandMatch && categoryMatch
    })


    carCards(result)
}


brandCheckBoxes.forEach((checkbox) => {

    checkbox.addEventListener('change', () => {
        sideCheckedBoxes()

    })
})



categoryCheckBoxes.forEach((checkbox) => {

    checkbox.addEventListener('change', () => {
        sideCheckedBoxes()

    })
})





resetBTN.addEventListener('click', () => {
    topBrandFilter.value = 'All brands'
    topCategoryFilter.value = 'All categories'
    topPriceFilter.value = 'All Prices'

    brandCheckBoxes.forEach(checkbox => checkbox.checked = false)

    categoryCheckBoxes.forEach(checkbox => checkbox.checked = false)

    allBrandsCheckBox.checked = true
    allCategoriesCheckBox.checked = true

    carCards(carsData)
})






topBrandFilter.addEventListener('change', filter)
topCategoryFilter.addEventListener('change', filter)
topPriceFilter.addEventListener('change', filter)


carCards(carsData)
getUniqeFilters()


let showMessage = () => {
    alert('This option will be available in the next version! please use from sideBar or top filters for now.')
}


searchBox.addEventListener('click', showMessage)
searchBTN.addEventListener('click', showMessage)