const db = require('../db')

const User = db.define('user', {
  id: {
    type: db.Sequelize.UUID,
    primaryKey: true,
    defaultValue: db.Sequelize.UUIDV4
  },
  email: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

User.confirmCredentials = function(credentials) {
  return User.findOne({
    where: {
      email: credentials.email
    }
  }).then(user => {
    if (!user) {
      throw new Error('User not found!')
    } else if (user.password !== credentials.password) {
      throw new Error('Incorrect password!')
    } else {
      return user
    }
  })
}

module.exports = User
