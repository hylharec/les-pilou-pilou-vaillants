controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    niveau = 1 - niveau
    if (niveau == 0) {
        charger_village()
    } else if (niveau == 1) {
        charger_niveau1()
    } else {
    	
    }
})
function charger_niveau1 () {
    maison1.destroy()
    mainson2.destroy()
    tiles.setTilemap(tilemap`level1`)
    controller.moveSprite(Fermiere)
    Fermiere.setPosition(124, 244)
    scene.cameraFollowSprite(Fermiere)
}
function charger_village () {
    tiles.setTilemap(tilemap`village`)
    controller.moveSprite(Fermiere)
    Fermiere.setPosition(127, 201)
    scene.cameraFollowSprite(Fermiere)
    maison1 = sprites.create(assets.image`maison`, SpriteKind.Player)
    maison1.setPosition(70, 100)
    mainson2 = sprites.create(assets.image`maison2`, SpriteKind.Player)
    mainson2.setPosition(185, 100)
}
function dans_le_village () {
    if (Fermiere.tileKindAt(TileDirection.Top, assets.tile`vers_niveau1`)) {
        charger_niveau1()
    }
}
let mainson2: Sprite = null
let maison1: Sprite = null
let Fermiere: Sprite = null
let niveau = 0
scene.setBackgroundColor(9)
niveau = 0
Fermiere = sprites.create(assets.image`joueur`, SpriteKind.Player)
charger_village()
game.onUpdate(function () {
    dans_le_village()
})
