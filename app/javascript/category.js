const closeAside = document.querySelector('.closeAside');
const openAside = document.querySelector('.openAside');
const games = document.querySelector('#games');
const changImg = document.querySelector('#changImg');
const themebtn = document.querySelector('#themebtn');
const changeThemes = document.querySelectorAll('.changeThemes');
const themBg = document.querySelector('#them_bg');
const mobCat = document.querySelectorAll('.mob-categores');
const pc = document.querySelectorAll('.pc');
const spinner = document.querySelector('.loader');
const primary = document.querySelector('#primary');
const detalsPage = document.querySelector('#details');
const closeDetails = document.querySelector('.close-details');
const primarySection = document.querySelector('#primarysection');
const search = document.querySelectorAll('.searchInput');
const html = document.querySelector('html');

export async function getdata() {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8ff2eb8e11mshdafc7a338f13e24p191d3ajsnca199c960420',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    },
  };
  const data = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games`,
    options
  );
  let result = await data.json();
  spinner.style.display = 'none';

  showGames(result);
  swipImg(result);
  gameSearch(result);
}

export async function getCategores(q) {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8ff2eb8e11mshdafc7a338f13e24p191d3ajsnca199c960420',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    },
  };
  const data = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${q}`,
    options
  );
  let result = await data.json();
  spinner.style.display = 'none';
  showGames(result);
}

export async function showDetals(q) {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8ff2eb8e11mshdafc7a338f13e24p191d3ajsnca199c960420',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    },
  };

  const data = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${q}`,
    options
  );
  const result = await data.json();
  console.log(result);
}

const showGames = (data) => {
  let box = ``;
  for (let i = 0; i < data.length; i++) {
    box += `
      <div id=${data[i].id} class="cursor-pointer hover:scale-[1.02] duration-[400] ease-in-out transition-all box min-h-[400px] bg-white dark:bg-slate-900 grid grid-rows-2 min-w-[100%] shadow-sm shadow-sky-500 rounded-2xl">
            <img class="w-full rounded-t-2xl" loading="lazy" src="${data[i].thumbnail}" alt="img" />
            <div class='sm:p-2 p-3 grid grid-rows-[auto] min-h-[100%]' >
            <div
              class="align-middle flex justify-between text-text-mediam font-medium  text-sky-300 capitalize"
            >
              <h2 class='sm:text-text-normal lg:text-[18px]'>${data[i].title}</h2>
              <p class="sm:text-text-normal sm:py-0 lg:text-text-mediam rounded-3xl text-sky-300 px-5 py-1">free</p>
            </div>
            <p class=" text-slate-600 dark:text-white mb-3 sm:text-[15px] lg:text-[17px] font-light">${data[i].short_description}</p>
            <div class="footer flex justify-between items-center border-t-2 border-solid dark:border-white border-[#00000052]">
              <p class=" text-sky-400 sm:text-text-small sm:py-1 px-1 py-2">${data[i].genre}</p>
              <p class=" text-sky-400 sm:text-text-small sm:py-1 px-1 py-2">${data[i].platform}</p>
            </div>
            </div>
          </div>
    `;
  }
  games.innerHTML = box;
  showGameDetals();
};

const showGameDetals = () => {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((ele) => {
    ele.addEventListener('click', () => {
      showDetals(`${ele.id}`);
      primarySection.classList.add('hidden');
      detalsPage.classList.remove('hidden');
    });
  });
  closeDetails.addEventListener('click', () => {
    primarySection.classList.remove('hidden');
    detalsPage.classList.add('hidden');
  });
};

const swipImg = (data) => {
  const imgContainer = [];
  let i = 0;
  data.forEach((ele) => {
    imgContainer.push(ele.thumbnail);
  });
  setInterval(() => {
    i++;
    changImg.setAttribute('src', imgContainer[i]);
  }, 2000);
};

export const clickAnmation = () => {
  // add action while click in categores in pc mode
  pc.forEach((ele) => {
    ele.addEventListener('click', () => {
      const test = document.querySelector('.active');
      if (test) {
        test.classList.remove('active');
      }
      ele.classList.add('active');
      getCategores(`${ele.textContent.trim()}`);
    });
  });

  // add action while click in categores in mobile mode
  mobCat.forEach((ele) => {
    ele.addEventListener('click', () => {
      const test = document.querySelector('.mob-active');
      if (test) {
        test.classList.remove('mob-active');
      }
      ele.classList.add('mob-active');
      getCategores(`${ele.textContent.trim()}`);
    });
  });
};
// search for any game
export const gameSearch = (data) => {
  search.forEach((ele) => {
    ele.addEventListener('keydown', function () {
      let box = ``;
      for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(ele.value.toLowerCase())) {
          box += `
        <div class="box min-h-[400px] dark:bg-slate-900 grid grid-rows-2 min-w-[100%] shadow-sm shadow-sky-500 rounded-2xl">
        <img class="w-full rounded-t-2xl" loading="lazy" src="${
          data[i].thumbnail
        }" alt="img" />
            <div class='sm:p-2 p-3 grid grid-rows-[auto] min-h-[100%]' >
            <div
            class="align-middle flex justify-between text-text-mediam font-medium  text-sky-300 capitalize"
            >
              <h2 class='sm:text-text-normal lg:text-[18px]'>${data[
                i
              ].title.slice(0, 15)}</h2>
              <p class="sm:text-text-normal sm:py-0 lg:text-text-mediam rounded-3xl text-sky-300 px-5 py-1">free</p>
              </div>
              <p class=" text-slate-600 dark:text-white mb-3 sm:text-[15px] lg:text-[17px] font-light">${
                data[i].short_description
              }</p>
                <div class="footer flex justify-between items-center border-t-2 border-solid dark:border-white border-[#00000052]">
                <p class=" text-sky-400 sm:text-text-small sm:py-1 px-1 py-2">${
                  data[i].genre
                }</p>
            <p class=" text-sky-400 sm:text-text-small sm:py-1 px-1 py-2">${
              data[i].platform
            }</p>
              </div>
              </div>
              </div>
              `;
        }
      }
      games.innerHTML = box;
    });
  });
};
// show thems
export const thembtn = () => {
  themebtn.addEventListener('click', () => {
    themBg.classList.toggle('hidden');
  });
};

// dark Mode
export const darkMode = () => {
  changeThemes.forEach((ele) => {
    ele.addEventListener('click', () => {
      themBg.classList.remove('sm:block');
      if (ele.textContent.trim() === 'Dark') {
        html.classList.add('dark');
      } else if (ele.textContent.trim() === 'Light') {
        html.classList.remove('dark');
      } else {
        systemMode();
      }
    });
  });
};
// change mode like system
export const systemMode = () => {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkModeMediaQuery.matches) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
// open and close aside
export const asideOptions = () => {
  closeAside.addEventListener('click', () => {
    document.querySelector('aside').classList.add('lg:hidden');
    primary.classList.remove('lg:grid-cols-custom');
    primary.classList.add('lg:grid-row-[auto_1fr]');
    openAside.classList.add('lg:block');
  });

  openAside.addEventListener('click', () => {
    primary.classList.add('lg:grid-cols-custom');
    document.querySelector('aside').classList.remove('lg:hidden');
    document.querySelector('aside').classList.add('lg:block');
    openAside.classList.remove('lg:block');
  });
};
