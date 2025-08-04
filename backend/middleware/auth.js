import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const proteger = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-senha');
      return next();
    } catch (error) {
        console.error('Token inválido:', error.message);
      return res.status(401).json({ message: 'Não autorizado. Token inválido.' });
    }
  }
  return res.status(401).json({ message: 'Não autorizado. Token não fornecido.' });
};
