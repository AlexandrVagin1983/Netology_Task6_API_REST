const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
    constructor(title = '', description = '', authors = '', favorite ='',  fileCover = '', fileName = '', id = uuid()) {
        this.title = title
        this.description = description
        this.authors     = authors
        this.favorite    = favorite
        this.fileCover   = fileCover
        this.fileName    = fileName
        this.id          = id
    }
}

const books = {
    book: [
        new Book('Сборник задач по физике.', 'Задачи по физике для учащихся 9 классов.', 'Перышкин А.В', ),
        new Book('Мастер и Маргарита.', 'Классичечкий роман.', 'Булгаков М.А.', ),
        new Book('Метро', ' Постапокалиптический роман, популярная литература.', 'Глуховский Д.А.', ),
    ],
}

const app = express()
app.use(express.json())

app.get('/api/books', (req, res) => {
    const {book} = books
    res.json(book)
})

app.get('/api/books/:id', (req, res) => {
    const {book} = books
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(book[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

app.post('/api/books/', (req, res) => {
    
    const {book} = books
    const {title, description, authors, favorite, fileCover, fileName} = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    book.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const {book} = books
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if (idx !== -1){
        book[idx] = {
            ...book[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        }

        res.json(book[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {book} = books
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)
     
    if(idx !== -1){
        book.splice(idx, 1)
        res.json(true)
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.post('/api/user/login', (req, res) => {
    

    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT)