const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v1: uuid } = require("uuid");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/library";
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretsshhh";
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const booksToReturn = await Book.find({ author: args.author });
        return booksToReturn;
      }
      if (args.genre) {
        const booksToReturn = await Book.find({
          genres: { $in: [args.genre] },
        });
        return booksToReturn;
      }
      const booksToReturn = await Book.find({});
      return booksToReturn;
    },
    allAuthors: async () => {
      const authorsToReturn = await Author.find({}).populate("books");
      return authorsToReturn;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      } else if (
        !args.title ||
        !args.author ||
        !args.published ||
        !args.genres
      ) {
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
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book.save();
      }
    },
    editAuthor: (root, args) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      } else if (!args.name || !args.born) {
        throw new UserInputError("missing arguments");
      } else if (args.name.length < 2) {
        throw new UserInputError("name must be at least 2 characters");
      } else if (args.born < 0) {
        throw new UserInputError("born must be a positive number");
      } else {
        const author = Author.findOne({ name: args.name });
        if (author) {
          author.born = args.born;
          return author.save();
        }
        return null;
      }
    },
    createUser: (root, args) => {
      const user = new User({ ...args });
      return user.save();
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
