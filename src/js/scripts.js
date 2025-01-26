$(document).ready(function () {

    // Carico il JSON con i suggerimenti
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

        // Cambia link social
        $("#discord").attr("href", data.socials.discord.url);
        $("#instagram").attr("href", data.socials.instagram.url);
        $("#youtube").attr("href", data.socials.youtube.url);
        $("#tiktok").attr("href", data.socials.tiktok.url);
    });

    /* Tabs */
    $(".tabs-container .nav button").on("click", (el) => {
        $(".tabs-container .nav button").removeClass("active");
        $(".tabs-container .tabs").removeClass("active");

        const id = el.currentTarget.id;
        $(".tabs-container .nav button#" + id).addClass("active");
        $(".tabs-container .tabs[data-tab='" + id + "']").addClass("active");
    });

    // Audio di sottofondo
    const audio = document.getElementById("background-music");

    // Opzionale: se vuoi gestire i pulsanti play/pause
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

    /* Scegli immagine principale */
    const max = 5;
    const random = Math.floor(Math.random() * max) + 1;
    const image_name = "./src/images/main_character" + random + ".png";
    $("#main-character").attr("src", image_name);

});
