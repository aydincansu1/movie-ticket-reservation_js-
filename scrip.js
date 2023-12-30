const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

calculateTotal();
getFromLocalStorage();

const filmGorselleri = {
  20: "img1.jpg",
  22: "kisuykusu.jpg",
  25: "pastlives.jpg",
};

function filmSecildi() {
  const secilenFilmId = document.getElementById("movie").value;
  const filmGorseli = document.getElementById("filmGorseli");

  if (filmGorselleri.hasOwnProperty(secilenFilmId)) {
    const gorselDosyaAdi = filmGorselleri[secilenFilmId];
    filmGorseli.src = `img/${gorselDosyaAdi}`;
    filmGorseli.alt = `Görsel: ${secilenFilmId}`;
  }
}

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", function (e) {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  });

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  console.log(selectedSeatIndexs);

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, indexs) {
      if (selectedSeats.indexOf(indexs) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

function saveToLocalStorage(indexs) {
  localStorage.setItem(".selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
