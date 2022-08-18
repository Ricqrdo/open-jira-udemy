interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'pending - Lorem ipsum dolor sit amet.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'in-progress - Lorem ipsum dolor sit amet.',
      status: 'in-progress',
      createdAt: Date.now() - 100000
    },
    {
      description: 'finished - Lorem ipsum dolor sit amet.',
      status: 'finished',
      createdAt: Date.now() - 10000000
    }
  ]
};
