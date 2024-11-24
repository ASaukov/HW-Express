const Book = require("..//models/book");

const getBooks = (request, response) => {
  return Book.find({})
    .then((book) => {
      response.status(200).json(book);
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findById(book_id)
    .then((book) => {
      response.status(200).json(book);
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

const createBook = (request, response) => {
  return Book.create({ ...request.body })
    .then((book) => {
      response.status(201).json(book);
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  const data = request.body;
  return Book.findByIdAndUpdate(book_id, data, {
    new: true,
    runValidators: true,
  })
    .then((book) => {
        if (!book) {
            return response.status(404).send("book not found")
        }
      response.status(200).json(book);
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndDelete(book_id)
    .then((book) => {
      if (!book) {
        return response.status(404).send("book not found");
      }
      response.status(200).json("book deleted");
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

module.exports = { getBooks, getBook, createBook, deleteBook, updateBook };
