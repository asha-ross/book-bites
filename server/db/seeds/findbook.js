/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('findbooks').del()
  await knex('findbooks').insert([
    {
      id: 1,
      attribute: 'Rags to Riches',
      title: 'Great Expectations',
      author: 'Charles Dickens',
      summary: 'Orphan levels up, realizes money cannot buy class.',
    },
    {
      id: 2,
      attribute: 'Sharp Satire',
      title: 'Catch-22',
      author: 'Joseph Heller',
      summary: 'War is crazy, paperwork is crazier.',
    },
    {
      id: 3,
      attribute: 'Sharp Satire',
      title: 'Animal Farm',
      author: 'George Orwell',
      summary: 'Pigs discover communism, other animals not impressed.',
    },
    {
      id: 4,
      attribute: 'Adventure',
      title: 'Jurassic Park',
      author: 'Michael Crichton',
      summary: 'Dinosaur theme park, what could go wrong?',
    },
    {
      id: 5,
      attribute: 'Chaos Ensues',
      title: 'A Confederacy of Dunces',
      author: 'John Kennedy Toole',
      summary: 'Man-child wreaks havoc in New Orleans, calls it philosophy.',
    },
    {
      id: 6,
      attribute: 'Chaos Ensues',
      title: 'Alices Adventures in Wonderland',
      author: 'Lewis Carroll',
      summary: 'Girl follows rabbit, sanity optional.',
    },
    {
      id: 7,
      attribute: 'Real Scary',
      title: 'House of Leaves',
      author: 'Mark Z. Danielewski',
      summary: 'House bigger on inside, sanity smaller on outside.',
    },
    {
      id: 8,
      attribute: 'Real Scary',
      title: 'The Shining',
      author: 'Stephen King',
      summary: 'Family vacation goes wrong.',
    },
    {
      id: 9,
      attribute: 'Endless Family Drama',
      title: 'One Hundred Years of Solitude',
      author: 'Gabriel García Márquez',
      summary: 'Seven generations of mistakes, magic realism cannot fix it.',
    },
    {
      id: 10,
      attribute: 'Endless Family Drama',
      title: 'The God of Small Things',
      author: 'Arundhati Roy',
      summary: 'Twins learn family secrets, wish they had not.',
    },
  ])
}
