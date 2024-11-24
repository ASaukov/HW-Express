const User = require("..//models/user");

const getUsers = (request, response) => {
  return User.find({})
    .then((user) => {
      response.status(200).json(user);
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  return User.findById(user_id)
    .then((user) => {
      response.status(200).json(user);
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

const createUser = (request, response) => {
  return User.create({ ...request.body })
    .then((user) => {
      response.status(201).json(user);
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

const updateUser = (request, response) => {
  const { user_id } = request.params;
  const data = request.body;
  return User.findByIdAndUpdate(user_id, data, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
        if (!user) {
            return response.status(404).send("user not found")
        }
      response.status(200).json(user);
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndDelete(user_id)
    .then((user) => {
      if (!user) {
        return response.status(404).send("user not found");
      }
      response.status(200).json("User deleted");
    })
    .catch((e) => {
      response.status(500).send(e.message);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
