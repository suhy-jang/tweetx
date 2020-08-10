import { verifyToken } from './jwtToken';

const getUserId = (request, requireAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = verifyToken(token);
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }

  return null;
};

export { getUserId as default };
