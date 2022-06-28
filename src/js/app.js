// Подключение jquery
import $ from 'jquery';

// Подключение Slick-Slider
// import  "slick-carousel";

// подключение слайдера Swiper
// import Swiper, { Navigation, Pagination } from 'swiper';
// const swiper = new Swiper();

// Проверка браузеров на поддержку webp
import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();

// header
import * as header from './modules/header.js';
header.headerJS();

<<<<<<< HEAD
import * as about from "./modules/about.js";
about.aboutJS();

import * as THREE from "./modules/three.min.js";
=======
import * as THREE from './modules/three.min.js';
>>>>>>> 7c33d7ed2f3e12cf4eaeba1b4726f1eb5009ee74

import * as OBJLoader from './modules/OBJLoader.js';

import * as MTLLoader from './modules/MTLLoader.js';

// import * as letterMain from "./modules/letter-main.js";
// letterMain.letterMain();

import * as navBar from './modules/nav.js';
navBar.init();

import * as screenChanger from './modules/screenChanger.js';
screenChanger.init();

// В случае если ткнуть мимо пунктов сортера то список скроется
// let projectsTagContainer = document.querySelector('.projects__tagcontainer');
// projectsTagContainer.addEventListener("click", (e) => {
// 	const NODES = ["BUTTON"];
// 	let container = document.querySelector('.projects__tags');
//   	if (NODES.includes(e.target.nodeName)) return;
//   	container.classList.remove("visible");
// });

// Управление сортировкой в секции Проекты
// $(document).ready(function(){
// 	$(".projects__tag").click(function(){
// 	  var value = $(this).attr("data-filter");
// 	  var elem = $(".projects__item");
// 	  if(value == "all"){
// 		$(elem).show("500");
// 	  }
// 	  else{
// 		$(elem).not(".projects__item[data-sort~='"+value+"']").hide("500");
// 		$(elem).filter(".projects__item[data-sort~='"+value+"']").show("500");
// 	  }
// 	});
// })
