// ==UserScript==
// @name         GyagooAutoBackFromBattle
// @namespace    http://myhome.ryuhoku.jp/gyagoo/battle.cgi
// @version      0.1
// @description  GyagooAutoBackFromBattle
// @author       p0p3yee
// @match        http://myhome.ryuhoku.jp/gyagoo/battle.cgi
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  //JP: http://myhome.ryuhoku.jp/gyagoo/battle.cgi
  //CHT: https://gyagoo.oldtu.com/battle.cgi
  
  const LANG = "JP";

  const endBattleTxt = {
    CHT: "返回所在地",
    JP: "ゾーンに戻る"
  }

  const loseBattleTxt = {
    CHT: "返回開始街道"
  }

  const findEleInterval = 100;

  function findInputValIs(target) {
    var x = document.getElementsByTagName("input")
    for (var i = 0; i < x.length; i++) {
      if (x[i] && x[i].value && x[i].value.includes(target)) {
        return x[i]
      }
    }
    return null
  }

  function goBackFromBattle() {
    return clickIfExists(findInputValIs(endBattleTxt[LANG]));
  }

  function backToStreet() {
    return clickIfExists(findInputValIs(loseBattleTxt[LANG]));
  }

  function clickIfExists(r) {
    if (r) {
      r.click()
      return true
    }
    return false
  }


  var goBack = setInterval(() => {
    if (findInputValIs(loseBattleTxt[LANG])) {
      clearInterval(goBack);
      backToStreet();
      return;
    }
    if (!findInputValIs(endBattleTxt[LANG])) return
    clearInterval(goBack);
    goBackFromBattle();
  }, findEleInterval)
})();
