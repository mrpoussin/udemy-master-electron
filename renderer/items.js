// track items with array
exports.toReadItems = JSON.parse(localStorage.getItem('toReadItems')) || []

// Save items to localstorage
exports.saveItems = () => {
    localStorage.setItem('toReadItems', JSON.stringify(this.toReadItems))
}

// toggle selected item
exports.selectItem = event => {
    $('.read-item').removeClass('is-active')
    $(event.currentTarget).addClass('is-active')
}

// change selected item with arrows
exports.changeItem = direction => {

    // get current active item
    let activeItem = $('.read-item.is-active')

    // check direction and get next or prev 
    let newItem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item')

    // only if item exists, make selection change
    if (newItem.length) {
        activeItem.removeClass('is-active')
        newItem.addClass('is-active')
    }
}

// open item in default browser
window.openInBrowser = () => {
    // only if item exists
    if (!this.toReadItems.length) return

    // get selected item
    const targetItem = $('.read-item.is-active')

    // open in browser
    require('electron').shell.openExternal(targetItem.data('url'))
}

// Window function
// Delete item by index
window.deleteItem = i => {
    
    // if i isnt passed, set it to selected item
    if (i === undefined) {
        i = ($('.read-item.is-active').index() - 1)
    }
    
    // remove item from dom
    $('.read-item').eq(i).remove()

    // remove from toReadItems array
    this.toReadItems = this.toReadItems.filter((item, index) => {
        return index !== i
    })

    // update local storage
    this.saveItems()

    // select one item up (prev item in toReadItem array)
    if (this.toReadItems.length) {

        // if 1st item in list deleted, select new 1st item, else prev
        const newIndex = (i === 0) ? 0 : i - 1

        // assign active class to new index
        $('.read-item').eq(newIndex).addClass('is-active')
    
    // else we dont have any more items
    // so show our No Items text
    } else {
        $('#no-items').show()
    }
}

// open item for readding
window.openItem = () => {

    // only if items have been added
    if (!this.toReadItems.length) return

    // get selected item 
    const targetItem = $('.read-item.is-active')

    // get items content url
    // we encode it so we can pass it as a query param to readerWinURL
    const contentURL = encodeURIComponent(targetItem.data('url'))

    // get item index to pass to proxy window
    const itemIndex = targetItem.index() - 1 

    // reader window url
    const readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}&itemIndex=${itemIndex}`

    // open item in new proxy BrowserWindow
    const readerWin = window.open(readerWinURL, targetItem.data('title'))
}

// add item
exports.addItem = item => {

    // hide no items message
    $('#no-items').hide()

    // new item html
    let itemHTML = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
                        <figure class="image has-shadow is-64x64 thumb">
                            <img src="${item.screenshot}">
                        </figure>
                        <h2 class="title is-4 column">${item.title}</h2>
                    </a>`

    // append to read-list
    $('#read-list').append(itemHTML)

    // attach select event handler
    $('.read-item')
        .off('click', 'dblclick')
        .on('click', this.selectItem)
        .on('dblclick', window.openItem)
}