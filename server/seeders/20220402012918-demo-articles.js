'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'articles',
      [
        {
          title: 'Bienvenue sur le réseau Groupomania !',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          image: 'https://i.ibb.co/w4JqCw3/seed-article11650100712938.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          id: 1,
        },
        {
          title: 'Le télétravail, bien ou pas?',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          image: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
          id: 2,
        },
        {
          title: 'Travailler mieux pour travailler moins',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          image: 'https://i.ibb.co/4j9N3kB/seed-article21650100728175.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
          id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  },
};
