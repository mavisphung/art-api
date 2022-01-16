import * as bcrypt from "bcrypt";


export class Utils {

  static async hash(plain: string, salt: string | number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plain, salt, (err, hashed) => {
        if (err) return reject(err);
        return resolve(hashed);
      })
    })
  }
}