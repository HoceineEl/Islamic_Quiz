// const { HmacSHA256, enc } = require("crypto-js");
const d = document;
let score = parseInt(localStorage.getItem("score")) || 0;
const options = d.querySelectorAll(".option");
let next = d.querySelector(".next");

window.addEventListener("DOMContentLoaded", () => {
  d.querySelector(".score").textContent =
    parseInt(localStorage.getItem("score")) || 0;
  window.localStorage.currentQuestion =
    parseInt(window.localStorage.currentQuestion) || 0;
});
d.querySelector(".again").addEventListener("click", () => {
  window.localStorage.currentQuestion = 0;
  window.localStorage.score = 0;
  window.localStorage.gameOver = false;
  location.reload();
});

fetch("../../src/questions.json")
  .then((response) => response.json())
  .then((data) => {
    window.localStorage.gameOver = false;
    const questionElement = d.querySelector(".question");
    const optionLabels = d.querySelectorAll(".option-label");
    const next = d.querySelector(".next");
    let dataLength = data.length;
    console.log(data.length);
    showScore();
    let currentQuestion = getCurrentQ();
    setStep();
    window.addEventListener("DOMContentLoaded", () => {
      showScore();
    });
    function updateQuestion() {
      next.classList.add("pointer-events-auto");
      next.classList.add("pointer-events-none");
      const currentQuestionData = data[getCurrentQ()];
      setStep();
      window.localStorage.answer = data[getCurrentQ()]["answer"];
      questionElement.innerHTML = currentQuestionData.question;
      optionLabels.forEach((option, index) => {
        option.innerHTML = currentQuestionData.options[index];
        options[index].dataset.option = currentQuestionData.options[index]; // Set the dataset
      });

      options.forEach((option) => {
        option.classList.remove(
          "-translate-x-2",
          "bg-green-500",
          "bg-red-500",
          "pointer-events-none"
        );
        option.removeEventListener("click", handleOptionClick);
        option.addEventListener("click", handleOptionClick);
      });
    }

    function handleOptionClick() {
      next.classList.remove("pointer-events-none");
      next.classList.add("pointer-events-auto");
      window.localStorage.currentQuestion++;
      const selectedOption = this.dataset.option;
      const correctAnswer = window.localStorage.answer;

      this.classList.add("-translate-x-2");
      if (selectedOption === correctAnswer) {
        this.classList.add("bg-green-500");
        // if (window.innerWidth <= 768) {
        //   this.classList.remove("hover:bg-indigo-500");
        // }
        score++;
        localStorage.setItem("score", score);
        d.querySelector(".score").textContent = score;
      } else {
        this.classList.add("bg-red-500");
        const correctOption = Array.from(options).find(
          (option) => option.dataset.option === correctAnswer
        );
        if (correctOption) {
          correctOption.classList.add("bg-green-500");
        }
      }

      options.forEach((option) => {
        option.removeEventListener("click", handleOptionClick);
        option.classList.add("pointer-events-none");
      });
    }

    function getCurrentQ() {
      return parseInt(window.localStorage.currentQuestion) || 0;
    }
    function setStep() {
      if (theGameIsOver() == "false") {
        const currentQuestion =
          parseInt(window.localStorage.getItem("currentQuestion")) || 0;
        const dataLength = data.length; // Make sure `data` is defined somewhere
        let width = (currentQuestion * 100) / dataLength;
        width = width > 0 ? width : 1; // Ensuring width is at least 1% to show some progress
        const scoreElement = document.querySelector(".steps");
        scoreElement.style.width = `${width}%`;
      }
    }
    function theGameIsOver() {
      return window.localStorage.gameOver;
    }
    function showScore() {
      if (getCurrentQ() >= dataLength) {
        let steps = d.querySelector(".steps");
        d.querySelector(".content").classList.add("hidden");
        d.querySelector(".timer").parentElement.classList.add("hidden");
        steps.parentElement.className += " h-2 mt-52 ";
        steps.style.width = "0%";
        steps.style.height = "20px";
        steps.classList.remove("bg-teal-500");
        d.querySelector(".score").classList += " text-4xl";
        d.querySelector(".score + i").classList += " fa-2x";
        d.querySelector(".score").parentElement.parentElement.classList +=
          " justify-center flex-col mt-20";
        d.querySelector(".again").classList.toggle("mt-10");
        d.querySelector(".again").classList.toggle("hidden");
        window.localStorage.gameOver = true;
        let scoreByQuestions =
          (parseInt(window.localStorage.score) * 100) / dataLength;
        steps.style.width = `${scoreByQuestions}%`;
        console.log(scoreByQuestions);
        if (scoreByQuestions < 30) steps.classList.add("bg-red-500");
        else if (scoreByQuestions >= 30 && scoreByQuestions < 50)
          steps.classList.add("bg-orange-500");
        else if (scoreByQuestions >= 50 && scoreByQuestions < 80)
          steps.classList.add("bg-blue-500");
        else steps.classList.add("bg-green-500");
      }
    }
    setStep();

    next.addEventListener("click", () => {
      if (getCurrentQ() < data.length) {
        updateQuestion();
      } else {
        showScore();
      }
    });
    updateQuestion();
  });
