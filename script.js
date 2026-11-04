const species = [
  {
    id: "shark",
    number: "01",
    name: "Tiburón blanco",
    scientific: "Carcharodon carcharias",
    type: "predator",
    tags: ["predator"],
    danger: "DEPREDADOR",
    depth: "0 — 1.200 m",
    habitat: "Aguas templadas y costeras",
    threat: "Mordida de gran potencia",
    image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=900&q=85",
    alt: "Tiburón de gran tamaño nadando bajo el agua",
    description:
      "Un cazador de sentidos extraordinarios. Puede detectar vibraciones y rastros diminutos en el agua a grandes distancias. Su silueta anuncia que la cadena alimentaria tiene un dueño."
  },
  {
    id: "jellyfish",
    number: "02",
    name: "Medusa caja",
    scientific: "Chironex fleckeri",
    type: "venom",
    tags: ["venom"],
    danger: "VENENO NEUROTÓXICO",
    depth: "Superficie — 20 m",
    habitat: "Indo-Pacífico tropical",
    threat: "Veneno de acción rápida",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Jellyfish-_Underwater_world_%287448725268%29.jpg/960px-Jellyfish-_Underwater_world_%287448725268%29.jpg",
    alt: "Criatura marina translúcida suspendida en el agua",
    description:
      "Casi invisible entre las corrientes, la medusa caja posee tentáculos con células urticantes capaces de liberar un veneno de efecto fulminante. Su transparencia es su mejor camuflaje."
  },
  {
    id: "octopus",
    number: "03",
    name: "Pulpo de anillos azules",
    scientific: "Hapalochlaena lunulata",
    type: "venom",
    tags: ["venom", "deep"],
    danger: "TOXINA LETAL",
    depth: "0 — 50 m",
    habitat: "Arrecifes del Pacífico",
    threat: "Tetrodotoxina paralizante",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Greater_blue-ringed_octopus_%28Hapalochlaena_lunulata%29_%2848272090161%29.jpg/960px-Greater_blue-ringed_octopus_%28Hapalochlaena_lunulata%29_%2848272090161%29.jpg",
    alt: "Pulpo camuflado entre las rocas del fondo marino",
    description:
      "Pequeño, inteligente y casi imposible de ver cuando está tranquilo. Sus anillos eléctricos brillan como advertencia: su saliva contiene una neurotoxina para la que no existe antídoto."
  },
  {
    id: "anglerfish",
    number: "04",
    name: "Pez rape abisal",
    scientific: "Melanocetus johnsonii",
    type: "deep",
    tags: ["predator", "deep"],
    danger: "CAZADOR ABISAL",
    depth: "200 — 2.000 m",
    habitat: "Océanos Atlántico y Antártico",
    threat: "Emboscada en oscuridad total",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Melanocetus_johnsonii_by_NOAA.jpg/960px-Melanocetus_johnsonii_by_NOAA.jpg",
    alt: "Pez de aguas profundas en un entorno oscuro",
    description:
      "En la noche perpetua del abismo, este depredador usa un señuelo bioluminiscente para atraer a sus presas. Su boca puede engullir animales de un tamaño sorprendente."
  }
];

const grid = document.querySelector("#species-grid");
const searchInput = document.querySelector("#species-search");
const catalogCount = document.querySelector("#catalog-count");
const dialog = document.querySelector("#species-dialog");
const activeFilters = document.querySelectorAll("[data-filter]");
let selectedFilter = "all";

function renderSpecies() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  const matchingSpecies = species.filter((animal) => {
    const matchesFilter = selectedFilter === "all" || animal.tags.includes(selectedFilter);
    const searchableText = `${animal.name} ${animal.scientific} ${animal.habitat}`.toLocaleLowerCase("es");
    return matchesFilter && searchableText.includes(query);
  });

  catalogCount.textContent = `${String(matchingSpecies.length).padStart(2, "0")} REGISTROS ENCONTRADOS`;

  if (matchingSpecies.length === 0) {
    grid.innerHTML = '<p class="empty-state">NINGÚN REGISTRO COINCIDE CON LA BÚSQUEDA.</p>';
    return;
  }

  grid.innerHTML = matchingSpecies.map((animal) => `
    <article class="species-card">
      <div class="species-card__image-wrap">
        <img class="species-card__image" src="${animal.image}" alt="${animal.alt}" loading="lazy">
        <span class="species-card__number">AB-${animal.number}</span>
        <span class="species-card__badge">${animal.danger}</span>
      </div>
      <div class="species-card__content">
        <h3>${animal.name}</h3>
        <p class="species-card__latin">${animal.scientific}</p>
        <div class="species-card__meta">
          <span>${animal.depth.toUpperCase()}</span>
          <span>RIESGO: ALTO</span>
        </div>
        <button class="species-card__button" type="button" data-species="${animal.id}" aria-label="Abrir ficha de ${animal.name}">
          <span>ABRIR REGISTRO</span><span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  `).join("");
}

function openSpeciesRecord(animal) {
  document.querySelector("#dialog-image").src = animal.image;
  document.querySelector("#dialog-image").alt = animal.alt;
  document.querySelector("#dialog-number").textContent = `AB-${animal.number}`;
  document.querySelector("#dialog-title").textContent = animal.name;
  document.querySelector("#dialog-latin").textContent = animal.scientific;
  document.querySelector("#dialog-description").textContent = animal.description;
  document.querySelector("#dialog-habitat").textContent = animal.habitat;
  document.querySelector("#dialog-depth").textContent = animal.depth;
  document.querySelector("#dialog-threat").textContent = animal.threat;
  dialog.showModal();
}

activeFilters.forEach((button) => {
  button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter;
    activeFilters.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderSpecies();
  });
});

searchInput.addEventListener("input", renderSpecies);

grid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-species]");
  if (!trigger) return;

  const animal = species.find((entry) => entry.id === trigger.dataset.species);
  if (animal) openSpeciesRecord(animal);
});

document.querySelector(".species-dialog__close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("#immersion-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const isImmersed = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(isImmersed));
  document.body.classList.toggle("immersion-mode", isImmersed);
  document.querySelector(".sound-toggle__label").textContent = isImmersed ? "EN INMERSIÓN" : "INMERSIÓN";
  document.querySelector("#depth-value").textContent = isImmersed ? "0912" : "0380";
  document.querySelector(".depth-card__status").textContent = isImmersed ? "ZONA ABISAL" : "DESCENSO EN CURSO";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput && !dialog.open) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderSpecies();
