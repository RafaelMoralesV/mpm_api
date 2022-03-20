import jwtgenerator from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
* Generates a new JWT Token.
* @param {UserAttributes} user
* @return {Promise<String>}
*/
export function generateToken(user: any): String {
  return jwtgenerator.sign(
      {id: user.id},
      process.env.JWT_SECRET,
  );
}
/**
 * Compares an encrypted password with an unencrypted one.
 * @param {string} password Password to check
 * @param {string} hashed Hashed password to check against
 * @return {boolean}
 */
export async function checkPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}
