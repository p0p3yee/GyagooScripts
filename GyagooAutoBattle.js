// ==UserScript==
// @name         GyagooAutoBattle
// @namespace    http://myhome.ryuhoku.jp/gyagoo/zone.cgi*
// @version      0.1
// @description  GyagooAutoBattle
// @author       p0p3yee
// @match        http://myhome.ryuhoku.jp/gyagoo/zone.cgi*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  //JP: http://myhome.ryuhoku.jp/gyagoo/zone.cgi*
  //CHT: https://gyagoo.oldtu.com/zone.cgi*

  const LANG = "JP"

  const findBattleTxt = {
    CHT: "探索敵人",
    JP: "索　敵"
  };

  const backToStreet = {
    CHT: "返回街道",
    JP: "街へ戻る"
  };

  const goToBattleZone = {
    CHT: "前往 出発的草原",
    JP: "旅立ちの草原へ"
  };

  const goHealPageInCHT = "宿屋";
  const doHealinCHT = "宿泊";
  

  const findElementInterval = 500;

  function clickIfExists(r) {
    if (r) {
      r.click()
      return true
    }
    return false
  }

  function findInputValIs(target) {
    var x = document.getElementsByTagName("input")
    for (var i = 0; i < x.length; i++) {
      if (x[i] && x[i].value && x[i].value.includes(target)) {
        return x[i]
      }
    }
    return null
  }

  function isFullHealthAndTP() {
    const allBold = document.getElementsByTagName("b");
    for(var i = 0; i < allBold.length; i++) {
      if(allBold[i].textContent.includes(" / ")) {
        const splited = allBold[i].textContent.split(" / ");
        if (splited[0] == "nan") {
          return true
        }
        if (splited[0] != splited[1]) {
          return false
        }
      }
    }
    return true
  }

  function goBattle() {
    return clickIfExists(findInputValIs(findBattleTxt[LANG]));
  }

  function goBattleZone() {
    return clickIfExists(findInputValIs(goToBattleZone[LANG]));
  }

  function goBackToStreet() {
    return clickIfExists(findInputValIs(backToStreet[LANG]));
  }

  function clickHeal() {
    return clickIfExists(findInputValIs(doHealinCHT));
  }

  function clickGoHeal() {
    return clickIfExists(findInputValIs(goHealPageInCHT));
  }

  function isClockOK() {
    return document.form1 && document.form1.clock && document.form1.clock.value == "0K!"
  }

  var autoBattleInterval = setInterval(() => {
    
    if (!isClockOK()) {
      if (!isFullHealthAndTP() && findInputValIs(goHealPageInCHT)) {
        clearInterval(autoBattleInterval);
        clickGoHeal();
        return
      }
      if (findInputValIs(doHealinCHT)) {
        clearInterval(autoBattleInterval);
        clickHeal()
        return;
      } 
      if (findInputValIs(backToStreet[LANG])) {
        clearInterval(autoBattleInterval);
        goBackToStreet()
        return
      }
      if (!findInputValIs(goToBattleZone[LANG])) return
      goBattleZone()
      return
    }
    if (!findInputValIs(findBattleTxt[LANG])) return
    clearInterval(autoBattleInterval);
    goBattle();
  }, findElementInterval)
})();
