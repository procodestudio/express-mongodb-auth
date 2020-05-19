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

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      throw new Error('Username and password are required');
    }

    const user = await User
      .findOne({ email })
      .select('+password');

    if (!user) {
      // eslint-disable-next-line
      throw { code: 401, message: 'User not found' };
    }

    if (!await user.validatePassword(password)) {
      // eslint-disable-next-line
      throw { code: 401, message: 'Your password is wrong' };
    }

    const accessToken = user.generateToken();

    res.set({ 'content-token': accessToken }).json();
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ error: error.message });
  }
};

export default { store, auth };
