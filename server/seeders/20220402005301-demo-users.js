'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'g61WIeHVEFDk/HGspj1ZwNr1O84WZnMmUGgnOOE29wY=',
          password:
            '$2b$10$qiE6JA39dc56CR4ozPOV7e5In0meUTGkP5Eh4Bq.2WjQodnxw7yg2',
          role: 'admin',
          firstname: 'Amy',
          lastname: 'Garcia',
          profilePic: 'https://i.ibb.co/X3v1BZj/seed-user11650100624104.jpg',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: 'https://www.twitter.com/',
          facebookProfile: 'https://www.facebook.com/',
          instagramProfile: 'https://www.instagram.com/',
          bio: "A mon bureau, les pieds dans l'eau",
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 1,
        },
        {
          email: 'GXjXZIFYfLuKsMMomZOayy1rYpSyECI8vYmkJj44EiY=',
          password:
            '$2b$10$/vZiAoa6QUxCVWBngyDBd.dv5Sul9kdM5cTxXwrAjQtFVlcbqLNp.',
          role: 'moderator',
          firstname: 'Heloïse',
          lastname: 'Liaut',
          profilePic: 'https://i.ibb.co/PTHX3RB/seed-user21650100892532.png',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: '',
          facebookProfile: '',
          instagramProfile: '',
          bio: 'Travailler pour vivre et non pas vivre pour travailler',
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 2,
        },
        {
          email: 'fA0gYdDlSkK7RTzKOi6GX3q8A3+c+YDS51dTuYp/c1Q=',
          password:
            '$2b$10$qNlfIUOObRRrRKxXzjVc1eoK3.SHXzBOLsTmJCEzi7BuNCw48UMVi',
          role: 'user',
          firstname: 'Pierre',
          lastname: 'Duschesnes',
          profilePic: 'https://i.ibb.co/QNr5SJL/default-profile.png',
          linkedinProfile: 'https://www.linkedin.com/',
          twitterProfile: 'https://www.linkedin.com/',
          facebookProfile: '',
          instagramProfile: '',
          bio: "Passionné d'aviation.",
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
