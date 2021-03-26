namespace SpriteKind {
    export const decor = SpriteKind.create()
    export const UI = SpriteKind.create()
}
function charger_niveau1 () {
    tiles.setTilemap(tilemap`level1`)
    controller.moveSprite(Fermiere)
    scene.cameraFollowSprite(Fermiere)
    mechant1 = sprites.create(assets.image`tracteur`, SpriteKind.Enemy)
    mechant1.setPosition(154, 28)
}
function charger_village () {
    tiles.setTilemap(tilemap`village`)
    controller.moveSprite(Fermiere)
    scene.cameraFollowSprite(Fermiere)
    maison1 = sprites.create(assets.image`maison`, SpriteKind.decor)
    maison1.setPosition(70, 100)
    maison2 = sprites.create(assets.image`maison2`, SpriteKind.decor)
    maison2.setPosition(185, 100)
}
function charger_niveau2 () {
    tiles.setTilemap(tilemap`level7`)
    controller.moveSprite(Fermiere)
    scene.cameraFollowSprite(Fermiere)
    mechant2 = sprites.create(assets.image`fermier`, SpriteKind.Enemy)
    mechant2.setPosition(154, 28)
    poule = sprites.create(assets.image`poule_or`, SpriteKind.decor)
    poule.setPosition(134, 23)
}
function dans_niveau2 () {
    if (distance(Fermiere, mechant2) < 50) {
        if (niveau1_trigger_mechant1 == 0) {
            niveau1_trigger_mechant1 = 1
            game.showLongText("OH OH OH !", DialogLayout.Bottom)
            game.showLongText("En revanche, je ne prévoie pas de te la laisser facilement !", DialogLayout.Bottom)
            game.showLongText("OH OH OH OH !!", DialogLayout.Bottom)
        }
    }
    if (Fermiere.tileKindAt(TileDirection.Center, assets.tile`vers_niveau1`)) {
        niveau1_trigger_mechant1 = 0
        mechant2.destroy()
        poule.destroy()
        charger_village()
        Fermiere.setPosition(25, 155)
        niveau = 0
    }
}
function charger_combat (mechant: Sprite) {
    tiles.setTilemap(tilemap`combat`)
    controller.moveSprite(Fermiere)
    scene.cameraFollowSprite(Fermiere)
    mechant.setPosition(151, 42)
}
function distance (player2: Sprite, target: Sprite) {
    buffer = Math.sqrt((player2.x - target.x) ** 2 + (player2.y - target.y) ** 2)
    return buffer
}
function dans_niveau1 () {
    if (distance(Fermiere, mechant1) < 50) {
        if (niveau1_trigger_mechant1 == 0) {
            niveau1_trigger_mechant1 = 1
            game.showLongText("EH EH EH !", DialogLayout.Bottom)
            game.showLongText("Alors tu veux retrouver ta poule aux oeufs d'or ?", DialogLayout.Bottom)
            game.showLongText("Il va d'abord falloir me battre !!", DialogLayout.Bottom)
            game.showLongText("EH EH EH EH !!", DialogLayout.Bottom)
        }
    }
    if (Fermiere.tileKindAt(TileDirection.Center, assets.tile`vers_niveau1`)) {
        niveau1_trigger_mechant1 = 0
        mechant1.destroy()
        charger_village()
        Fermiere.setPosition(124, 20)
        niveau = 0
    }
}
function dans_le_village () {
    if (Fermiere.tileKindAt(TileDirection.Center, assets.tile`vers_niveau1`)) {
        maison1.destroy()
        maison2.destroy()
        if (Fermiere.x > 50) {
            charger_niveau1()
            Fermiere.setPosition(127, 235)
            niveau = 1
        } else {
            charger_niveau2()
            Fermiere.setPosition(230, 130)
            niveau = 2
        }
    }
}
function dans_combat () {
	
}
let buffer = 0
let niveau1_trigger_mechant1 = 0
let poule: Sprite = null
let mechant2: Sprite = null
let maison2: Sprite = null
let maison1: Sprite = null
let mechant1: Sprite = null
let Fermiere: Sprite = null
let niveau = 0
scene.setBackgroundColor(9)
niveau = 0
Fermiere = sprites.create(assets.image`joueur`, SpriteKind.Player)
Fermiere.setPosition(127, 201)
let vie = sprites.create(assets.image`pepsi`, SpriteKind.UI)
charger_village()
game.onUpdate(function () {
    vie.setPosition(scene.cameraProperty(CameraProperty.X) - 40, scene.cameraProperty(CameraProperty.Y) - 45)
})
game.onUpdate(function () {
    if (niveau == 0) {
        dans_le_village()
    } else if (niveau == 1) {
        dans_niveau1()
    } else if (niveau == 2) {
        dans_niveau2()
    } else if (niveau == 10) {
        dans_combat()
    } else {
    	
    }
})
