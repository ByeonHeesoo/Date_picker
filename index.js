
; (function () {

  window.addEventListener("load", function (event) {
    let monthEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();

    const renderCalendar = () => {
      const viewYear = date.getFullYear(); //2023
      const viewMonth = date.getMonth(); //2

      document.querySelector('.month-year').innerHTML = `${monthEN[viewMonth]}<br> <span>${viewYear}</span>`;


      const prevLast = new Date(viewYear, viewMonth, 0); //이전 달 마지막날
      const thisLast = new Date(viewYear, viewMonth + 1, 0); //이번달 마지막 날

      const PLDate = prevLast.getDate(); // 이전 달 마지막 일
      const PLDay = prevLast.getDay(); // 이전 달 마지막 요일(숫자)

      const TLDate = thisLast.getDate(); // 이번 달 마지막 일
      const TLDay = thisLast.getDay(); // 이번 달 마지막 요일(숫자)

      const prevDates = []; // 이전 달의 일 담을 배열
      const thisDates = [...Array(TLDate + 1).keys()].slice(1); // 이번 달의 일 -> 배열로
      const nextDates = []; // 다음 달의 일 담을 배열

      // 이전달 막주 일수 배열에 채우기
      if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
          prevDates.unshift(PLDate - i);
        }
      }

      // 다음달 첫주 일수 배열에 채우기
      for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
      }

      const dates = prevDates.concat(thisDates, nextDates); // 이전달 막주 일수 + 이번달 + 다음달 첫주 일수 합치기

      const firstDateIndex = dates.indexOf(1); //이번달 1일 인덱스 번호
      const lastDateIndex = dates.lastIndexOf(TLDate); //이번달 막날 인덱스 번호

      // 이번달 날짜만 this, 이전달과 다음달 날짜는 other
      dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        let dateStatus = "";
        if (i < firstDateIndex) { dateStatus = "prevMonth"; }
        if (lastDateIndex < i) { dateStatus = "nextMonth"; }

        // dataStatus 있으면 넣어주기
        dates[i] = `<div class="date"><span class="${condition}" ${(dateStatus) ? 'data-date ="' + dateStatus + '"' : ''}>${date}</span></div>`;
      });

      // 날짜들 하나하나 넣어주기
      document.querySelector('.dates').innerHTML = dates.join('');

      // input창, console창에 날짜 출력
      for (let i = 0; i < dates.length; i++) {

        document.querySelectorAll('.date')[i].addEventListener('click', function () {

          let Month = String(viewMonth + 1).padStart(2, "0");

          // 이전달, 다음달 클릭시 Month값 변경
          if (this.querySelector('span').dataset.date === 'prevMonth') {
            Month = String(viewMonth).padStart(2, "0");
          } else if (this.querySelector('span').dataset.date === 'nextMonth') {
            Month = String(viewMonth + 2).padStart(2, "0");
          }

          // 다른 날짜 클릭 시 전에 클릭했던 색 제거
          for (let j = 0; j < dates.length; j++) {
            document.querySelectorAll('.date')[j].querySelector('span').classList.remove('clickDate');
          }

          console.log(viewYear + "-" + Month + "-" + String(this.querySelector('span').textContent).padStart(2, "0"));
          this.querySelector('span').classList.add('clickDate');
          document.querySelector('.input').value = viewYear + "-" + Month + "-" + String(this.querySelector('span').textContent).padStart(2, "0");
          document.querySelector('.calendar').classList.remove('show');
        });
      }

      // 오늘 날짜에 today 클래스 추가
      const today = new Date();
      if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
          if (Number(date.textContent) === today.getDate()) {
            date.classList.add('today');
            break;
          }
        }
      }
    };

    renderCalendar();

    const prevMonth = () => {
      date.setMonth(date.getMonth() - 1);
      renderCalendar();
    };

    const nextMonth = () => {
      date.setMonth(date.getMonth() + 1);
      renderCalendar();
    };

    document.querySelector('.go-prev').addEventListener('click', prevMonth);
    document.querySelector('.go-next').addEventListener('click', nextMonth);

    // input창 클릭시 달력 show, body 클릭시 달력 감추기
    document.querySelector('.input').addEventListener('focusin', function () {
      document.querySelector('.calendar').classList.add('show');
    });
    document.querySelector('body').addEventListener('click', function () {
      document.querySelector('.calendar').classList.remove('show');
    });

    // 이벤트 버블링 방지 (달력, input 클릭은 감추기 방지)
    document.querySelector('.input').addEventListener('click', function (e) {
      e.stopPropagation();
    });
    document.querySelector('.calendar').addEventListener('click', function (e) {
      e.stopPropagation();
    });

  });

})()