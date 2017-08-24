

window.onload = function () {
  var x, y, row, col;
  var flag = true;
  var sum = 1;
  var times = 0;
  var qipan = document.querySelector('.qipan');
  var qizi1 = document.querySelector('.qizi1');
  var qizi2 = document.querySelector('.qizi2');

  //生成横线；
  var hengxianbox = document.createElement('div');
  hengxianbox.classList.add('hengxianbox');
  for (var i = 0; i < 12; i++) {
    var div1 = document.createElement('div');
    hengxianbox.appendChild(div1);
  }
  qipan.appendChild(hengxianbox);
  //横线结束

  //竖线开始：
  var shuxianbox = document.createElement('div');
  shuxianbox.classList.add('shuxianbox');
  for (var i = 0; i < 16; i++) {
    var div1 = document.createElement('div');
    shuxianbox.appendChild(div1);
  }
  qipan.appendChild(shuxianbox);
  //竖线结束

  //声明一个二维数组用于存储每个棋盘位置的状态
  var qzarr = new Array(11);
  for (var i = 0; i < qzarr.length; i++) {
    qzarr[i] = new Array(15);
    for (var j = 0; j < qzarr[i].length; j++) {
      qzarr[i][j] = 0;
    }
  }
  //二维数组声明结束

  //下棋事件
  qipan.onclick = function (e) {
    e = e || window.event;
    x = getPage(e).pageX - this.offsetLeft - 10;
    y = getPage(e).pageY - this.offsetTop - 10;
    zuobiaox();
    zuobiaoy();
    if (row >= 0 && row < 11 && qzarr[row][col] == 0) {
      times++;
      if (flag) {
        addqz('qizi1');
        judge(1);
      } else {
        addqz('qizi2');
        judge(2);
      }
      pingju();
    }
  }
  //下棋事件结束
  // 计算坐标值
  function zuobiaox() {
    if (x % 50 > 25) {
      x = x - x % 50 + 50;
      col = Math.ceil(x / 50) - 1;
    } else {
      x = x - x % 50;
      col = Math.floor(x / 50) - 1;
    }
  }
  function zuobiaoy() {
    if (y % 50 > 25) {
      y = y - y % 50 + 50;
      row = Math.ceil(y / 50) - 1;
    } else {
      y = y - y % 50;
      row = Math.floor(y / 50) - 1;
    }
  }
  // 计算坐标值结束
  //添加棋子
  function addqz(qzstring) {
    var qz = document.createElement('div');
    qz.classList.add(qzstring)
    qz.style.left = x + 'px';
    qz.style.top = y + 'px';
    qipan.appendChild(qz);
    qzarr[row][col] = (flag == true ? 1 : 2);
    flag = !flag;
  }
  //添加棋子结束

  //平局
  function pingju() {
    if (times >= 165) {
      document.querySelector('.zhexiubu').style.display = 'block';
      document.querySelector('.querenbox').style.display = 'block';
      document.querySelector('.querenbox>.shengli').innerHTML = "平局了，是否要再来一局？";
      return;
    }
  }
  //平局结束
  // 游戏结束效果
  function gameover(num) {
    document.querySelector('.zhexiubu').style.display = 'block';
    document.querySelector('.querenbox').style.display = 'block';
    document.querySelector('.querenbox>.shengli').innerHTML = (num == 1 ? "白" : "黑") + "棋赢了，是否要再来一局？";
  }
  document.querySelector('.querenbox>input:first-of-type').onclick = function () {
    location.reload();
  }
  document.querySelector('.querenbox>input:nth-of-type(2)').onclick = function () {
    window.close();
  }

  //判断胜负
  function judge(num) {
    if (judgex(num)) {
      gameover(num);
      return;
    } else if (judgey(num)) {
      gameover(num);
      return;
    } else if (judgeytx(num)) {
      gameover(num);
      return;
    } else if (judgexty(num)) {
      gameover(num);
      return;
    } else {
      return;
    }
  }
  //判断胜负结束

  //判断四个方向是否五珠连子
  function judgex(num) {
    for (var i = col + 1; i < 15; i++) {
      if (qzarr[row][i] == num) {
        sum++;
      } else {
        break;
      }
    }
    for (var j = col - 1; j >= 0; j--) {
      if (qzarr[row][j] == num) {
        sum++;
      } else {
        break;
      }
    }
    if (sum >= 5) {
      return true;
    } else {
      sum = 1;
      return false;
    }
  }
  function judgey(num) {
    for (var i = row + 1; i < 11; i++) {
      if (qzarr[i][col] == num) {
        sum++;
      } else {
        break;
      }
    }
    for (var j = row - 1; j >= 0; j--) {
      if (qzarr[j][col] == num) {
        sum++;
      } else {
        break;
      }
    }
    if (sum >= 5) {
      return true;
    } else {
      sum = 1;
      return false;
    }
  }
  function judgeytx(num) {
    var i = row - 1;
    var j = col + 1;
    while (i >= 0 && j < 15) {
      if (qzarr[i][j] == num) {
        sum++;
        i--;
        j++;
      } else {
        break;
      }
    }
    i = row + 1;
    j = col - 1;
    while (i < 11 && j >= 0) {
      if (qzarr[i][j] == num) {
        sum++;
        i++;
        j--;
      } else {
        break;
      }
    }
    if (sum >= 5) {
      return true;
    } else {
      sum = 1;
      return false;
    }
  }
  function judgexty(num) {
    var i = row + 1;
    var j = col + 1;
    while (i < 11 && j < 15) {
      if (qzarr[i][j] == num) {
        sum++;
        i++;
        j++;
      } else {
        break;
      }
    }
    i = row - 1;
    j = col - 1;
    while (i >= 0 && j >= 0) {
      if (qzarr[i][j] == num) {
        sum++;
        i--;
        j--;
      } else {
        break;
      }
    }
    if (sum >= 5) {
      return true;
    } else {
      sum = 1;
      return false;
    }
  }
  // 四个方向判断结束


  function getPage(e) {
    e = e || window.event;
    return {
      pageX: e.pageX || e.clientX + document.documentElement.scrollLeft,
      pageY: e.pageY || e.clientY + document.documentElement.scrollTop
    }
  }


}