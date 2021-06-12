// TODO import models
//! const { Post, User, Comment } = require('../models');

// * DH - Example model for formattedData from previos task.
module.exports = {
  format_time: (date) => date.toLocaleTimeString(),
  format_date: (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  },
};
