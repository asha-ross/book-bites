/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    {
      id: 1,
      title: 'The Idiot',
      author: 'Fyodor Dostoevsky',
      summary: 'Nice guy moves to St. Petersburg, things do not go well.',
      attribute: 'Fancy Words, Deep Thoughts',
    },
    {
      id: 2,
      title: 'The Goldfinch',
      author: 'Donna Tartt',
      summary: 'Boy steals painting, has eventful decade.',
      attribute: 'Chaos Ensues',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      summary: 'Man discovers diary-writing is a bad hobby choice.',
      attribute: 'Sharp Satire',
    },
    {
      id: 4,
      title: 'Wuthering Heights',
      author: 'Emily Brontë',
      summary: 'Neighbors with boundary issues have rocky relationship.',
      attribute: 'Endless Family Drama',
    },
    {
      id: 5,
      title: 'Moby Dick',
      author: 'Herman Melville',
      summary: 'Man really dislikes specific whale.',
      attribute: 'Adventure',
    },
    {
      id: 6,
      title: 'Romeo and Juliet',
      author: 'William Shakespeare',
      summary: 'Teens make hasty decisions, parents disapprove.',
      attribute: 'Endless Family Drama',
    },
    {
      id: 7,
      title: 'The Odyssey',
      author: 'Homer',
      summary: 'Man takes scenic route home from work.',
      attribute: 'Hero Journey',
    },
    {
      id: 8,
      title: 'Hamlet',
      author: 'William Shakespeare',
      summary: 'Family reunion goes poorly.',
      attribute: 'Endless Family Drama',
    },
  ])
}
