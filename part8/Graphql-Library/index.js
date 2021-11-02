const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
const Book = require("./models/Book");
const Author = require("./models/Author");
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/library";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("Error connecting to mongodb", err.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        let booksToReturn = await Book.find({ author: args.author });
        return booksToReturn;
      }
      if (args.genre) {
        let booksToReturn = await Book.find({ genres: { $in: [args.genre] } });
        return booksToReturn;
      }
      let booksToReturn = await Book.find({});
      return booksToReturn;
    },
    allAuthors: () => {
      return Author.find({});
    },
  },
  Mutation: {
    addBook: (root, args) => {
      if (!args.title || !args.author || !args.published || !args.genres) {
        throw new UserInputError("missing arguments");
      } else if (!Author.findOne({ name: args.author })) {
        throw new UserInputError("author not found");
      } else if (!Book.findOne({ title: args.title })) {
        throw new UserInputError("book already exists");
      } else if (args.author.length < 2) {
        throw new UserInputError("author name must be at least 2 characters");
      } else if (args.title.length < 2) {
        throw new UserInputError("title must be at least 2 characters");
      } else if (args.published < 0) {
        throw new UserInputError("published must be a positive number");
      } else if (args.genres.length < 1) {
        throw new UserInputError("at least one genre must be provided");
      } else {
        const book = new Book({ ...args });
        if (Author.findOne({ name: args.author })) {
          book.author = Author.findOne({ name: args.author });
        } else {
          const author = new Author({ name: args.author });
          author.save();
          book.author = author;
        }
        return book.save();
      }
    },
    editAuthor: (root, args) => {
      const author = Author.findOne({ name: args.name });
      if (author) {
        author.born = args.born;
        return author.save();
      }
      return null;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
