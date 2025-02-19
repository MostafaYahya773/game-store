const closeAside = document.querySelector('.closeAside');
const openAside = document.querySelector('.openAside');
const games = document.querySelector('#games');
const imgsSwip = document.querySelector('#imgsSwip');
const themebtn = document.querySelector('#themebtn');
const changeThemes = document.querySelectorAll('.changeThemes');
const themBg = document.querySelector('#them_bg');
const mobCat = document.querySelectorAll('.mob-categores');
const pc = document.querySelectorAll('.pc');
const spinner = document.querySelector('.loader');
const section = document.querySelector('section');
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
  imgSwap(result);
  showGames(result);
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

const imgSwap = (data) => {
  let div = ``;
  for (let i = 0; i < data.length; i++) {
    div += `
      <img src="${data[i].thumbnail}" class='swipe w-[100%] h-[400px] rounded-2xl' alt="Slide Image" />
     `;
    imgsSwip.innerHTML = div;
    let x = 0;
    setInterval(() => {
      x += 100;
      document.querySelectorAll('.swipe').forEach((ele) => {
        ele.style.transform = `translateY(${-x}%)`;
        ele.style.transition = '1s';
      });
    }, 4000);
  }
};

const showGames = (data) => {
  let box = ``;
  for (let i = 0; i < data.length; i++) {
    box += `
      <div class="box min-h-[400px] dark:bg-slate-900 grid grid-rows-2 min-w-[100%] shadow-sm shadow-sky-500 rounded-2xl">
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
    section.classList.remove('lg:grid-cols-custom');
    section.classList.add('lg:grid-row-[auto_1fr]');
    openAside.classList.add('lg:block');
  });

  openAside.addEventListener('click', () => {
    document.querySelector('aside').classList.remove('lg:hidden');
    section.classList.add('lg:grid-cols-custom');
    openAside.classList.remove('lg:block');
  });
};
