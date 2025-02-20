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
const detailsInfo = document.querySelector('#showdetails');
const closeDetails = document.querySelector('#close_details');
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

async function showDetals(q) {
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
  showInfo(result);
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

const showInfo = (data) => {
  let box = ``;
  box = `
      <div
            class="top w-full grid lg:grid-cols-[65%_35%] gap-y-8 items-center"
          >
            <div
              class="imgside h-auto flex flex-col gap-y-4 w-full sm:mt-0 md:p-2"
            >
              <img
                class="w-[900px] h-auto rounded-xl"
                src="${data.thumbnail}"
                id='mainImg'
                alt=""
              />
              <div id='imgContainer' class="more flex gap-3 flex-wrap cursor-pointer">
                <div class="w-32">
                  <img src="${data.screenshots[0].image}" class="w-full rounded-2xl" alt="" />
                </div>
                <div class="w-32">
                  <img
                    src="${data.screenshots[1].image}"
                    class="w-[100%] rounded-2xl"
                    alt=""
                  />
                </div>
                <div class="w-32">
                  <img
                    src="${data.screenshots[2].image}"
                    class="w-[100%] rounded-2xl"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div class="info w-full md:p-5 flex flex-col gap-3">
              <div class="title">
                <h1
                  class="text-center text-4xl mb-6 capitalize font-medium text-slate-900 dark:text-sky-400"
                >
                  ${data.title}
                </h1>
                <p class="dark:text-white font-light">
                 ${data.short_description}
                </p>
                <h2 class="text-center text-2xl dark:text-sky-200 mt-4">
                  ${data.genre}
                </h2>
              </div>
              <div class="btns">
                <div
                  class="flex flex-col gap-3 w-[95%] sm:w-[90%] m-auto rounded-md shadow-xs"
                >
                  <a
                  target='_blabk'
                    href="${data.game_url}"
                    aria-current="page"
                    class="rounded-lg px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Play Now
                  </a>
                  <a
                  target='_blabk'
                    href="${data.freetogame_profile_url}"
                    class="rounded-lg px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    More details
                  </a>
                </div>
              </div>
              <div class="moredetails">
                <ul
                  class="w-[95%] md:w-[90%] m-auto text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-transparent dark:border-gray-600 dark:text-white"
                >
                  <li
                    class="flex justify-between capitalize w-full px-4 py-4 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <h1 class="font-normal opacity-60 tracking-[1px]">
                      developer
                    </h1>
                    <h1 class="font-normal tracking-[1px]">${data.developer}</h1>
                  </li>
                  <li
                    class="flex justify-between capitalize w-full px-4 py-4 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <h1 class="font-normal opacity-60 tracking-[1px]">
                      Publisher
                    </h1>
                    <h1 class="font-normal tracking-[1px]">${data.publisher}</h1>
                  </li>
                  <li
                    class="flex justify-between capitalize w-full px-4 py-4 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <h1 class="font-normal opacity-60 tracking-[1px]">
                      Release Date
                    </h1>
                    <h1 class="font-normal tracking-[1px]">${data.release_date}</h1>
                  </li>
                  <li
                    class="flex justify-between capitalize w-full px-4 py-4 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <h1 class="font-normal opacity-60 tracking-[1px]">
                      Platform
                    </h1>
                    <h1 class="font-normal tracking-[1px]">${data.platform}</h1>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="botton w-full p-2">
            <div class="description text-white flex flex-col gap-3 mb-4">
              <h1 class="text-slate-950 dark:text-sky-400 text-3xl">
                Game Description
              </h1>
              <p class="text-slate-950 dark:text-white">
                ${data.description}
              </p>
            </div>
            <div class="system_requirments">
              <h1 class="dark:text-sky-400 text-slate-950 text-2xl capitalize">
                system requirments
              </h1>
              <div
                class="requirments mt-4 rounded-xl p-3 m-h-96 bg-slate-200 dark:bg-zinc-700 lg:w-[65%]"
              >
                <h1
                  class="dark:text-white font-normal border-b-2 mb-4 border-sky-400 w-fit pb-1"
                >
                  windows
                </h1>
                <div class="mimum">
                  <h1
                    class="info dark:text-white text-slate-950 capitalize mb-5"
                  >
                    minmum
                  </h1>
                  <div
                    class="os mb-3 border-b-2 border-opacity-45 dark:border-white border-slate-950 pb-1"
                  >
                    <h1 class="capitalize text-sky-400 text-[18px]">os</h1>
                    <p class="dark:text-white font-light">
                      ${data.minimum_system_requirements.os}
                    </p>
                  </div>
                  <div
                    class="processor mb-3 border-b-2 border-opacity-45 dark:border-white border-slate-950 pb-1"
                  >
                    <h1 class="capitalize text-sky-400 text-[18px]">
                      processor
                    </h1>
                    <p class="dark:text-white font-light">
                      ${data.minimum_system_requirements.processor}

                    </p>
                  </div>
                  <div
                    class="memory mb-3 border-b-2 border-opacity-45 dark:border-white border-slate-950 pb-1"
                  >
                    <h1 class="capitalize text-sky-400 text-[18px]">memory</h1>
                    <p class="dark:text-white font-light">
                       ${data.minimum_system_requirements.memory}
                    </p>
                  </div>
                  <div
                    class="graphics mb-3 border-b-2 border-opacity-45 dark:border-white border-slate-950 pb-1"
                  >
                    <h1 class="capitalize text-sky-400 text-[18px]">
                      graphics
                    </h1>
                    <p class="dark:text-white font-light">
                      ${data.minimum_system_requirements.graphics}

                    </p>
                  </div>
                  <div
                    class="storage mb-3 border-b-2 border-opacity-45 dark:border-white border-slate-950 pb-1"
                  >
                    <h1 class="capitalize text-sky-400 text-[18px]">
                      graphics
                    </h1>
                    <p class="dark:text-white font-light">
                      ${data.minimum_system_requirements.storage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
  detailsInfo.innerHTML += box;
  ChangeImages();
};

const ChangeImages = () => {
  const mainImg = document.querySelector('#mainImg');
  const imgContainer = document.querySelector('#imgContainer');
  imgContainer.addEventListener('click', (e) => {
    let newImg = e.target.src;
    mainImg.setAttribute('src', newImg);
  });
};

const showGameDetals = () => {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((ele) => {
    ele.addEventListener('click', () => {
      showDetals(`${ele.id.trim()}`);
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
        <div id="${
          data[i].id
        }" class="box cursor-pointer hover:scale-[1.02] duration-[400] ease-in-out transition-all min-h-[400px] dark:bg-slate-900 grid grid-rows-2 min-w-[100%] shadow-sm shadow-sky-500 rounded-2xl">
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
      showGameDetals();
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
