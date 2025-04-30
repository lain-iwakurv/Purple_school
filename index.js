window.addEventListener("DOMContentLoaded", () => {
  const moreButtons = document.querySelectorAll(".detailes");
  const buttons = document.querySelectorAll(".button");

  moreButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      localStorage.setItem("selectedVideo", i);
      switch (i) {
        case 0:
          window.location.href = "video.html";
          break;
        case 1:
          window.location.href = "video2.html";
          break;
        case 2:
          window.location.href = "video3.html";
          break;
        case 3:
          window.location.href = "video4.html";
          break;
        case 4:
          window.location.href = "video5.html";
          break;
      }
    });
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-back") == "") {
        window.location.href = "index.html";
      }
    });
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-test") == "") {
        window.location.href = "test.html";
      }
    });
  });

  //Test

  const questionsDB = [
    {
      question: 'Что стоит сделать в первую очередь для защиты рабочей почты? ',
      options: ['Использовать простой пароль, чтобы не забыть', 'Делиться паролем с коллегами', 'Включить двухфакторную аутентификацию', 'Игнорировать подозрительные письма'],
      correctOption: 'Включить двухфакторную аутентификацию'
    }, 
    {
      question: 'Какое действие может помочь избежать взлома почты?',
      options: [' Использовать один и тот же пароль везде', 'Проверять отправителя письма перед открытием вложений', 'Загружать все файлы без проверки', 'Открывать ссылки из писем без раздумий'],
      correctOption: 'Проверять отправителя письма перед открытием вложений'
    },
    {
      question: 'Какой из паролей считается самым надёжным?',
      options: [' 12345678', 'qwerty', 'Gh@73jL!x9Z', 'password'],
      correctOption: 'Gh@73jL!x9Z'      
    },
    {
      question: 'Что НЕ рекомендуется делать при создании пароля',
      options: [' Делать его длинным', 'Использовать своё имя или дату рождения', 'Использовать разные символы', 'Менять пароль регулярно'],
      correctOption: 'Использовать своё имя или дату рождения'      
    },
    {
      question: 'Почему нельзя вставлять незнакомую USB-флешку в рабочий компьютер',
      options: ['Она может быть слишком старая', 'Она может не подойти по формату', 'Она может содержать вредоносное ПО', 'Она может быстро разрядить аккумулятор'],
      correctOption: 'Она может содержать вредоносное ПО'      
    },
    {
      question: 'Как правильно поступить, если нашли чужую флешку в офисе?',
      options: ['Вставить и посмотреть, чей она', ' Передать её в IT-отдел или службу безопасности', ' Оставить себе', 'Отформатировать и использовать'],
      correctOption: 'Передать её в IT-отдел или службу безопасности'      
    },
    {
      question: 'Что является признаком фишингового письма?',
      options: ['Срочная просьба перейти по ссылке и ввести данные', 'Письмо от знакомого сотрудника', 'Обычный внутренний документ', 'Приглашение на корпоратив'],
      correctOption: 'Срочная просьба перейти по ссылке и ввести данные'      
    },     
    {
      question: 'Что нужно сделать при получении подозрительного письма?',
      options: ['Сразу открыть вложение', 'Не открывать и сообщить в IT-отделу', 'Ответить и спросить, что это', 'Переслать коллегам'],
      correctOption: 'Не открывать и сообщить в IT-отделу'      
    },   
  ]

  const container = document.querySelector(".container_test"),
        nextButton = document.querySelector('.next_test'),
        prevButton = document.querySelector('.prev_test');
  
  
  function addQuestions(questions, parent) {
    let i = 0;
    parent.innerHTML = '';

    questions.forEach((question, index) => {
      parent.innerHTML += ` 
        <div class='test__block'>
          <p class="test__block__question">${question.question} </p>
          <div class="radio-glogal">
            <div>
              <input type="radio" name='answerRadio-${index}' required>
              <label>${question.options[0]}</label>
            </div>
          </div>  
          
          <div class="radio-glogal">
            <div>
              <input type="radio" name='answerRadio-${index}' required>
              <label>${question.options[1]}</label>
            </div>
          </div>
          
          <div class="radio-glogal">
            <div>
              <input type="radio" name='answerRadio-${index}' required>
              <label>${question.options[2]}</label>
            </div>
          </div>
          
          <div class="radio-glogal">
            <div>
              <input type="radio" name='answerRadio-${index}' required>
              <label>${question.options[3]}</label>
            </div>
          </div>
        </div>     
        
      `;
    });


  };

  addQuestions(questionsDB, container);

  const blocks = document.querySelectorAll('.test__block');

  let i = 0;

  function showBlock(i = 0) {
    blocks[i].classList.add('show');
    blocks[i].classList.remove('hide');
  }

  function hideBlock() {
    blocks.forEach((block) => {
      block.classList.add('hide');
      block.classList.remove('show')
    })

  }
  hideBlock();
  showBlock();
  const resultBlock = document.createElement('div');
  resultBlock.classList.add('test__block');
  

  function checkAnswer() {
    let score = 0;

    questionsDB.forEach((question, index) => {
      const selected = document.querySelector(`input[name="answerRadio-${index}"]:checked`);

      const label = selected.nextElementSibling;
      const userAnswer = label.textContent.trim();
      const correctAnswer = question.correctOption.trim();

      if(userAnswer === correctAnswer){
        score += 1;
      }

    });
    
    container.appendChild(resultBlock);
    resultBlock.textContent = `Вы набрали ${score} из ${questionsDB.length} баллов`;

  };


  
  nextButton.addEventListener('click', () => {
    if(i < blocks.length - 1) {
      i+=1
      hideBlock();
      showBlock(i);
    }
    else {
      hideBlock();
      checkAnswer();
    }
  });

  prevButton.addEventListener('click', () => {
    if(i > 0) {
      i-=1;
      hideBlock();
      showBlock(i);
    }
  })


});
