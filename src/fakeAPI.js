export function getRoutes() {
  return new Promise(resolve => {
    resolve([
      {
        id: 2,
        name: 'Kreischa - Borthen - Kreischa'
      },
      {
        id: 1,
        name: 'Kreischa - Malter - Kreischa'
      },
      {
        id: 3,
        name: 'Hrensko to Bad Schandau'
      },
      {
        id: 4,
        name: 'Wesenstein'
      },
      {
        id: 5,
        name: 'Müglitztal'
      },
    ]);
  });
}

const timeout = ms => new Promise(res => setTimeout(res, ms));

export async function getRoute(id) {
  try {
    if (!id) {
      throw new Error('error');
    }

    // await timeout(2000);

    return await fetch(`/routes/${id}.xml`)
      .then(response => response.text());
  } catch (e) {

  }
}