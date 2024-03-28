const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (_parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id);
        return userData;
      }
      throw new AuthenticationError('You are not authenticated');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { runValidators: true, new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You are not authenticated');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { runValidators: true, new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You are not authenticated');
    },
  },
};

module.exports = resolvers;
