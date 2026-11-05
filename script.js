const species = [
  {
    id: "shark",
    number: "01",
    name: "Tiburón blanco",
    scientific: "Carcharodon carcharias",
    type: "predator",
    tags: ["predator", "biome-open"],
    danger: "DEPREDADOR",
    riskLevel: 5,
    riskLabel: "MUY ALTO",
    size: "4 — 6 m",
    longevity: "70+ años",
    diet: "Peces, focas y tortugas",
    regions: ["atlantic", "indo-pacific", "pacific", "indian"],
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
    tags: ["venom", "biome-reef", "biome-open"],
    danger: "VENENO NEUROTÓXICO",
    riskLevel: 5,
    riskLabel: "MUY ALTO",
    size: "Campana: 20–30 cm; tentáculos: hasta 3 m",
    longevity: "Aprox. 1 año",
    diet: "Peces pequeños y crustáceos",
    regions: ["indo-pacific", "pacific", "indian"],
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
    tags: ["venom", "deep", "biome-reef"],
    danger: "TOXINA LETAL",
    riskLevel: 5,
    riskLabel: "MUY ALTO",
    size: "Hasta 15 cm",
    longevity: "1 — 2 años",
    diet: "Cangrejos, camarones y peces",
    regions: ["indo-pacific", "pacific"],
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
    tags: ["predator", "deep", "biome-abyss"],
    danger: "CAZADOR ABISAL",
    riskLevel: 1,
    riskLabel: "BAJO",
    size: "Hasta 18 cm",
    longevity: "Sin datos concluyentes",
    diet: "Pequeños peces y crustáceos",
    regions: ["atlantic", "southern"],
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
const surpriseEncounter = document.querySelector("#surprise-encounter");
const dialog = document.querySelector("#species-dialog");
const activeFilters = document.querySelectorAll("[data-filter]");
const biomeFilterButtons = document.querySelectorAll("[data-biome-filter]");
const biomeFilterNotice = document.querySelector("#biome-filter-notice");
const biomeFilterLabel = document.querySelector("#biome-filter-label");
const mapRegionButtons = document.querySelectorAll("[data-map-region]");
const mapRegionStatus = document.querySelector("#map-region-status");
const clearMapFilter = document.querySelector("#clear-map-filter");
const hero = document.querySelector(".hero");
const descent = document.querySelector("#descenso");
const depthZones = [...document.querySelectorAll(".depth-zone")];
const depthMarkers = document.querySelectorAll(".depth-console__marker");
const depthConsole = document.querySelector("#depth-console");
const navLinks = document.querySelectorAll(".main-nav__link");
const flashlightToggle = document.querySelector("#flashlight-toggle");
const immersionToggle = document.querySelector("#immersion-toggle");
const immersionStatus = document.querySelector("#immersion-status");
let pointerFrame = 0;
let pointerPosition = null;
let ambientAudio = null;
const depthLabels = {
  surface: "ZONA FÓTICA",
  twilight: "ZONA DE PENUMBRA",
  abyss: "ZONA BATIPELÁGICA"
};
const zoneColors = {
  surface: "#071012",
  twilight: "#07151b",
  abyss: "#100d16"
};
const zoneTargets = {
  surface: "#zona-superficial",
  twilight: "#zona-penumbra",
  abyss: "#zona-abisal"
};
const navRatios = new Map();
const navSections = [...document.querySelectorAll("#biomas, #especies, #expedicion")];
const biomeLabels = {
  reef: "ARRECIFES",
  open: "AGUAS ABIERTAS",
  abyss: "ZONA ABISAL"
};
const oceanLabels = {
  atlantic: "ATLÁNTICO NORTE",
  "indo-pacific": "INDO-PACÍFICO",
  pacific: "PACÍFICO",
  indian: "OCÉANO ÍNDICO",
  southern: "OCÉANO AUSTRAL"
};
const ambientMotionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-in-view", entry.isIntersecting);
  });
}, { threshold: 0.05 });
const ambientMotionTargets = ".hero, .depth-zone, .biome-card, .species-card, .expedition__image-wrap";
const particleTargets = [hero, ...depthZones, ...document.querySelectorAll(".biome-card")];
const particleCount = 9;
let selectedFilter = "all";
let selectedBiome = null;
let selectedRegion = null;
let activeDepthZone = null;
let depthFrame = 0;
const depthRatios = new Map([[hero, 0], ...depthZones.map((zone) => [zone, 0])]);

