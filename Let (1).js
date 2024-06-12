class Question {
    constructor(question, answers, correctAnswer, fontStyle = 'Arial', fontSize = '16px', questionColor = 'blue', answerColor = 'green', textAlign = 'left') {
      this.question = question;
      this.answers = answers;
      this.correctAnswer = correctAnswer;
      this.fontStyle = fontStyle;
      this.fontSize = fontSize;
      this.questionColor = questionColor;
      this.answerColor = answerColor;
      this.textAlign = textAlign;
    }
  
    applyStyles(element, type) {
      element.style.fontFamily = this.fontStyle;
      element.style.fontSize = this.fontSize;
      element.style.color = type === 'question' ? this.questionColor : this.answerColor;
      element.style.textAlign = this.textAlign;
    }
  
    createQuestionElement(index) {
      const questionEl = document.createElement('div');
      questionEl.className = 'question';
  
      const questionText = document.createElement('h2');
      questionText.innerHTML = (index + 1) + ". " + this.question;
      this.applyStyles(questionText, 'question');
      questionEl.appendChild(questionText);
  
      this.answers.forEach((answer, i) => {
        const label = document.createElement('label');
        this.applyStyles(label, 'answer');
  
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question${index}`;
        input.value = i;
        label.appendChild(input);
  
        const answerText = document.createTextNode(answer);
        label.appendChild(answerText);
  
        questionEl.appendChild(label);
        questionEl.appendChild(document.createElement('br'));
      });
  
      return questionEl;
    }
  
    isCorrect(answer) {
      return answer === this.correctAnswer;
    }
  }
  
  class Test {
    constructor(questions) {
      this.questions = questions.map(q => new Question(q.question, q.answers, q.correctAnswer, q.fontStyle, q.fontSize, q.questionColor, q.answerColor, q.textAlign));
      this.userAnswers = [];
    }
  
    init(containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = ''; // Очистите контейнер перед добавлением чего-либо
  
      const startButton = document.createElement('button');
      startButton.textContent = 'Начать тест';
      startButton.onclick = () => {
        // Удаление кнопки 'Начать тест' и вызов display для показа вопросов
        container.removeChild(startButton);
        this.display(containerId);
      };
      container.appendChild(startButton);
    }
  
    display(containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = ''; // Очистка контейнера
  
      this.questions.forEach((question, index) => {
        const questionElement = question.createQuestionElement(index);
        container.appendChild(questionElement);
      });
  
      const submitButton = document.createElement('button');
      submitButton.textContent = 'Submit';
      submitButton.onclick = () => this.submit(containerId);
      container.appendChild(submitButton);
    }
  
    collectAnswers() {
      this.questions.forEach((question, index) => {
        const answers = document.getElementsByName('question' + index);
        const userAnswer = [...answers].find(answer => answer.checked)?.value;
        this.userAnswers[index] = userAnswer !== undefined ? parseInt(userAnswer) : -1;
      });
    }
  
    submit(containerId) {
      this.collectAnswers();
      let score = 0;
      this.userAnswers.forEach((answer, index) => {
        if (this.questions[index].isCorrect(answer)) {
          score++;
        }
      });
  
      const container = document.getElementById(containerId);
      container.innerHTML = 'Ваш результат: ' + score + ' из ' + this.questions.length;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const questionsData = [
      {
        question: 'Рекурсивная триада состоит из:',
        answers: [
          'параметризация, декомпозиция, рекомбинация',
          'декомпозиция, выделение базы, коммутативность',
          'параметризация, выделение базы, декомпозиция'
        ],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '20px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: 'В чём суть декомпозиции?',
        answers: ['сведение общего случая к более простым подзадачам', 'нахождение в решаемой задаче тривиальных случаев', 'решение задач оптимизации рекурсивных алгоритмов, в ходе которых сокращается их временная сложность'],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Каким инструментом пользуются инженеры для оценки сложности алгоритмов?",
        answers: [
            "помогатором", 
            "гамма-нотацией", 
            "О-нотацией"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black',
        textAlign: 'left'
      },
      {
        question: "Что общего у пузырька, шейкера и глупого?",
        answers: [
            "это классы алгоритмов", 
            "одни из видов сортировки", 
            "это то, как я чувствую себя по утрам"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black',
        textAlign: 'left'
      },
      {
        question: "Принцип работы пузырьковой сортировки?",
        answers: [
            "последовательно сравниваются значения соседних элементов и меняются местами числа, если предыдущий оказывается больше последующего", 
            "сравниваются пары чисел, меняются местами и сортировка начинается сначала до того момента, пока не будет пройден весь сортируемый отрезок", 
            "алгоритм обрабатывает массив сначала слева направо, а заем справа налево"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
    
    },
    {
      question: "как работает сортировка слияния?",
      answers: [
          "массив разбивается на две группы, каждая сортируется. Затем они сливаются", 
          "массив разбивается на три группы, каждая сортируется. Затем они сливаются", 
          "так же, как и глупая сортировка, только быстрее"],
      correctAnswer: 2,
      fontStyle: 'Arial',
      fontSize: '18px',
      questionColor: 'HotPink', 
      answerColor: 'Black',
      textAlign: 'left'
    },
    {
        question: "Принцип 'Разделяй и властвуй' используется в ...",
        answers: [
            "быстрой сортировке", 
            "глупой сортировке", 
            "хэш-функции"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black',
        textAlign: 'left'
      },
      {
        question: "Двоичный поиск, метод половинного деления, дихотомия - названия ...",
        answers: [
            "быстрой сортировки", 
            "бинарного поиска", 
            "болезни программиста"],
        correctAnswer: 1,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black',
        textAlign: 'left'
      },
      {
        question: "Принцип 'последним вошёл - первым вышел' применяется в ...",
        answers: [
            "жизни", 
            "структуре данных очередь", 
            "структуре данных стек"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "В структуре данных очередь используются функции ...",
        answers: [
            "pop, push", 
            "get, lift", 
            "push, get"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Хеш-функция - это ...",
        answers: [
            "я функция, осуществляющая преобразование массива входных данных произвольной длины в выходную битовую строку установленной длины, выполняемое определённым алгоритмом", 
            " метод, который берет любой объект и вычисляет почти уникальное числовое представление объекта, которое может быть использовано в качестве ключа для последующего поиска", 
            "оба варианта верны"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Дерево является связным графом, не содержащим ...",
        answers: [
            "иерархию", 
            "циклы", 
            "узлов и потомков"],
        correctAnswer: 1,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "В глубину и в ширину - речь идёт о(об) ...",
        answers: [
            "алгоритмах поиска", 
            "canvas", 
            "связных списках"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Для понимания работы алгоритма А какие термины необходимо знать?",
        answers: [
            "узел, переход, пространство поиска", 
            "узел, перевал, пространство информации", 
            "ключ, переход, пространство значений"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Что из перечисленного не является способом задания цикла?",
        answers: [
            "do...while", 
            "let", 
            "while"],
        correctAnswer: 1,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Какой код из перечисленных отрисовывает прямоугольник в Canvas при запуске?",
        answers: [
            "ctx.fillRect(x,y,w,h);ctx.strokeRect(x,y,w,h);", 
            "ctx.beginPath();ctx.arc(x, y, R, 0, 2*Math.PI);", 
            "ctx.beginPath();ctx.moveTo(x0, y0);ctx.lineTo(x1, y1);ctx.lineTo(x1, y1);"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black',
        textAlign: 'left'
      },
      {
        question: "Особая структура данных для хранения упорядоченных коллекций называется -",
        answers: [
            "цикл", 
            "горное озеро", 
            "массив"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Вспомогательная функция, позволяющая регулярно исполнять какую-либо другую функцию через указанный промежуток времени",
        answers: [
            "setInterval()", 
            "return", 
            "console.log"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Чем отличается статическая типизация данных от динамической?",
        answers: [
            "активностью и подвижностью тазобедренного сустава", 
            "колличеством обрабатываемой информации в единицу времени", 
            "временем проверки типов (перед запуском программы или во время)"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Какие значения могут принимать данные логического типа?",
        answers: [
            "те, которые заданы в программе", 
            "true или false", 
            "любые, соответствующие логике создателя"],
        correctAnswer: 1,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "С помощью какого знака описывается тернарный оператор?",
        answers: [
            ":", 
            "!", 
            "?"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Нумерация элементов в массиве начинается с ...",
        answers: [
            "0", 
            "1", 
            "1, что за тупой вопрос?"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Что пишется в круглых скобках функции?",
        answers: [
            "тело функции", 
            "имя функции", 
            "список параметров функции"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Что такое глобальная область видимости?",
        answers: [
            "самая внутренняя область видимости в каждой конкретной программе", 
            "самая внешняя область видимости", 
            "любая область видимости, которую невозможно увидеть глазами"],
        correctAnswer: 1,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Что такое ООП?",
        answers: [
            "Объектно-ориентированное программирование", 
            "подход в программировании, согласно которому, данные инкапсулированы внутри объектов, а сам объект существует как составная часть целого", 
            "оба варианта верны"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', // Цвет вопроса
        answerColor: 'Black', // Цвет ответов
        textAlign: 'left'
      },
      {
        question: "Выберите вариант ответа, где перечислены принципы ООП:",
        answers: [
            "абстракция, полиморфизм, композиция", 
            "наследование, абстракция, классификация", 
            "инкапсуляция, композиция, ранжирование"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black',
        textAlign: 'left'
      },
      {
        question: "Бинарным поиском называется:",
        answers: [
            "запрещенная в России организация", 
            "тип поискового алгоритма, который последовательно делит пополам заранее отсортированный массив данных, чтобы обнаружить нужный элемент", 
            "алгоритм нахождения заданного значения произвольной функции на некотором отрезке"],
        correctAnswer: 1,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Хеш-таблицы позволяют выполнить следующие операции",
        answers: [
            "операцию добавления новой пары, операцию удаления и операцию поиска пары по ключу", 
            "сложения, умножения на противоположный элемент", 
            "удаление аппендицита"],
        correctAnswer: 0,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Случай, при котором хеш-функция преобразует более чем один массив входных данных в одинаковые сводки, называется:",
        answers: [
            "оказией", 
            "путаницей", 
            "коллизией"],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Структура данных, добавление и удаление элементов в которой происходит путём операций push и pop соответственно",
        answers: [
            "мельница", 
            "очередь", 
            "проход"],
        correctAnswer: 1,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
      {
        question: "Связный список - это",
        answers: [
            "элемент связного множества объединенных данных", 
            "структура данных, представляющая из себя упорядоченный набор элементов, в которой добавление новых элементов и удаление существующих производится с одного конца", 
            "структура данных, состоящая из элементов, содержащих помимо собственных данных ссылки на следующий и/или предыдущий элемент списка."],
        correctAnswer: 2,
        fontStyle: 'Arial',
        fontSize: '18px',
        questionColor: 'HotPink', 
        answerColor: 'Black', 
        textAlign: 'left'
      },
    ];
  
    
    const test = new Test(questionsData);
    test.init('testContainer'); 
  });