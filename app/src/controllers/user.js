import User from '../database/models/user';

const store = (req, res) => {
  try {
    const { body } = req;

    User
      .create(body)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: error.message });
      });
  } catch (error) {
    res
      .status(error.code)
      .json({ error: error.message });
  }
};

export default { store };