particleTargets.forEach((target) => {
  const field = document.createElement("div");
  field.className = "marine-particles";
  field.setAttribute("aria-hidden", "true");

  for (let index = 0; index < particleCount; index += 1) {
    field.append(document.createElement("span"));
  }

  target.append(field);
});

function renderSpecies() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  const matchingSpecies = species.filter((animal) => {
    const matchesFilter = selectedFilter === "all" || animal.tags.includes(selectedFilter);
    const matchesBiome = !selectedBiome || animal.tags.includes(`biome-${selectedBiome}`);
    const matchesRegion = !selectedRegion || animal.regions.includes(selectedRegion);
    const searchableText = `${animal.name} ${animal.scientific} ${animal.habitat}`.toLocaleLowerCase("es");
    return matchesFilter && matchesBiome && matchesRegion && searchableText.includes(query);
  });

  catalogCount.textContent = `${String(matchingSpecies.length).padStart(2, "0")} REGISTROS ENCONTRADOS`;
  mapRegionButtons.forEach((button) => {
    const region = button.dataset.mapRegion;
    const count = species.filter((animal) => animal.regions.includes(region)).length;
    button.setAttribute("aria-pressed", String(region === selectedRegion));
    button.querySelector(".abyss-map__count").textContent = String(count).padStart(2, "0");
    button.setAttribute("aria-label", `Explorar ${oceanLabels[region].toLocaleLowerCase("es")}: ${count} ${
      count === 1 ? "especie" : "especies"
    }`);
  });
  mapRegionStatus.textContent = selectedRegion
    ? `ZONA SELECCIONADA: ${oceanLabels[selectedRegion]} · MOSTRANDO ESPECIES REGISTRADAS`
    : "SELECCIONÁ UNA ZONA PARA EXPLORAR SUS ESPECIES";

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
          <span>PELIGRO: ${animal.riskLabel}</span>
        </div>
        <button class="species-card__button" type="button" data-species="${animal.id}" aria-label="Abrir ficha de ${animal.name}">
          <span>ABRIR REGISTRO</span><span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  `).join("");
  grid.querySelectorAll(ambientMotionTargets).forEach((target) => ambientMotionObserver.observe(target));
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
  document.querySelector("#dialog-size").textContent = animal.size;
  document.querySelector("#dialog-longevity").textContent = animal.longevity;
  document.querySelector("#dialog-diet").textContent = animal.diet;
  document.querySelector("#dialog-risk-value").textContent = `${animal.riskLevel} / 5 · ${animal.riskLabel}`;
  document.querySelector("#dialog-risk-meter").setAttribute("aria-valuenow", String(animal.riskLevel));
  document.querySelectorAll("#dialog-risk-meter span").forEach((segment, index) => {
    segment.classList.toggle("is-active", index < animal.riskLevel);
  });
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

function selectBiome(biome, resetCategory = Boolean(biome)) {
  selectedBiome = biome;
  if (resetCategory) selectedFilter = "all";
  activeFilters.forEach((button) => {
    const isActive = button.dataset.filter === selectedFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  biomeFilterNotice.hidden = !biome;
  biomeFilterLabel.textContent = biome ? `BIOMA SELECCIONADO: ${biomeLabels[biome]}` : "";
  biomeFilterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.biomeFilter === biome));
  });
  renderSpecies();
}

biomeFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectBiome(button.dataset.biomeFilter);
    document.querySelector("#especies").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
});

document.querySelector("#clear-biome-filter").addEventListener("click", () => selectBiome(null, false));
searchInput.addEventListener("input", renderSpecies);

mapRegionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedRegion = button.dataset.mapRegion;
    renderSpecies();
    document.querySelector("#especies").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
});

clearMapFilter.addEventListener("click", () => {
  selectedRegion = null;
  renderSpecies();
});

grid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-species]");
  if (!trigger) return;

  const animal = species.find((entry) => entry.id === trigger.dataset.species);
  if (animal) openSpeciesRecord(animal);
});

surpriseEncounter.addEventListener("click", () => {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  const availableSpecies = species.filter((animal) => {
    const matchesFilter = selectedFilter === "all" || animal.tags.includes(selectedFilter);
    const matchesBiome = !selectedBiome || animal.tags.includes(`biome-${selectedBiome}`);
    const matchesRegion = !selectedRegion || animal.regions.includes(selectedRegion);
    const searchableText = `${animal.name} ${animal.scientific} ${animal.habitat}`.toLocaleLowerCase("es");
    return matchesFilter && matchesBiome && matchesRegion && searchableText.includes(query);
  });

  if (availableSpecies.length === 0) {
    catalogCount.textContent = "NO HAY ENCUENTROS EN ESTE REGISTRO. CAMBIÁ LOS FILTROS E INTENTÁ OTRA VEZ.";
    searchInput.focus();
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableSpecies.length);
  openSpeciesRecord(availableSpecies[randomIndex]);
});

document.querySelector(".species-dialog__close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

function scheduleAmbientBubble() {
  if (!ambientAudio) return;

  const { context, masterGain } = ambientAudio;
  const now = context.currentTime;
  const bubble = context.createOscillator();
  const bubbleGain = context.createGain();
  bubble.type = "sine";
  bubble.frequency.setValueAtTime(340 + Math.random() * 180, now);
  bubble.frequency.exponentialRampToValueAtTime(170 + Math.random() * 80, now + 0.38);
  bubbleGain.gain.setValueAtTime(0.0001, now);
  bubbleGain.gain.exponentialRampToValueAtTime(0.018, now + 0.04);
  bubbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
  bubble.connect(bubbleGain);
  bubbleGain.connect(masterGain);
  bubble.start(now);
  bubble.stop(now + 0.45);

  ambientAudio.bubbleTimer = window.setTimeout(scheduleAmbientBubble, 3200 + Math.random() * 4200);
}

async function startAmbientAudio() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) {
    throw new Error("Este navegador no admite audio ambiental.");
  }

  const context = new AudioContextConstructor();

  try {
    await context.resume();

    const now = context.currentTime;
    const masterGain = context.createGain();
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    const noiseSource = context.createBufferSource();
    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const noiseSamples = noiseBuffer.getChannelData(0);

    for (let index = 0; index < noiseSamples.length; index += 1) {
      noiseSamples[index] = Math.random() * 2 - 1;
    }

    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 620;
    noiseFilter.Q.value = 0.55;
    noiseGain.gain.value = 0.12;
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.setTargetAtTime(0.34, now, 0.9);
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    masterGain.connect(context.destination);

    const current = context.createOscillator();
    const currentGain = context.createGain();
    current.type = "sine";
    current.frequency.value = 56;
    currentGain.gain.value = 0.035;
    current.connect(currentGain);
    currentGain.connect(masterGain);

    const swell = context.createOscillator();
    const swellGain = context.createGain();
    swell.type = "sine";
    swell.frequency.value = 0.1;
    swellGain.gain.value = 0.035;
    swell.connect(swellGain);
    swellGain.connect(noiseGain.gain);

    noiseSource.start(now);
    current.start(now);
    swell.start(now);
    ambientAudio = {
      context,
      masterGain,
      sources: [noiseSource, current, swell],
      bubbleTimer: 0
    };
    scheduleAmbientBubble();
  } catch (error) {
    if (context.state !== "closed") await context.close();
    throw error;
  }
}

async function stopAmbientAudio() {
  if (!ambientAudio) return;

  const audio = ambientAudio;
  ambientAudio = null;
  window.clearTimeout(audio.bubbleTimer);

  const stopAt = audio.context.currentTime + 0.45;
  audio.masterGain.gain.setTargetAtTime(0, audio.context.currentTime, 0.1);
  audio.sources.forEach((source) => source.stop(stopAt));
  await new Promise((resolve) => window.setTimeout(resolve, 500));
  if (audio.context.state !== "closed") await audio.context.close();
}

immersionToggle.addEventListener("click", async () => {
  const isImmersed = immersionToggle.getAttribute("aria-pressed") !== "true";
  immersionToggle.disabled = true;
  immersionStatus.textContent = "";

  if (isImmersed) {
    try {
      await startAmbientAudio();
      immersionToggle.setAttribute("aria-pressed", "true");
      immersionToggle.setAttribute("aria-label", "Desactivar el modo inmersión y el sonido submarino");
      document.body.classList.add("immersion-mode");
      immersionToggle.querySelector(".sound-toggle__label").textContent = "EN INMERSIÓN";
      immersionStatus.textContent = "Sonido submarino activado.";
    } catch (error) {
      immersionToggle.setAttribute("aria-pressed", "false");
      immersionStatus.textContent = `No se pudo activar el sonido submarino. ${
        error instanceof Error ? error.message : "Probá nuevamente más tarde."
      }`;
    }
  } else {
    immersionToggle.setAttribute("aria-pressed", "false");
    immersionToggle.setAttribute("aria-label", "Activar el modo inmersión y el sonido submarino");
    document.body.classList.remove("immersion-mode");
    immersionToggle.querySelector(".sound-toggle__label").textContent = "INMERSIÓN";

    try {
      await stopAmbientAudio();
      immersionStatus.textContent = "Sonido submarino desactivado.";
    } catch (error) {
      immersionStatus.textContent = `No se pudo cerrar el sonido submarino. ${
        error instanceof Error ? error.message : "Cerrá la pestaña para detenerlo."
      }`;
    }
  }

  immersionToggle.disabled = false;
});

function updateFlashlightPosition(event) {
  pointerPosition = { x: event.clientX, y: event.clientY };
  if (pointerFrame) return;

  pointerFrame = window.requestAnimationFrame(() => {
    pointerFrame = 0;
    document.body.style.setProperty("--flashlight-x", `${pointerPosition.x}px`);
    document.body.style.setProperty("--flashlight-y", `${pointerPosition.y}px`);
  });
}

document.addEventListener("pointermove", updateFlashlightPosition, { passive: true });

flashlightToggle.addEventListener("click", () => {
  const isOn = flashlightToggle.getAttribute("aria-pressed") !== "true";
  flashlightToggle.setAttribute("aria-pressed", String(isOn));
  document.body.classList.toggle("flashlight-on", isOn);
  flashlightToggle.querySelector(".sound-toggle__label").textContent = isOn ? "LINTERNA ON" : "LINTERNA";
});

function updateDepthReading(zone, progress = 0) {
  const start = Number(zone.dataset.depthStart);
  const end = Number(zone.dataset.depthEnd);
  const depth = Math.round(start + (end - start) * progress);
  const formattedDepth = String(depth).padStart(4, "0");
  const totalProgress = Math.min((depth / 4000) * 100, 100);
  const zoneLabel = depthLabels[zone.dataset.zone];
  const consoleLabel = document.querySelector("#depth-zone-label");
  const heroLabel = document.querySelector(".depth-card__status");

  document.querySelector("#depth-value").textContent = formattedDepth;
  document.querySelector("#depth-console-value").textContent = formattedDepth;
  if (consoleLabel.textContent !== zoneLabel) consoleLabel.textContent = zoneLabel;
  if (heroLabel.textContent !== zoneLabel) heroLabel.textContent = zoneLabel;
  document.querySelector(".depth-card__rule i").style.width = `${Math.max(totalProgress, 2.5)}%`;
  document.body.style.setProperty("--descent-progress", `${totalProgress}%`);
}

function updateActiveDepthZone(zone) {
  if (!zone || activeDepthZone === zone) return;

  activeDepthZone = zone;
  document.body.dataset.depthZone = zone.dataset.depthZone || zone.dataset.zone;

  const zoneIndex = depthZones.indexOf(zone);
  depthZones.forEach((depthZone, index) => {
    depthZone.classList.toggle("is-active", depthZone === zone);
    depthMarkers[index].classList.toggle("is-active", depthZone === zone);
    depthMarkers[index].classList.toggle("is-passed", index < zoneIndex);
    depthMarkers[index].setAttribute("aria-current", depthZone === zone ? "location" : "false");
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-current", link.hash === (zone === hero ? "#inicio" : "#descenso"));
  });

  if (zone === hero) {
    document.querySelector("#depth-value").textContent = "0000";
    document.querySelector("#depth-console-value").textContent = "0000";
    document.querySelector(".depth-card__status").textContent = "SUPERFICIE · LUZ SOLAR";
    document.querySelector("#depth-zone-label").textContent = depthLabels.surface;
    document.querySelector(".depth-card__rule i").style.width = "2.5%";
    document.body.style.setProperty("--descent-progress", "0%");
    depthZones.forEach((depthZone) => depthZone.classList.remove("is-active"));
    depthMarkers.forEach((marker, index) => {
      marker.classList.toggle("is-active", index === 0);
      marker.classList.remove("is-passed");
      marker.setAttribute("aria-current", index === 0 ? "location" : "false");
    });
    document.querySelector('meta[name="theme-color"]').content = zoneColors.surface;
    return;
  }

  document.querySelector('meta[name="theme-color"]').content = zoneColors[zone.dataset.zone];
  updateDepthReading(zone);
}

function updateScrollDepth() {
  depthFrame = 0;
  if (!activeDepthZone || activeDepthZone === hero) return;

  const bounds = activeDepthZone.getBoundingClientRect();
  const scrollDistance = bounds.height + window.innerHeight * 0.3;
  const progress = Math.max(0, Math.min(
    (window.innerHeight * 0.72 - bounds.top) / scrollDistance,
    1
  ));
  updateDepthReading(activeDepthZone, progress);
}

function scheduleDepthUpdate() {
  if (depthFrame) return;
  depthFrame = window.requestAnimationFrame(updateScrollDepth);
}

const sectionObserver = new IntersectionObserver((entries) => {
  let mostVisibleZone = null;
  let highestRatio = 0.15;

  entries.forEach((entry) => {
    depthRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
  });

  depthRatios.forEach((ratio, zone) => {
    if (ratio > highestRatio) {
      mostVisibleZone = zone;
      highestRatio = ratio;
    }
  });

  if (mostVisibleZone) updateActiveDepthZone(mostVisibleZone);
}, { threshold: [0.15, 0.3, 0.5, 0.7, 0.9] });

sectionObserver.observe(hero);
depthZones.forEach((zone) => sectionObserver.observe(zone));

document.querySelectorAll(ambientMotionTargets).forEach((target) => ambientMotionObserver.observe(target));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    navRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
  });

  const [visibleSection] = [...navRatios.entries()]
    .filter(([, ratio]) => ratio > 0)
    .sort((first, second) => second[1] - first[1]);
  const activeSection = visibleSection ? `#${visibleSection[0].id}` : (activeDepthZone === hero ? "#inicio" : "#descenso");

  navLinks.forEach((link) => {
    link.classList.toggle("is-current", link.hash === activeSection);
  });
}, { threshold: [0.1, 0.25, 0.5, 0.75] });

navSections.forEach((section) => navObserver.observe(section));

const descentObserver = new IntersectionObserver(([entry]) => {
  depthConsole.hidden = !entry.isIntersecting;
}, { threshold: 0.01 });
descentObserver.observe(descent);

depthMarkers.forEach((marker) => {
  marker.addEventListener("click", () => {
    document.querySelector(zoneTargets[marker.dataset.targetZone]).scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
});

window.addEventListener("scroll", scheduleDepthUpdate, { passive: true });
window.addEventListener("resize", scheduleDepthUpdate);

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput && !dialog.open) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderSpecies();
