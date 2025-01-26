-- Mostra il cursore e imposta il focus NUI all'avvio del loading screen
Citizen.CreateThread(function()
    -- Attendi che il loading screen sia caricato
    Citizen.Wait(500)

    -- Imposta il focus NUI e mostra il cursore
    SetNuiFocus(true, true)

    -- Invia un messaggio al NUI per confermare il focus
    SendNUIMessage({
        type = "showCursor"
    })
end)

-- Nascondi il cursore e rimuovi il focus NUI quando il gioco riprende
RegisterNetEvent('client:hideLoadingScreen')
AddEventHandler('client:hideLoadingScreen', function()
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "hideCursor"
    })
end)