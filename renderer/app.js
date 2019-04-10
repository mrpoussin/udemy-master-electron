// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron')

const items = require('./items')
const menu = require('./menu')

// change selected item with arrow keys
$(document).keydown(e => {
    switch (e.key) {
        case 'ArrowUp':
            items.changeItem('up')
            break
        case 'ArrowDown':
            items.changeItem('down')
            break
    }
})

// open our modal
$('.open-add-modal').click(() => {
    $('#add-modal').addClass('is-active')
    $('#item-input').focus();
})

// close our modal
$('.close-add-modal').click(() => {
    $('#add-modal').removeClass('is-active')
})

// handle add item
$('#add-button').click(() => {
    let newItemURL = $('#item-input').val()
    if (newItemURL) {

        if (!/^https:\/\//.test(newItemURL)) {
            newItemURL = 'https://' + newItemURL
        }

        // disable modal UI to prevent multiple enters of same input
        $('#item-input').prop('disabled', true)
        $('#add-button').addClass('is-loading')
        $('.close-add-modal').addClass('is-disabled')
        
        // send URL to main process for IPC
        ipcRenderer.send('new-item', newItemURL)
    }
})

// listen for new item to be sent back from main
ipcRenderer.on('new-item-success', (e, item) => {
    
    // add item to items array
    items.toReadItems.push(item)

    // save items to local storage
    items.saveItems()
    
    // add item
    items.addItem(item)

    // close and reset modal
    $('#add-modal').removeClass('is-active')
    $('#item-input').prop('disabled', false).val('')
    $('#add-button').removeClass('is-loading')
    $('.close-add-modal').removeClass('is-diabled')

    // if first item being added, select it
    if (items.toReadItems.length === 1) {
        $('.read-item:first()').addClass('is-active')
    }
})

// simulate add item on enter key
$('#item-input').keyup((e) => {
    if (e.key === 'Enter') {
        $('#add-button').click();
    }
})

// and close modal on escape key
$('#add-modal').keyup((e) => {
    if (e.keyCode === 27) {
        $('.close-add-modal').click();
    }
})

// close modal if we click on the background
$('.modal-background').click(() => {
    $('.close-add-modal').click();
})

// add items when app loads
if (items.toReadItems.length) {
    items.toReadItems.forEach(items.addItem)
    $('.read-item:first()').addClass('is-active')
}

// filter items by title
$('#search').keyup((e) => {
    
    // get current #search value
    let filter = $(e.currentTarget).val()
    
    $('.read-item').each((i, el) => {
        $(el).text().toLowerCase().includes(filter) ? $(el).show() : $(el).hide()
    }) 
})