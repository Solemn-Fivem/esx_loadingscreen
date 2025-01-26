$(document).ready(function () {
    // Seleziona la barra e il testo della loading bar
    const loadedBar = $("#loaded-bar");
    const loadingLabel = $(".loading-bar h4");

    // Ascolta gli eventi inviati da FiveM
    window.addEventListener("message", function (event) {
        const data = event.data;
        // Controlla se il messaggio contiene informazioni sul caricamento
        if (data.eventName === "loadProgress") {
            const progress = parseInt(data.loadFraction * 100); // Percentuale del caricamento (0-100)

            // Aggiorna la barra di caricamento e il testo
            loadedBar.css("width", progress + "%");
            loadingLabel.text(`Caricamento in corso...`);
        }
    });

    // Carico il JSON con i suggerimenti (opzionale, può essere rimosso se non necessario)
    $.getJSON("./config.json", function (data) {
        const tips = data.tips;             // Array con tutti i suggerimenti
        let currentTipIndex = 0;            // Indice del suggerimento corrente

        // Mostro subito il primo suggerimento
        $("#tip-1 .description").text(tips[currentTipIndex]);

        // Cambia suggerimento ogni 5 secondi
        setInterval(() => {
            currentTipIndex = (currentTipIndex + 1) % tips.length;
            $("#tip-1 .description").text(tips[currentTipIndex]);
        }, 5000);

        // Cambia link social (opzionale, può essere rimosso se non necessario)
        $("#discord").attr("href", data.socials.discord.url);
        $("#instagram").attr("href", data.socials.instagram.url);
        $("#youtube").attr("href", data.socials.youtube.url);
        $("#tiktok").attr("href", data.socials.tiktok.url);

        // Descrizioni staff
        $("#patch-description").text(data.patch_description);
        $("#staff-description").text(data.staff_description);
        $("#option-description").text(data.option_description);

        // Patch notes
        $("#version").text(data.patch.version);
        const patchNotes = data.patch.changelog;
        const patchContainer = $("#patch-notes ul");
        patchNotes.forEach(patch => {
            const patchElement = $(`<li><p>${patch}</p></li>`);
            patchContainer.append(patchElement);
        });

        const staffData = data.staff; // Ottieni l'array dello staff
        const staffContainer = $(".staffer"); // Contenitore principale

        // Puliamo il contenuto per rigenerarlo
        staffContainer.empty();

        // Creiamo le colonne sinistra e destra
        const colLeft = $("<div></div>");
        const colRight = $("<div></div>");

        // Itera sull'array staff e genera gli elementi
        staffData.forEach((staff, index) => {
            const staffElement = $(`
                <div class="staff" id="staff-${index + 1}">
                    <div class="staff-image">
                        <img src="${staff.image}" alt="${staff.name}">
                    </div>
                    <div class="staff-label">
                        <h4>${staff.discord}</h4>
                        <h5>${staff.role.toUpperCase()}</h5>
                    </div>
                </div>
            `);

            // Aggiungi alternativamente a sinistra e a destra
            if (index % 2 === 0) {
                colLeft.append(staffElement);
            } else {
                colRight.append(staffElement);
            }
        });

        // Appendi le colonne al contenitore principale
        staffContainer.append(colLeft).append(colRight);
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Errore nel caricamento di config.json:", textStatus, error);
    });

    /* Tabs */
    $(".tabs-container .nav button").on("click", (el) => {
        $(".tabs-container .nav button").removeClass("active");
        $(".tabs-container .tabs").removeClass("active");

        const id = el.currentTarget.id;
        $(".tabs-container .nav button#" + id).addClass("active");
        $(".tabs-container .tabs[data-tab='" + id + "']").addClass("active");
    });

    // Audio di sottofondo (opzionale, può essere rimosso se non necessario)
    const audio = document.getElementById("background-music");

    // Slider volume
    const volumeSlider = document.getElementById("volume");

    // Imposta il volume iniziale al valore dello slider (in scala 0-1)
    audio.volume = volumeSlider.value / 500;

    // Aggiorna il volume quando si muove lo slider
    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value / 500;
    });

    // Gestire i pulsanti play/pause
    $("#play").on("click", () => {
        $("#play").removeClass("active");
        $("#pause").addClass("active");
        audio.play();
    });

    $("#pause").on("click", () => {
        $("#pause").removeClass("active");
        $("#play").addClass("active");
        audio.pause();
    });

    /* Scegli immagine principale (opzionale, può essere rimosso se non necessario) */
    const max = 5;
    const random = Math.floor(Math.random() * max) + 1;
    const image_name = "./src/images/main_character" + random + ".png";
    $("#main-character").attr("src", image_name);

    $("a").on("click", function (e) {
        e.preventDefault(); // Impedisce il comportamento predefinito del link
        const url = $(this).attr("href"); // Ottieni l'URL dal link cliccato

        // Invoca la funzione native di FiveM per aprire l'URL
        window.invokeNative("openUrl", url);
    });
});