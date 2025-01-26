fx_version "cerulean"
game "gta5"

author "Solemn"
description "ESX Loading Screen - Urban"
version "1.0.0"

-- Definisce quale file HTML usare come loading screen
loadscreen "index.html"
loadscreen_manual_shutdown "yes"
loadscreen_cursor 'yes'

-- Elenca tutti i file necessari per il loading screen
files {
    "index.html",
    "src/music/music.mp3",
    "src/style/style.css",
    "src/style/animations.css",
    "src/style/fonts.css",
    "src/js/scripts.js",
    "/src/images/play.png",
    "/src/images/pause.png",
    "/src/images/tips.png",
    "src/images/background.png",
    "src/images/bullet1.png",
    "src/images/bullet2.png",
    "src/images/background-player.png",
    "src/images/ellipse.png",
    "src/images/particle1.png",
    "src/images/particle2.png",
    "src/images/staff-picture.png",
    "src/images/main_character1.png",
    "src/images/main_character2.png",
    "src/images/main_character3.png",
    "src/images/main_character4.png",
    "src/images/main_character5.png",
    "src/images/instagram.png",
    "src/images/youtube.png",
    "src/images/tiktok.png",
    "src/images/discord.png",
    "src/images/solture.png",
    "src/images/logo-blurred.png",
    "src/images/logo-white.png",
    "config.json"
}

-- Script lato client per inviare aggiornamenti di progresso
client_script 'src/js/scripts.js'