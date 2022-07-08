// Подключение jquery
import $ from 'jquery';

// Подключение Slick-Slider
import 'slick-carousel';

// подключение слайдера Swiper
// import Swiper, { Navigation, Pagination } from 'swiper';
// const swiper = new Swiper();

// Проверка браузеров на поддержку webp
import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();

import * as support from './modules/supports.js';
support.init();

import * as header from './modules/header.js';
header.headerJS();

import * as slickInit from './modules/slick-init.js';
slickInit.slickInit();

import * as about from './modules/about.js';
about.aboutJS();

import * as navBar from './modules/nav.js';
import * as letterMain from './modules/letter-main.js';
import * as crosses from './modules/crosses.js';
import { isMobile } from 'mobile-device-detect';

import * as team from './modules/team.js';
team.init();

// var mobileDetect = new MobileDetect(window.navigator.userAgent);
// console.log("Mobile: " + detect.mobile());
// console.log("Phone: " + detect.phone());
// console.log("Tablet: " + detect.tablet());
// console.log("OS: " + detect.os());
// console.log("userAgent: " + detect.userAgent());

// if (mobileDetect.mobile() !== null) {
//   navBar.init();
//   letterMain.letterMain();
//   crosses.init();
// }
if (!isMobile) {
  navBar.init();
  letterMain.letterMain();
  crosses.init();
}

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
