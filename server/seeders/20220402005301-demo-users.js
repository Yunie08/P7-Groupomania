'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'ambre.gorias@gmail.com',
          password:
            '$2b$10$4SF7v0DYGeIbP2jTtISdRuHpDR9v8lSfcASDlFM6WsQ7Sv/t8cWRW',
          role: 'admin',
          firstname: 'Ambre',
          lastname: 'Gorias',
          profilePic: 'http://localhost:8080/images/profil_AG1648852830840.jpg',
          linkedinProfile: 'https://www.linkedin.com/in/ambregorias/',
          twitterProfile: 'https://www.twitter.com/in/ambregorias/',
          facebookProfile: 'https://www.facebook.com/in/ambregorias/',
          instagramProfile: 'https://www.instagram.com/in/ambregorias/',
          bio: "A mon bureau, les pieds dans l'eau",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'heloise@gmail.com',
          password:
            '$2b$10$UHRaBNrferUhvqHLYNgyTeqKM1EhZzgJOlJSx2tooAEjLC8eIk20O',
          role: 'moderator',
          firstname: 'Heloïse',
          lastname: 'Liaut',
          profilePic: 'http://localhost:8080/images/user21648853910661.jpg',
          linkedinProfile: 'https://www.linkedin.com/in/heloiseliaut/',
          twitterProfile: '',
          facebookProfile: '',
          instagramProfile: '',
          bio: 'Travailler pour vivre et non pas vivre pour travailler',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'pierre@gmail.com',
          password:
            '$2b$10$FCiDFaWNCWLh6a/QebKl8.YS.SfHmpw3vyDrryuQcLE04O9YDLay6',
          role: 'user',
          firstname: 'Pierre',
          lastname: 'Duschesnes',
          profilePic: 'http://localhost:8080/images/default-profile.png',
          linkedinProfile: 'https://www.linkedin.com/in/pierrreduschesnes/',
          twitterProfile: 'https://www.linkedin.com/in/pierrreduschesnes/',
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
