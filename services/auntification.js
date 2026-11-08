const bcrypt = require('bcrypt');
const UserModel = require('../models/user.js');

class AuthService {
  static async register({ name, email, password, passwordConfirm }) {
    if (!name || !email || !password || !passwordConfirm) {
      throw new Error('поля должны быть заполнены');
    }

    // проверка памяти бедного или не совсем пользователя (я на 4Chan'е тред видел что если писать коменатрии то лучше запоминаешь спаггети которые писчал)
    if (password !== passwordConfirm) {
      throw new Error('пароли не совпадают');
    }

    //униKAЛьности (смешно если всё это неправильно и я снова буду переписывать коментарии)
    const candi = await UserModel.findByEmail(email);
    if (candi) {
      throw new Error('пользователь с таким e-mail уже зарегистрирован');
    }

    //хэширование пароля (Точно грязно не украл с видоса в тиктоке)
    const hashedPass = await bcrypt.hash(password, 10);

    // госпаде сохрани 
    return await UserModel.create({
      name,
      email,
      password: hashedPass //прикините если бы в мировых войнах послания бы тоже хешировали? 
    });
  }

  //короче заходит улитка в бар...
  static async login({ email, password }) {
    if (!email || !password) {
      throw new Error('ведите email и пароль');
    }

    // ищет там друга
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('не верный email или пароль');
    }

    // и расхеширует память (невероятно умная улитка)
    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      throw new Error('неверный e-mail или пароль');
    }

    return user;
  }
}

module.exports = AuthService;
//итого улитка нашла своего друга или нет? (никто не узнает правду)
