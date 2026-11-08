const users = [];  //временный стикер на лоб(ну типо аналогия смешно "хаха")

class UserModel {
  // поиск e-mail
  static async findByEmail(email) {
    return users.find(user => user.email === email.toLowerCase());
  }

  // сохранить нового узерка(пользователя (кто это читает?))
  static async create(userData) {
    const newUser = { //вот бы люди так же легко создавались 
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password // получаем хешированный пороль от самого сокровенного и тд
    };
    users.push(newUser);
    return newUser;
  }
}

module.exports = UserModel;
