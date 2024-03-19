const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  // display show all button i thare are more than 12 phones
  const showAllContainers = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainers.classList.remove("hidden");
  } else {
    showAllContainers.classList.add("hidden");
  }

  // console.log("is show all", isShowAll);
  // display only first 12 phones if not showall
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    // 3. set innerHTML
    phoneCard.innerHTML = `
        <figure>
            <img
            src="${phone.image}"
                alt="Shoes"
              />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p></p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}') ;show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
    // 4. append child
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpinner(false);
};

//
const handleShowDetails = async (id) => {
  console.log("Show Details", id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data
  // console.log(phone);


  showPhoneDetails(phone);


};


const showPhoneDetails = (phone) => {
  console.log(phone);

  const phoneName = document.getElementById('show_details_phone_name');
  phoneName.innerText = phone.name;

  // show the modal
  show_details_modal.showModal();
}





// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

// loadPhone();
