import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Surveys Api',
    description: 'Essa é a documentação da API Surveys Api',
    version: '1.0.0',
    contact: {
      name: 'Vinicius Beloti',
      email: 'vinicius.beloti@gmail.com',
      url: 'https://www.linkedin.com/in/vinicius-beloti/'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Enquete',
    description: 'APIs relacionadas a Enquete'
  }],
  paths,
  schemas,
  components
};
