/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('games').del()
  await knex('games').insert([
    {
      id: 1, 
      title: 'The Legend of Zelda: Breath of the Wild',
      developer_id: 1,
      release_date: '2017-03-03',
      image: 'game1.jpg'
    },
    {
      id: 2,
      title: 'Oblivion',
      developer_id: 2,
      release_date: '2006-03-20',
       image: 'game2.jpg'
    },
    {
      id: 3,
      title: 'Skyrim',
      developer_id: 2,
      release_date: '2011-11-11',
       image: 'game3.jpg'
    },
    {
      id: 4,
      title: 'Dota 2',
      developer_id: 3,
      release_date: '2013-07-09',
       image: 'game4.jpg'
    },
    {
      id: 5,
      title: 'Counter Strike Global Offensive',
      developer_id: 3,
      release_date: '2012-08-21',
       image: 'game5.jpg'
    },
    {
      id: 6,
      title: 'Iron Man',
      developer_id: 4,
      release_date: '2008-05-02',
       image: 'game6.jpg'
    },
    {
      id: 7,
      title: 'Little Big Planet',
      developer_id: 5,
      release_date: '2008-10-27',
       image: 'game7.jpg'
    },
    {
      id: 8,
      title: 'Atom Fall',
      developer_id: 6,
      release_date: '2025-03-27',
       image: 'game8.jpg'
    },
    {
      id: 9,
      title: 'Super Mario Odyssey',
      developer_id: 7,
      release_date: '2017-10-27',
       image: 'game9.jpg'
    },
    {
      id: 10,
      title: 'The Witcher 3: Wild Hunt',
      developer_id: 8,
      release_date: '2015-05-19',
       image: 'game10.jpg'
    },
  ])
};

// table.integer('id').primary()
// table.integer('developer_id')
// table.string('title')
// table.string('release_date')
