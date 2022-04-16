'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'aQGyg8Hnzq1sGWfipGsxLw==',
          password:
            '$2b$10$4SF7v0DYGeIbP2jTtISdRuHpDR9v8lSfcASDlFM6WsQ7Sv/t8cWRW',
          role: 'admin',
          firstname: 'Amy',
          lastname: 'Garcia',
          profilePic:
            'http://localhost:8080/images/user/seed-user11650100624104.jpg',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: 'https://www.twitter.com/',
          facebookProfile: 'https://www.facebook.com/',
          instagramProfile: 'https://www.instagram.com/',
          bio: "A mon bureau, les pieds dans l'eau",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'hxxV/Am293RLk2E/Pc0XOeVrdcnq42Pai54kTkPGzQk=',
          password:
            '$2b$10$UHRaBNrferUhvqHLYNgyTeqKM1EhZzgJOlJSx2tooAEjLC8eIk20O',
          role: 'moderator',
          firstname: 'Heloïse',
          lastname: 'Liaut',
          profilePic:
            'http://localhost:8080/images/user/seed-user21650100892532.png',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: '',
          facebookProfile: '',
          instagramProfile: '',
          bio: 'Travailler pour vivre et non pas vivre pour travailler',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'U7nsauXlTAG8OlIoyBuNWLIhEeien9WW3/z75Fikpfw=',
          password:
            '$2b$10$FCiDFaWNCWLh6a/QebKl8.YS.SfHmpw3vyDrryuQcLE04O9YDLay6',
          role: 'user',
          firstname: 'Pierre',
          lastname: 'Duschesnes',
          profilePic: 'http://localhost:8080/images/user/default-profile.png',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: 'https://www.linkedin.com/',
          facebookProfile: '',
          instagramProfile: '',
          bio: "Passionné d'aviation.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
