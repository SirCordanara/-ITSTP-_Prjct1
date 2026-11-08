import * as taskService from '../services/task.js';
// я - художник, коменты мой холст. разнообразие деятельности...

export async function getTasks(req, res, next) {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}
const AuthService = require('../services/auntification.js');

class AuthController {
  renderRegister(req, res) {
    res.render('src/register');
  }

  
  async handleRegister(req, res) {
    try {
      const { name, email, password, passwordConfirm } = req.body;
      await AuthService.register({ name, email, password, passwordConfirm });
      
      // после регестационной регистрации отправка на вход
      res.redirect('/login');
    } catch (error) {
      // возврат на страницу с отображением ошибки
      res.render('src/register', { error: error.message });
    }
  }


  renderLogin(req, res) {
    res.render('src/login');
  }

 
  async handleLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login({ email, password });

      // Сохраняем данные пользователя в сессию
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      // Перенаправляем на главную
      res.redirect('/');
    } catch (error) {
      res.render('src/login', { error: error.message });
    }
  }

  // Маршрут для выхода (разрушение сессии)
  handleLogout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
}

module.exports = new AuthController();
