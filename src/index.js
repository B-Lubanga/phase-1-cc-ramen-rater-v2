const handleClick = (ramen) => {
  fetch(`http://localhost:3000/ramens/${ramen.id}`)
    .then((response) => response.json())
    .then((ramenDetails) => {
      const ramenDetailDiv = document.getElementById("ramen-detail");
      ramenDetailDiv.querySelector("#name").textContent = ramenDetails.name;
      ramenDetailDiv.querySelector("#restaurant").textContent =
        ramenDetails.restaurant;
      ramenDetailDiv.querySelector("#insert-comment").textContent =
        ramenDetails.comment;
      ramenDetailDiv.querySelector("#insert-rating").textContent =
        ramenDetails.rating;
    })
    .catch((error) => console.error("Error fetching ramen details:", error));
};

// Add submit event listener for the new ramen form
const addSubmitListener = () => {
  const form = document.querySelector("#new-ramen");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = form.querySelector("#new-ramen-name").value;
    const restaurant = form.querySelector("#new-ramen-restaurant").value;
    const rating = form.querySelector("#new-ramen-rating").value;
    const comment = form.querySelector("#new-ramen-comment").value;
    const imageUrl = form.querySelector("#new-ramen-image").value;

    // Create a new ramen object (this won't persist after page refresh)
    const newRamen = {
      name,
      restaurant,
      rating,
      comment,
      imageUrl,
      id: new Date().getTime(),
    };

    // Create and display the new ramen image in the ramen-menu div
    const ramenMenuDiv = document.getElementById("ramen-menu");
    // const ramenImg = document.createElement("img");
    const newRamenImage = document.querySelector("#ramen-menu img:last-child");
    ramenImg.src = newRamen.image;
    ramenImg.alt = newRamen.name;
    ramenImg.dataset.id = newRamen.id;
    // ramenImg.addEventListener("click", () => handleClick(newRamen));
    //  // Pass new ramen object to handleClick

    newRamenImage.addEventListener("click", () => handleClick(newRamen));
    ramenMenuDiv.appendChild(ramenImg);

    // Reset the form
    form.reset();
  });
};

// Display all ramen images when the page loads
const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenuDiv = document.getElementById("ramen-menu");
      ramens.forEach((ramen) => {
        const ramenImg = document.createElement("img");
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
        ramenImg.dataset.id = ramen.id; // Store ramen ID in a data attribute
        ramenImg.addEventListener("click", () => handleClick(ramen)); //
        ramenMenuDiv.appendChild(ramenImg);
      });
    })
    .catch((error) => console.error("Error loading ramens:", error));
};

const main = () => {
  displayRamens(); // Display all ramen images
  addSubmitListener(); // Attach submit event listener to form
};

main();


export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};